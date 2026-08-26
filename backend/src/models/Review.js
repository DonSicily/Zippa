const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  title: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  comment: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  images: [{
    url: String,
    publicId: String,
  }],
  isVerifiedPurchase: {
    type: Boolean,
    default: true,
  },
  helpful: {
    count: {
      type: Number,
      default: 0,
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  vendorResponse: {
    comment: String,
    respondedAt: Date,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved',
  },
}, {
  timestamps: true,
});

// Prevent duplicate reviews
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Update product rating after review
reviewSchema.post('save', async function() {
  const Product = mongoose.model('Product');
  const stats = await Review.aggregate([
    { $match: { product: this.product, status: 'approved' } },
    { $group: { _id: '$product', averageRating: { $avg: '$rating' }, totalReviews: { $sum: 1 } } }
  ]);
  
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(this.product, {
      'stats.averageRating': stats[0].averageRating,
      'stats.totalReviews': stats[0].totalReviews,
    });
  }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
