const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const vendorSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
  },
  contactPerson: {
    type: String,
    required: [true, 'Contact person is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false,
  },
  location: {
    city: {
      type: String,
      enum: ['Guangzhou', 'Shenzhen', 'Yiwu', 'Other'],
      required: true,
    },
    address: String,
    warehouse: String,
  },
  categories: [{
    type: String,
    enum: ['Electronics', 'Fashion', 'Beauty', 'Home', 'Stationery', 'Bags'],
  }],
  businessLicense: String,
  taxId: String,
  paymentInfo: {
    alipay: String,
    wechatPay: String,
    bankAccount: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending',
  },
  verificationStatus: {
    type: String,
    enum: ['unverified', 'verified', 'premium'],
    default: 'unverified',
  },
  performance: {
    totalOrders: { type: Number, default: 0 },
    completedOrders: { type: Number, default: 0 },
    cancelledOrders: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    fulfillmentRate: { type: Number, default: 0 },
    defectRate: { type: Number, default: 0 },
  },
  payoutBalance: {
    type: Number,
    default: 0,
  },
  lastPayoutDate: Date,
  // FIX: added — needed so the WeChat Mini-Program can silently log a
  // vendor back in via wx.login()'s code, without asking for a
  // password every time the mini-program is opened.
  wechatOpenId: {
    type: String,
    unique: true,
    sparse: true, // allows many docs with no wechatOpenId
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// FIX: this hook was missing entirely. Vendor.create() was saving the raw
// plaintext password, so loginVendor's bcrypt.compare() could never match
// (comparing plaintext against a non-bcrypt string always returns false).
// Mirrors the same pattern already used in models/User.js.
vendorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

vendorSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update performance metrics
vendorSchema.methods.updatePerformance = function() {
  const total = this.performance.totalOrders || 1;
  this.performance.fulfillmentRate = (this.performance.completedOrders / total) * 100;
  this.performance.defectRate = (this.performance.cancelledOrders / total) * 100;
};

// Virtual for tier status
vendorSchema.virtual('tier').get(function() {
  if (this.performance.averageRating >= 4.8 && this.performance.fulfillmentRate >= 95) {
    return 'premium';
  } else if (this.performance.averageRating >= 4.5 && this.performance.fulfillmentRate >= 90) {
    return 'verified';
  }
  return 'standard';
});

module.exports = mongoose.model('Vendor', vendorSchema);
