const Order = require('../models/Order');
const Product = require('../models/Product');
const Vendor = require('../models/Vendor');
const { initializePayment, verifyPayment } = require('../config/paystack');
const { createShipment } = require('../config/speedaf');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    // Validate products and calculate pricing
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product || product.status !== 'approved') {
        return res.status(400).json({ 
          message: `Product ${item.product} is not available` 
        });
      }

      if (product.inventory.quantity < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}` 
        });
      }

      const price = product.price.discountPrice || product.price.retailPrice;
      subtotal += price * item.quantity;

      orderItems.push({
        product: product._id,
        vendor: product.vendor,
        quantity: item.quantity,
        price,
        status: 'pending',
      });

      // Decrement inventory
      product.inventory.quantity -= item.quantity;
      if (product.inventory.quantity <= 0) {
        product.inventory.inStock = false;
        product.status = 'out_of_stock';
      }
      await product.save();
    }

    // Calculate fees
    const shippingFee = 1500; // Flat rate for now
    const serviceFee = Math.round(subtotal * 0.02); // 2% service fee
    const total = subtotal + shippingFee + serviceFee;

    // Initialize Paystack payment
    const payment = await initializePayment(req.user.email, total, {
      orderId: 'PENDING', // Will be updated after creation
      userId: req.user.id,
    });

    // Create order
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      pricing: {
        subtotal,
        shippingFee,
        serviceFee,
        total,
      },
      shippingAddress,
      payment: {
        method: paymentMethod,
        transactionRef: payment.data.reference,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Order created. Complete payment to confirm.',
      data: {
        order,
        paymentUrl: payment.data.authorization_url,
      },
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error creating order' });
  }
};

// @desc    Verify payment and confirm order
// @route   POST /api/orders/verify-payment
// @access  Private
exports.verifyOrderPayment = async (req, res) => {
  try {
    const { reference } = req.body;

    const paymentVerification = await verifyPayment(reference);
    
    if (paymentVerification.data.status !== 'success') {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    const order = await Order.findOne({ 'payment.transactionRef': reference });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update order payment status
    order.payment.status = 'completed';
    order.payment.paidAt = new Date(paymentVerification.data.paid_at);
    order.status = 'confirmed';
    await order.save();

    // Notify vendors
    for (const item of order.items) {
      await Vendor.findByIdAndUpdate(item.vendor, {
        $inc: { 'performance.totalOrders': 1 },
      });
    }

    res.json({
      success: true,
      message: 'Payment verified and order confirmed',
      data: order,
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ message: 'Server error verifying payment' });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const filter = { user: req.user.id };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('items.product', 'name images price')
        .populate('shippingAddress.campus', 'name')
        .sort('-createdAt')
        .skip(skip)
        .limit(Number(limit)),
      Order.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: orders,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single order details
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name images price specifications')
      .populate('items.vendor', 'companyName contactPerson')
      .populate('shippingAddress.campus', 'name pickupPoints');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check ownership
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (order.status !== 'pending' && order.status !== 'confirmed') {
      return res.status(400).json({ 
        message: 'Order cannot be cancelled at this stage' 
      });
    }

    // Restore inventory
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.inventory.quantity += item.quantity;
        product.inventory.inStock = true;
        product.status = 'approved';
        await product.save();
      }
    }

    order.status = 'cancelled';
    order.cancellationReason = reason;
    order.cancelledAt = new Date();
    order.cancelledBy = req.user.id;
    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: order,
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: 'Server error cancelling order' });
  }
};
