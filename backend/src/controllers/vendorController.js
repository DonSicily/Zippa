const Vendor = require('../models/Vendor');
const Product = require('../models/Product');
const Order = require('../models/Order');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const generateToken = require('../utils/generateToken');

// @desc    Register vendor
// @route   POST /api/vendors/register
// @access  Public
exports.registerVendor = async (req, res) => {
  try {
    const { 
      companyName, contactPerson, email, phone, password, 
      location, categories, businessLicense, taxId, paymentInfo 
    } = req.body;

    // Check if vendor exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor with this email already exists' });
    }

    const vendor = await Vendor.create({
      companyName,
      contactPerson,
      email,
      phone,
      password,
      location,
      categories,
      businessLicense,
      taxId,
      paymentInfo,
    });

    const token = generateToken(vendor._id, 'vendor');

    res.status(201).json({
      success: true,
      message: 'Vendor registration submitted for approval',
      data: {
        vendor: {
          id: vendor._id,
          companyName: vendor.companyName,
          email: vendor.email,
          status: vendor.status,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Register vendor error:', error);
    res.status(500).json({ message: 'Server error during vendor registration' });
  }
};

// @desc    Login vendor
// @route   POST /api/vendors/login
// @access  Public
exports.loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email }).select('+password');
    if (!vendor) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (vendor.status !== 'approved') {
      return res.status(403).json({ 
        message: `Account status: ${vendor.status}. Please wait for approval.` 
      });
    }

    const token = generateToken(vendor._id, 'vendor');

    res.json({
      success: true,
      data: {
        vendor: {
          id: vendor._id,
          companyName: vendor.companyName,
          email: vendor.email,
          status: vendor.status,
          verificationStatus: vendor.verificationStatus,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Vendor login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get vendor dashboard stats
// @route   GET /api/vendors/dashboard
// @access  Private/Vendor
exports.getDashboard = async (req, res) => {
  try {
    const vendorId = req.user.id;

    const [products, orders, revenue] = await Promise.all([
      Product.countDocuments({ vendor: vendorId }),
      Order.aggregate([
        { $match: { 'items.vendor': vendorId, status: { $ne: 'cancelled' } } },
        { $unwind: '$items' },
        { $match: { 'items.vendor': vendorId } },
        { $group: { _id: null, totalOrders: { $sum: 1 }, totalRevenue: { $sum: '$items.price' } } },
      ]),
      Order.aggregate([
        { $match: { 'items.vendor': vendorId, 'payment.status': 'completed' } },
        { $unwind: '$items' },
        { $match: { 'items.vendor': vendorId } },
        { $group: { _id: null, paidRevenue: { $sum: '$items.price' } } },
      ]),
    ]);

    const vendor = await Vendor.findById(vendorId);

    res.json({
      success: true,
      data: {
        vendor,
        stats: {
          totalProducts: products,
          totalOrders: orders[0]?.totalOrders || 0,
          totalRevenue: orders[0]?.totalRevenue || 0,
          paidRevenue: revenue[0]?.paidRevenue || 0,
          pendingPayout: vendor.payoutBalance,
        },
      },
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get vendor products
// @route   GET /api/vendors/products
// @access  Private/Vendor
exports.getVendorProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = { vendor: req.user.id };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort('-createdAt')
        .skip(skip)
        .limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error('Get vendor products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get vendor orders
// @route   GET /api/vendors/orders
// @access  Private/Vendor
exports.getVendorOrders = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = { 'items.vendor': req.user.id };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('user', 'firstName lastName phone')
        .populate('items.product', 'name images')
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
    console.error('Get vendor orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update vendor profile
// @route   PUT /api/vendors/profile
// @access  Private/Vendor
exports.updateVendorProfile = async (req, res) => {
  try {
    const allowedUpdates = [
      'companyName', 'contactPerson', 'phone', 'location', 
      'categories', 'businessLicense', 'taxId', 'paymentInfo'
    ];
    const updates = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const vendor = await Vendor.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Vendor profile updated',
      data: vendor,
    });
  } catch (error) {
    console.error('Update vendor profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Log a vendor in from the WeChat Mini-Program using wx.login()'s code
// @route   POST /api/vendors/wechat-login
// @access  Public
// FIX: added — wechat-vendor/stores/auth.js calls this endpoint on every
// app open, but it did not exist on the backend at all. Exchanges the
// one-time `code` for a WeChat openid via the jscode2session API, then
// finds (or informs the mini-program to register) the matching vendor.
exports.wechatLogin = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: 'WeChat login code is required' });
    }

    const { data } = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: process.env.WECHAT_APPID,
        secret: process.env.WECHAT_SECRET,
        js_code: code,
        grant_type: 'authorization_code',
      },
    });

    if (data.errcode) {
      console.error('WeChat jscode2session error:', data);
      return res.status(400).json({ message: 'WeChat authentication failed' });
    }

    const { openid } = data;
    let vendor = await Vendor.findOne({ wechatOpenId: openid });

    if (!vendor) {
      // No vendor is linked to this WeChat account yet. The mini-program
      // should route the user to a "link your account" screen using their
      // existing Bestiez vendor email/password; that screen can PUT the
      // returned openid onto their profile via /api/vendors/profile.
      return res.status(404).json({
        success: false,
        needsLinking: true,
        message: 'No vendor account linked to this WeChat profile yet. Please log in with your email and password once to link it.',
      });
    }

    if (vendor.status !== 'approved') {
      return res.status(403).json({ message: `Account status: ${vendor.status}. Please wait for approval.` });
    }

    const token = generateToken(vendor._id, 'vendor');

    res.json({
      success: true,
      data: {
        vendor: {
          id: vendor._id,
          companyName: vendor.companyName,
          email: vendor.email,
          status: vendor.status,
        },
        token,
      },
    });
  } catch (error) {
    console.error('WeChat login error:', error);
    res.status(500).json({ message: 'Server error during WeChat login' });
  }
};

// @desc    Vendor updates the status of their line item within an order
//          (e.g. processing -> shipped_to_hub) — used by both the Vendor
//          Portal web app and the WeChat vendor mini-program.
// @route   PUT /api/vendors/orders/:id/status
// @access  Private/Vendor
// FIX: added — wechat-vendor/utils/api.js's updateOrderStatus() called
// this endpoint, but no matching route/controller existed.
exports.updateOrderItemStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped_to_hub', 'at_hub', 'shipped_to_nigeria', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const item = order.items.find((i) => i.vendor.toString() === req.user.id.toString());
    if (!item) {
      return res.status(403).json({ message: 'You do not have an item in this order' });
    }

    item.status = status;
    if (status === 'shipped_to_hub') item.shippedAt = new Date();
    if (status === 'delivered') item.deliveredAt = new Date();

    await order.save();

    res.json({ success: true, message: 'Order item status updated', data: order });
  } catch (error) {
    console.error('Update order item status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
