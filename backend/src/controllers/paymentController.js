const crypto = require('crypto');
const axios = require('axios');
const Order = require('../models/Order');
const SystemEvent = require('../models/SystemEvent');

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

const verifyPayment = async (req, res, next) => {
  try {
    const { reference } = req.params;
    const order = await Order.findOne({ paymentReference: reference, userId: req.user._id });
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    if (order.paymentStatus === 'paid') return res.json({ status: 'already_confirmed', order });

    const { data } = await axios.get(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` }, timeout: 15000 }
    );

    const tx = data.data;
    const expectedKobo = Math.round(order.totalAmount * 100);
    if (!tx || tx.status !== 'success' || tx.amount !== expectedKobo || tx.currency !== 'NGN') {
      order.paymentStatus = 'failed';
      await order.save();
      return res.status(402).json({ code: 'PAYMENT_FAILED', message: 'Payment could not be verified.' });
    }

    order.paymentStatus = 'paid';
    order.paidAt = new Date();
    await order.save();
    res.json({ status: 'confirmed', order });
  } catch (err) { next(err); }
};

const paystackWebhook = async (req, res, next) => {
  try {
    const signature = req.headers['x-paystack-signature'];
    if (!signature) return res.status(400).json({ message: 'Missing signature.' });

    const rawPayload = Buffer.isBuffer(req.body)
      ? req.body
      : Buffer.from(req.rawBody || JSON.stringify(req.body));

    const expectedBuf = Buffer.from(
      crypto.createHmac('sha512', PAYSTACK_SECRET).update(rawPayload).digest('hex')
    );
    const providedBuf = Buffer.from(signature);
    if (expectedBuf.length !== providedBuf.length || !crypto.timingSafeEqual(expectedBuf, providedBuf)) {
      return res.status(400).json({ message: 'Invalid signature.' });
    }

    const event = Buffer.isBuffer(req.body) ? JSON.parse(req.body.toString('utf8')) : req.body;
    if (!event || !event.id) return res.sendStatus(200);

    const already = await SystemEvent.findOne({ eventId: String(event.id), source: 'paystack' });
    if (already) return res.sendStatus(200);

    if (event.event === 'charge.success' && event.data) {
      const order = await Order.findOne({ paymentReference: event.data.reference });
      if (order && order.paymentStatus !== 'paid') {
        const expectedKobo = Math.round(order.totalAmount * 100);
        if (event.data.amount === expectedKobo && event.data.currency === 'NGN') {
          order.paymentStatus = 'paid';
          order.paidAt = new Date();
          await order.save();
        }
      }
    }

    await SystemEvent.create({ eventId: String(event.id), source: 'paystack', payload: event });
    return res.sendStatus(200);
  } catch (err) { next(err); }
};

module.exports = { verifyPayment, paystackWebhook };