const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped_to_hub', 'at_hub', 'shipped_to_nigeria', 'delivered', 'cancelled'],
    default: 'pending',
  },
  trackingNumber: String,
  shippedAt: Date,
  deliveredAt: Date,
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [orderItemSchema],
  pricing: {
    subtotal: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      default: 0,
    },
    serviceFee: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  shippingAddress: {
    campus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campus',
    },
    recipientName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    street: String,
    building: String,
    room: String,
    landmark: String,
    city: String,
    state: String,
    zipCode: String,
  },
  payment: {
    method: {
      type: String,
      enum: ['card', 'bank_transfer', 'ussd', 'wallet'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    transactionRef: String,
    paidAt: Date,
  },
  logistics: {
    speedafShipmentId: String,
    trackingNumber: String,
    consolidatedAt: Date,
    shippedToNigeriaAt: Date,
    arrivedInNigeriaAt: Date,
    outForDeliveryAt: Date,
    deliveredAt: Date,
    pickupPoint: String,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'consolidated', 'shipped', 'in_transit', 'delivered', 'cancelled'],
    default: 'pending',
  },
  notes: String,
  cancellationReason: String,
  cancelledAt: Date,
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// Generate unique order number
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.orderNumber = `BSTZ-${timestamp}-${random}`;
  }
  next();
});

// Indexes
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ 'payment.status': 1 });

module.exports = mongoose.model('Order', orderSchema);
