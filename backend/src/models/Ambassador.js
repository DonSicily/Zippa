const mongoose = require('mongoose');

const ambassadorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  campus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campus',
    required: true,
  },
  referralCode: {
    type: String,
    unique: true,
    required: true,
  },
  performance: {
    totalReferrals: {
      type: Number,
      default: 0,
    },
    activeReferrals: {
      type: Number,
      default: 0,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    totalCommission: {
      type: Number,
      default: 0,
    },
    pendingCommission: {
      type: Number,
      default: 0,
    },
  },
  commissionRate: {
    type: Number,
    default: 0.05, // 5% default
  },
  bankDetails: {
    bankName: String,
    accountNumber: String,
    accountName: String,
  },
  marketingMaterials: [{
    type: String,
    enum: ['poster', 'sticker', 'flyer', 'digital'],
  }],
  status: {
    type: String,
    enum: ['pending', 'active', 'inactive', 'suspended'],
    default: 'pending',
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  lastActiveAt: Date,
}, {
  timestamps: true,
});

// Generate referral code before saving
ambassadorSchema.pre('save', async function(next) {
  if (!this.referralCode) {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.referralCode = `BESTIEZ-${random}`;
  }
  next();
});

module.exports = mongoose.model('Ambassador', ambassadorSchema);
