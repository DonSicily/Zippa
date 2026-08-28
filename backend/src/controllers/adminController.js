const Product = require('../models/Product');
const Vendor = require('../models/Vendor');
const Order = require('../models/Order');
const User = require('../models/User');
const Campus = require('../models/Campus');
const Ambassador = require('../models/Ambassador');

// @desc    Get admin dashboard overview
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getAdminDashboard = async (req, res) => {
  try {
    const [
      totalUsers, totalVendors, totalProducts, totalOrders,
      pendingApprovals, recentOrders, revenueStats
    ] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      Vendor.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Product.countDocuments({ status: 'pending_approval' }),
      Order.find().populate('user', 'firstName lastName').sort('-createdAt').limit(10),
      Order.aggregate([
        { $match: { 'payment.status': 'completed' } },
        { $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          dailyRevenue: { $sum: '$pricing.total' },
          orderCount: { $sum: 1 }
        }},
        { $sort: { _id: -1 } },
        { $limit: 30 },
      ]),
    ]);
    res.json({
      success: true,
      data: {
        overview: { totalUsers, totalVendors, totalProducts, totalOrders, pendingApprovals },
        recentOrders,
        revenueStats,
      },
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Approve/reject product
// @route   PUT /api/admin/products/:id/approve
// @access  Private/Admin
exports.approveProduct = async (req, res) => {
  try {
    const { action, rejectionReason } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    if (action === 'approve') {
      product.status = 'approved';
      product.approvedBy = req.user.id;
      product.approvedAt = new Date();
      product.rejectionReason = undefined;
    } else if (action === 'reject') {
      if (!rejectionReason) return res.status(400).json({ message: 'Rejection reason is required' });
      product.status = 'rejected';
      product.rejectionReason = rejectionReason;
    }
    await product.save();
    res.json({ success: true, message: `Product ${action}d successfully`, data: product });
  } catch (error) {
    console.error('Approve product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Approve/reject vendor
// @route   PUT /api/admin/vendors/:id/approve
// @access  Private/Admin
exports.approveVendor = async (req, res) => {
  try {
    const { action } = req.body;
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    
    vendor.status = action === 'approve' ? 'approved' : 'rejected';
    await vendor.save();
    res.json({ success: true, message: `Vendor ${action}d successfully`, data: vendor });
  } catch (error) {
    console.error('Approve vendor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Process vendor payout
// @route   POST /api/admin/vendors/:id/payout
// @access  Private/Admin
exports.processPayout = async (req, res) => {
  try {
    const { amount } = req.body;
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    if (amount > vendor.payoutBalance) return res.status(400).json({ message: 'Insufficient balance' });
    
    vendor.payoutBalance -= amount;
    vendor.lastPayoutDate = new Date();
    await vendor.save();
    res.json({ success: true, message: `Payout of ₦${amount.toLocaleString()} processed`, data: vendor });
  } catch (error) {
    console.error('Process payout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Manage campuses
// @route   POST /api/admin/campuses
// @access  Private/Admin
exports.createCampus = async (req, res) => {
  try {
    const campus = await Campus.create(req.body);
    res.status(201).json({ success: true, message: 'Campus created successfully', data: campus });
  } catch (error) {
    console.error('Create campus error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all pending products for quality gate
// @route   GET /api/admin/products/pending
// @access  Private/Admin
exports.getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'pending_approval' })
      .populate('vendor', 'companyName contactPerson email')
      .sort('createdAt');
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Get pending products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all vendors
// @route   GET /api/admin/vendors
// @access  Private/Admin
exports.getAllVendors = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const vendors = await Vendor.find(filter).select('-password').sort('-createdAt');
    res.json({ success: true, count: vendors.length, data: vendors });
  } catch (error) {
    console.error('Get all vendors error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ========================================================================
// NEW: AMBASSADOR MANAGEMENT (Mapped to your exact Ambassador.js schema)
// ========================================================================

// @desc    Get all campus ambassadors with performance metrics
// @route   GET /api/admin/ambassadors
// @access  Private/Admin
exports.getAmbassadors = async (req, res) => {
  try {
    const ambassadors = await Ambassador.find()
      .populate('user', 'name email')
      .populate('campus', 'name')
      .sort('-performance.totalSales');

    // Map the deep schema to the flat structure expected by the Admin UI
    const data = ambassadors.map((a) => {
      let uiStatus = 'Active';
      if (a.status === 'pending' || a.performance.pendingCommission > 0) uiStatus = 'Pending Payout';
      else if (a.status === 'suspended') uiStatus = 'Suspended';
      else if (a.status === 'inactive') uiStatus = 'Inactive';

      return {
        _id: a._id,
        name: a.user?.name || 'Unknown User',
        email: a.user?.email || '',
        campus: a.campus?.name || 'Unknown Campus',
        referrals: a.performance.totalReferrals || 0,
        gmv: a.performance.totalSales || 0,
        pendingPayout: a.performance.pendingCommission || 0,
        status: uiStatus,
        joinedAt: a.joinedAt,
      };
    });

    res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error('Get ambassadors error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
