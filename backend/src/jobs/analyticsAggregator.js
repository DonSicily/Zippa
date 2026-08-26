// Daily Analytics Aggregation Cron Job.
// Instead of doing heavy MongoDB $group aggregations on the Admin Dashboard in real-time,
// this job pre-calculates daily metrics and stores them in a lightweight 'DailyMetric' collection.

const cron = require('node-cron');
const Order = require('../models/Order');
const User = require('../models/User');
const DailyMetric = require('../models/DailyMetric'); // You would create this simple schema

const runDailyAggregation = async () => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Aggregate Revenue and Orders
    const orderStats = await Order.aggregate([
      { 
        $match: { 
          createdAt: { $gte: yesterday, $lt: today },
          'payment.status': 'completed',
          status: { $ne: 'cancelled' }
        } 
      },
      { 
        $group: { 
          _id: null, 
          totalRevenue: { $sum: '$pricing.total' }, 
          totalOrders: { $sum: 1 },
          avgOrderValue: { $avg: '$pricing.total' }
        } 
      }
    ]);

    // 2. Aggregate New User Signups
    const newUsers = await User.countDocuments({
      createdAt: { $gte: yesterday, $lt: today },
      role: 'student'
    });

    // 3. Aggregate Top Campus (Mock logic for brevity)
    const campusStats = await Order.aggregate([
      { $match: { createdAt: { $gte: yesterday, $lt: today } } },
      { $group: { _id: '$shippingAddress.campus', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    // 4. Save to DailyMetric collection
    await DailyMetric.findOneAndUpdate(
      { date: yesterday },
      {
        date: yesterday,
        totalRevenue: orderStats[0]?.totalRevenue || 0,
        totalOrders: orderStats[0]?.totalOrders || 0,
        avgOrderValue: orderStats[0]?.avgOrderValue || 0,
        newUsers: newUsers,
        topCampusId: campusStats[0]?._id || null,
      },
      { upsert: true, new: true }
    );

    console.log(`📊 Daily Analytics Aggregated for ${yesterday.toDateString()}`);
  } catch (error) {
    console.error('❌ Analytics Aggregation Failed:', error);
  }
};

// Run every day at 1:00 AM
cron.schedule('0 1 * * *', runDailyAggregation);

module.exports = runDailyAggregation;
