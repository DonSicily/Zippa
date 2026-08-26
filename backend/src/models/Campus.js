const mongoose = require('mongoose');

const campusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Campus name is required'],
    unique: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['University', 'Polytechnic', 'College'],
    required: true,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  pickupPoints: [{
    name: String,
    description: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
    operatingHours: {
      open: String,
      close: String,
    },
    contactPerson: String,
    contactPhone: String,
  }],
  ambassadors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  stats: {
    totalStudents: {
      type: Number,
      default: 0,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    activeAmbassadors: {
      type: Number,
      default: 0,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Indexes
campusSchema.index({ name: 'text' });
campusSchema.index({ 'location.state': 1, 'location.city': 1 });

module.exports = mongoose.model('Campus', campusSchema);
