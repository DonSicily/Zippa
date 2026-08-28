const Order = require('../models/Order');
const speedaf = require('../config/speedaf');

// @desc    Get logistics pipeline (5-stage counts)
// @route   GET /api/admin/logistics/pipeline
// @access  Private/Admin
exports.getPipeline = async (req, res) => {
  try {
    const pipeline = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Map order statuses to pipeline stages
    const stageMap = {
      confirmed: { stage: 'Confirmed', color: '#3B82F6' },
      processing: { stage: 'China Hub', color: '#8B5CF6' },
      consolidated: { stage: 'SPEEDAF Transit', color: '#F59E0B' },
      shipped: { stage: 'Customs (Lagos)', color: '#10B981' },
      in_transit: { stage: 'Customs (Lagos)', color: '#10B981' },
      delivered: { stage: 'Campus Pickup', color: '#FF6B35' },
    };

    const stages = {};
    pipeline.forEach((p) => {
      const stage = stageMap[p._id];
      if (stage) {
        if (!stages[stage.stage]) {
          stages[stage.stage] = { stage: stage.stage, color: stage.color, count: 0 };
        }
        stages[stage.stage].count += p.count;
      }
    });

    const data = Object.values(stages);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Pipeline error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get active SPEEDAF shipments
// @route   GET /api/admin/logistics/shipments
// @access  Private/Admin
exports.getActiveShipments = async (req, res) => {
  try {
    const range = req.query.range || '24h';
    const hours = range === '24h' ? 24 : range === '7d' ? 168 : 720;
    const startDate = new Date();
    startDate.setHours(startDate.getHours() - hours);

    const shipments = await Order.aggregate([
      { 
        $match: { 
          'logistics.speedafShipmentId': { $exists: true },
          createdAt: { $gte: startDate },
          status: { $nin: ['delivered', 'cancelled'] }
        }
      },
      {
        $group: {
          _id: '$logistics.speedafShipmentId',
          orders: { $sum: 1 },
          totalWeight: { $sum: { $ifNull: ['$items.weight', 0.5] } }, // Default 0.5kg if not set
          latestStatus: { $last: '$status' },
          eta: { $max: '$logistics.deliveredAt' },
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 50 },
    ]);

    const statusMap = {
      pending: 'Confirmed',
      processing: 'At China Hub',
      consolidated: 'In Transit',
      shipped: 'Customs',
      in_transit: 'In Transit',
    };

    const data = shipments.map((s) => ({
      id: s._id,
      orders: s.orders,
      weight: `${s.totalWeight.toFixed(1)}kg`,
      status: statusMap[s.latestStatus] || 'In Transit',
      eta: s.eta ? new Date(s.eta).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBD',
      note: statusMap[s.latestStatus] || 'In Transit',
    }));

    res.json({ success: true, data });
  } catch (error) {
    console.error('Active shipments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get detailed tracking for single shipment
// @route   GET /api/admin/logistics/shipments/:id/tracking
// @access  Private/Admin
exports.getShipmentTracking = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try SPEEDAF API first
    try {
      const tracking = await speedaf.trackShipment(id);
      return res.json({ success: true, data: tracking });
    } catch (err) {
      console.warn('SPEEDAF tracking failed, falling back to local data:', err.message);
    }

    // Fallback: local order data
    const orders = await Order.find({ 'logistics.speedafShipmentId': id })
      .select('orderNumber status logistics createdAt')
      .sort('createdAt');

    if (orders.length === 0) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    const timeline = orders.map((o) => ({
      orderNumber: o.orderNumber,
      status: o.status,
      timestamp: o.createdAt,
    }));

    res.json({ success: true, data: { shipmentId: id, orders: timeline } });
  } catch (error) {
    console.error('Shipment tracking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Export shipments as CSV
// @route   GET /api/admin/logistics/export-csv
// @access  Private/Admin
exports.exportCSV = async (req, res) => {
  try {
    const orders = await Order.find({ 'logistics.speedafShipmentId': { $exists: true } })
      .select('orderNumber logistics.speedafShipmentId status logistics.consolidatedAt createdAt')
      .sort('-createdAt')
      .limit(1000);

    const rows = [
      ['SPEEDAF ID', 'Order Number', 'Status', 'Consolidated At', 'Created At'],
      ...orders.map((o) => [
        o.logistics.speedafShipmentId,
        o.orderNumber,
        o.status,
        o.logistics.consolidatedAt?.toISOString() || '',
        o.createdAt.toISOString(),
      ]),
    ];

    const csv = rows.map((r) => r.join(',')).join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="bestiez-shipments.csv"');
    res.send(csv);
  } catch (error) {
    console.error('CSV export error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Schedule SPEEDAF pickup
// @route   POST /api/admin/logistics/schedule-pickup
// @access  Private/Admin
exports.schedulePickup = async (req, res) => {
  try {
    const { hub = 'China Hub' } = req.body;

    // Get orders ready for pickup (consolidated but not yet shipped)
    const orders = await Order.find({
      status: 'consolidated',
      'logistics.speedafShipmentId': { $exists: false },
    }).limit(50);

    if (orders.length === 0) {
      return res.json({
        success: true,
        message: 'No orders ready for pickup',
        data: { shipmentId: null, orderCount: 0 },
      });
    }

    // Create SPEEDAF shipment
    const shipmentData = {
      origin: hub,
      destination: 'Lagos Hub',
      packages: orders.map((o) => ({
        reference: o.orderNumber,
        weight: 0.5, // Default weight
        dimensions: { length: 10, width: 10, height: 10 },
      })),
    };

    try {
      const shipment = await speedaf.createShipment(shipmentData);
      
      // Update orders with shipment ID
      await Order.updateMany(
        { _id: { $in: orders.map((o) => o._id) } },
        { 
          'logistics.speedafShipmentId': shipment.trackingNumber,
          'logistics.consolidatedAt': new Date(),
          status: 'shipped'
        }
      );

      res.json({
        success: true,
        message: `Pickup scheduled for ${orders.length} orders`,
        data: {
          shipmentId: shipment.trackingNumber,
          orderCount: orders.length,
        },
      });
    } catch (err) {
      console.error('SPEEDAF pickup error:', err);
      // Fallback: mark orders as shipped without SPEEDAF integration
      await Order.updateMany(
        { _id: { $in: orders.map((o) => o._id) } },
        { 
          'logistics.consolidatedAt': new Date(),
          status: 'shipped'
        }
      );

      res.json({
        success: true,
        message: `Orders marked as shipped (SPEEDAF integration pending)`,
        data: { orderCount: orders.length },
      });
    }
  } catch (error) {
    console.error('Schedule pickup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
