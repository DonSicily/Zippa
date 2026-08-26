// FIX: this model was referenced by src/jobs/analyticsAggregator.js
// (`require('../models/DailyMetric')`) but never created.

const mongoose = require('mongoose');

const dailyMetricSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  totalRevenue: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 },
  avgOrderValue: { type: Number, default: 0 },
  newUsers: { type: Number, default: 0 },
  topCampusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campus',
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('DailyMetric', dailyMetricSchema);
