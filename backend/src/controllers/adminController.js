const Product = require('../models/Product');
const Vendor = require('../models/Vendor');
const Order = require('../models/Order');
const User = require('../models/User');
const Campus = require('../models/Campus');
const Ambassador = require('../models/Ambassador');
const DailyMetric = require('../models/DailyMetric');
const SystemEvent = require('../models/SystemEvent');

// ---- EXISTING HANDLERS (unchanged) ----

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
        overview: {
          totalUsers,
          totalVendors,
          totalProducts,
          totalOrders,
          pendingApprovals,
        },
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
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (action === 'approve') {
      product.status = 'approved';
      product.approvedBy = req.user.id;
      product.approvedAt = new Date();
      product.rejectionReason = undefined;
    } else if (action === 'reject') {
      if (!rejectionReason) {
        return res.status(400).json({ message: 'Rejection reason is required' });
      }
      product.status = 'rejected';
      product.rejectionReason = rejectionReason;
    }
    
    await product.save();
    res.json({
      success: true,
      message: `Product ${action}d successfully`,
      data: product,
    });
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
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    
    vendor.status = action === 'approve' ? 'approved' : 'rejected';
    await vendor.save();
    
    res.json({
      success: true,
      message: `Vendor ${action}d successfully`,
      data: vendor,
    });
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
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    
    if (amount > vendor.payoutBalance) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    
    vendor.payoutBalance -= amount;
    vendor.lastPayoutDate = new Date();
    await vendor.save();
    
    // In production: Trigger actual bank transfer here
    res.json({
      success: true,
      message: `Payout of ₦${amount.toLocaleString()} processed`,
      data: vendor,
    });
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
    res.status(201).json({
      success: true,
      message: 'Campus created successfully',
      data: campus,
    });
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
    
    res.json({
      success: true,
      data: products,
    });
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
    const vendors = await Vendor.find(filter)
      .select('-password')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: vendors.length,
      data: vendors,
    });
  } catch (error) {
    console.error('Get all vendors error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ========================================================================
// NEW: DASHBOARD METRICS & ANALYTICS
// ========================================================================

// @desc    Get dashboard KPI metrics
// @route   GET /api/admin/dashboard/metrics
// @access  Private/Admin
exports.getDashboardMetrics = async (req, res) => {
  try {
    const range = req.query.range || '30d';
    const days = parseInt(range) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [
      gmvResult,
      vendorCount,
      pendingQC,
      campusCount,
      prevGmvResult,
      prevVendorCount,
    ] = await Promise.all([
      Order.aggregate([
        { $match: { createdAt: { $gte: startDate }, 'payment.status': 'completed' } },
        { $group: { _id: null, total: { $sum: '$pricing.total' } } },
      ]),
      Vendor.countDocuments({ status: 'approved', isActive: true }),
      Product.countDocuments({ status: 'pending_approval' }),
      Campus.countDocuments({ isActive: true }),
      // Previous period for trend calculation
      Order.aggregate([
        { 
          $match: { 
            createdAt: { $gte: new Date(startDate.getTime() - days * 86400000), $lt: startDate },
            'payment.status': 'completed'
          } 
        },
        { $group: { _id: null, total: { $sum: '$pricing.total' } } },
      ]),
      Vendor.countDocuments({ 
        status: 'approved', 
        isActive: true,
        createdAt: { $lt: startDate }
      }),
    ]);

    const currentGmv = gmvResult[0]?.total || 0;
    const prevGmv = prevGmvResult[0]?.total || 0;
    const gmvTrend = prevGmv > 0 ? Math.round(((currentGmv - prevGmv) / prevGmv) * 100) : 0;
    
    const vendorTrend = prevVendorCount > 0 
      ? Math.round(((vendorCount - prevVendorCount) / prevVendorCount) * 100) 
      : 0;

    res.json({
      success: true,
      data: {
        totalGMV: currentGmv,
        gmvTrend,
        activeVendors: vendorCount,
        vendorTrend,
        pendingQC,
        activeCampuses: campusCount,
        campusTrend: 0, // Would need historical campus data
      },
    });
  } catch (error) {
    console.error('Dashboard metrics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get GMV history for chart
// @route   GET /api/admin/dashboard/gmv-history
// @access  Private/Admin
exports.getGmvHistory = async (req, res) => {
  try {
    const range = req.query.range || '30d';
    const days = parseInt(range) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Try DailyMetric first (pre-aggregated by cron job)
    let metrics = await DailyMetric.find({
      date: { $gte: startDate },
    }).sort('date');

    // Fallback to real-time aggregation if DailyMetric is empty
    if (metrics.length === 0) {
      metrics = await Order.aggregate([
        { 
          $match: { 
            createdAt: { $gte: startDate },
            'payment.status': 'completed'
          } 
        },
        { 
          $group: { 
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            gmv: { $sum: '$pricing.total' }
          }
        },
        { $sort: { _id: 1 } },
      ]);
    }

    const data = metrics.map((m) => ({
      day: m._id || m.date.toISOString().split('T')[0],
      gmv: m.gmv || m.totalRevenue || 0,
    }));

    res.json({ success: true, data });
  } catch (error) {
    console.error('GMV history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get campus performance (order share by campus)
// @route   GET /api/admin/dashboard/campus-performance
// @access  Private/Admin
exports.getCampusPerformance = async (req, res) => {
  try {
    const range = req.query.range || '30d';
    const days = parseInt(range) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const campusOrders = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate }, 'shippingAddress.campus': { $exists: true } } },
      { 
        $group: { 
          _id: '$shippingAddress.campus',
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { orderCount: -1 } },
      { $limit: 10 },
    ]);

    const totalOrders = campusOrders.reduce((sum, c) => sum + c.orderCount, 0);
    
    // Populate campus names
    const campusIds = campusOrders.map((c) => c._id);
    const campuses = await Campus.find({ _id: { $in: campusIds } }).select('name');
    const campusMap = {};
    campuses.forEach((c) => { campusMap[c._id.toString()] = c.name; });

    const data = campusOrders.map((c) => ({
      name: campusMap[c._id.toString()] || 'Unknown',
      percent: totalOrders > 0 ? Math.round((c.orderCount / totalOrders) * 100) : 0,
    }));

    res.json({ success: true, data });
  } catch (error) {
    console.error('Campus performance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get live operations feed (recent system events)
// @route   GET /api/admin/dashboard/live-operations
// @access  Private/Admin
exports.getLiveOperations = async (req, res) => {
  try {
    const events = await SystemEvent.find()
      .sort('-timestamp')
      .limit(20)
      .lean();

    const data = events.map((e) => ({
      color: e.eventType.includes('error') ? '#EF4444' : 
             e.eventType.includes('approve') ? '#10B981' : '#3B82F6',
      text: e.metadata?.description || `${e.eventType} event`,
      time: formatTimeAgo(e.timestamp),
    }));

    res.json({ success: true, data });
  } catch (error) {
    console.error('Live operations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get quality gate stats (pending/approved/rejected counts)
// @route   GET /api/admin/products/quality-stats
// @access  Private/Admin
exports.getQualityStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [pending, approvedToday, rejectedToday] = await Promise.all([
      Product.countDocuments({ status: 'pending_approval' }),
      Product.countDocuments({ 
        status: 'approved',
        approvedAt: { $gte: today }
      }),
      Product.countDocuments({ 
        status: 'rejected',
        updatedAt: { $gte: today } // Assuming rejection updates updatedAt
      }),
    ]);

    res.json({
      success: true,
      data: { pending, approvedToday, rejectedToday },
    });
  } catch (error) {
    console.error('Quality stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Bulk approve/reject products
// @route   PUT /api/admin/products/bulk-review
// @access  Private/Admin
exports.bulkReview = async (req, res) => {
  try {
    const { productIds, action, reason } = req.body;
    
    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ message: 'productIds array is required' });
    }
    
    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ message: 'action must be approve or reject' });
    }
    
    if (action === 'reject' && !reason) {
      return res.status(400).json({ message: 'Rejection reason is required for bulk reject' });
    }

    const update = action === 'approve' 
      ? { 
          status: 'approved',
          approvedBy: req.user.id,
          approvedAt: new Date(),
          $unset: { rejectionReason: 1 }
        }
      : {
          status: 'rejected',
          rejectionReason: reason,
        };

    const result = await Product.updateMany(
      { _id: { $in: productIds }, status: 'pending_approval' },
      update
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} products ${action}d successfully`,
      data: { modifiedCount: result.modifiedCount },
    });
  } catch (error) {
    console.error('Bulk review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper: Format timestamp as "X mins/hours/days ago"
function formatTimeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}
