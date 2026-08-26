const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');

const corsOptions = require('./config/cors');
const securityHeaders = require('./middleware/securityHeaders');
const { generalLimiter, authLimiter, paymentLimiter } = require('./middleware/rateLimiter');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payments');
const productRoutes = require('./routes/products');
const vendorRoutes = require('./routes/vendors');
const walletRoutes = require('./routes/wallet');
const adminRoutes = require('./routes/admin');

const app = express();
app.set('trust proxy', 1);

app.use(securityHeaders);
app.use(cors(corsOptions));
app.use(mongoSanitize.replace({ replaceWith: '_' }));
app.use(cookieParser());

// Paystack webhook needs the raw body for signature verification (must precede express.json)
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api', generalLimiter);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/payments', paymentLimiter, paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) { console.error('FATAL: MONGO_URI is not set.'); process.exit(1); }

mongoose
  .connect(MONGO_URI, { autoIndex: process.env.NODE_ENV !== 'production' })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => { console.error('MongoDB connection error:', err); process.exit(1); });

module.exports = app;