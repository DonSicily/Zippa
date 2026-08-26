// Creates indexes for fast order tracking and user history retrieval.
require('dotenv').config({ path: '../../backend/.env' });
const mongoose = require('mongoose');

const OrderSchema = require('../../backend/src/models/Order');

const runMigration = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for Order Migration');

    const Order = mongoose.model('Order', OrderSchema);

    // Unique Order Number
    await Order.collection.createIndex({ orderNumber: 1 }, { unique: true });
    
    // User Order History (Most frequent query)
    await Order.collection.createIndex({ user: 1, createdAt: -1 });
    
    // Admin/Vendor Order Management
    await Order.collection.createIndex({ status: 1 });
    await Order.collection.createIndex({ 'payment.status': 1 });
    await Order.collection.createIndex({ 'items.vendor': 1 });
    
    console.log('🔍 Order indexes created successfully.');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

runMigration();
