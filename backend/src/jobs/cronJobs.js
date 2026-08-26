// Automated background tasks using node-cron.
// These run silently in the background to keep the platform healthy.

const cron = require('node-cron');
const Order = require('../models/Order');
const Vendor = require('../models/Vendor');
const Product = require('../models/Product');
const sendEmail = require('../utils/sendEmail');

// FIX: everything below used to run at require()-time via bare
// `cron.schedule(...)` calls at the top level, AND the file ended with
// `module.exports = cronJobs;` referencing a variable that was never
// declared — that ReferenceError would crash the process the moment
// anything required this file. Wrapped in an `initCronJobs()` function
// that server.js calls explicitly after the DB connects, and fixed the
// export.

const initCronJobs = () => {
// 1. Auto-Cancel Unpaid Orders (Runs every minute)
// If a user initiates checkout but doesn't pay within 15 minutes, free up the inventory.
cron.schedule('* * * * *', async () => {
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
  
  const unpaidOrders = await Order.find({
    status: 'pending',
    'payment.status': 'pending',
    createdAt: { $lt: fifteenMinutesAgo }
  });

  for (const order of unpaidOrders) {
    // Restore inventory
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { 'inventory.quantity': item.quantity },
        $set: { 'inventory.inStock': true }
      });
    }
    order.status = 'cancelled';
    order.cancellationReason = 'Auto-cancelled: Payment timeout';
    await order.save();
    console.log(`⏰ Auto-cancelled unpaid order: ${order.orderNumber}`);
  }
});

// 2. Auto-Release Vendor Payouts (Runs daily at 2 AM)
// Releases funds for orders delivered 14+ days ago (T+14 cycle).
cron.schedule('0 2 * * *', async () => {
  const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
  
  // Find completed orders older than 14 days where vendor hasn't been paid
  const eligibleOrders = await Order.find({
    status: 'delivered',
    deliveredAt: { $lte: fourteenDaysAgo },
    'payment.status': 'completed'
  });

  const vendorPayouts = {};

  for (const order of eligibleOrders) {
    for (const item of order.items) {
      const vendorId = item.vendor.toString();
      if (!vendorPayouts[vendorId]) vendorPayouts[vendorId] = 0;
      // 85% of item price goes to vendor (15% platform commission)
      vendorPayouts[vendorId] += (item.price * item.quantity) * 0.85; 
    }
  }

  // Update vendor balances
  for (const [vendorId, amount] of Object.entries(vendorPayouts)) {
    await Vendor.findByIdAndUpdate(vendorId, {
      $inc: { payoutBalance: amount }
    });
  }
  
  console.log(`💰 Daily Payout Job: Processed ${Object.keys(vendorPayouts).length} vendors.`);
});

// 3. Daily Admin Summary (Runs daily at 8 AM)
cron.schedule('0 8 * * *', async () => {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
  const stats = await Order.aggregate([
    { $match: { createdAt: { $gte: yesterday }, 'payment.status': 'completed' } },
    { $group: { _id: null, totalRevenue: { $sum: '$pricing.total' }, totalOrders: { $sum: 1 } } }
  ]);

  const revenue = stats[0]?.totalRevenue || 0;
  const orders = stats[0]?.totalOrders || 0;

  await sendEmail({
    email: 'founder@bestiez.com',
    subject: `Bestiez Daily Summary: ₦${revenue.toLocaleString()} Revenue`,
    html: `<h2>Good Morning, Founder!</h2><p>Yesterday's stats:</p><ul><li>Orders: ${orders}</li><li>Revenue: ₦${revenue.toLocaleString()}</li></ul>`
  });
});

  console.log('⏰ Cron jobs initialized (auto-cancel, payouts, daily summary)');
};

module.exports = initCronJobs;
