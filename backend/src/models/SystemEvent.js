// FIX: this model was referenced by src/middleware/analyticsTracker.js
// (`require('../models/SystemEvent')`) but never created — requiring the
// middleware would throw a MissingSchemaError/module-not-found error the
// moment it was wired into a route.

const mongoose = require('mongoose');

const systemEventSchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  metadata: {
    path: String,
    method: String,
    orderId: String,
    amount: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

module.exports = mongoose.model('SystemEvent', systemEventSchema);
