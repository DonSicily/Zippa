const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: 200,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: 2000,
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Fashion', 'Beauty', 'Home', 'Stationery', 'Bags'],
  },
  subcategory: String,
  images: [{
    url: String,
    publicId: String,
  }],
  price: {
    factoryPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    retailPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPrice: Number,
    currency: {
      type: String,
      default: 'NGN',
    },
  },
  inventory: {
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    sku: String,
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  specifications: {
    type: Map,
    of: String,
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    weight: Number, // in kg
    unit: {
      type: String,
      default: 'cm',
    },
  },
  shipping: {
    from: {
      type: String,
      enum: ['Guangzhou', 'Shenzhen', 'Yiwu'],
      required: true,
    },
    estimatedDays: {
      min: Number,
      max: Number,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
  },
  quality: {
    isCertified: {
      type: Boolean,
      default: false,
    },
    certificationDocs: [String],
    qualityScore: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  status: {
    type: String,
    enum: ['draft', 'pending_approval', 'approved', 'rejected', 'out_of_stock'],
    default: 'draft',
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  approvedAt: Date,
  rejectionReason: String,
  tags: [String],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
  stats: {
    views: { type: Number, default: 0 },
    purchases: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ vendor: 1, status: 1 });
productSchema.index({ 'price.retailPrice': 1 });
productSchema.index({ createdAt: -1 });

// Virtual for final price
productSchema.virtual('finalPrice').get(function() {
  return this.price.discountPrice || this.price.retailPrice;
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (!this.price.discountPrice) return 0;
  return Math.round(((this.price.retailPrice - this.price.discountPrice) / this.price.retailPrice) * 100);
});

// Method to increment views
productSchema.methods.incrementViews = function() {
  this.stats.views += 1;
  return this.save();
};

module.exports = mongoose.model('Product', productSchema);
