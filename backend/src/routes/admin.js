const express = require('express');
const router = express.Router();
const {
  // Existing
  getAdminDashboard, approveProduct, approveVendor,
  processPayout, createCampus, getPendingProducts, getAllVendors,
  // NEW: Dashboard endpoints
  getDashboardMetrics, getGmvHistory, getCampusPerformance, getLiveOperations,
  // NEW: Quality Gate
  getQualityStats, bulkReview,
} = require('../controllers/adminController');

// NEW: Logistics controller
const {
  getPipeline, getActiveShipments, getShipmentTracking,
  exportCSV, schedulePickup,
} = require('../controllers/logisticsController');

const { protect, authorize } = require('../middleware/auth');

// FIX: Use protect + authorize instead of undefined adminProtect
const adminGuard = [protect, authorize('admin')];

// ---- Existing Routes ----
router.get('/dashboard', ...adminGuard, getAdminDashboard);
router.get('/products/pending', ...adminGuard, getPendingProducts);
router.put('/products/:id/approve', ...adminGuard, approveProduct);
router.get('/vendors', ...adminGuard, getAllVendors);
router.put('/vendors/:id/approve', ...adminGuard, approveVendor);
router.post('/vendors/:id/payout', ...adminGuard, processPayout);
router.post('/campuses', ...adminGuard, createCampus);

// ---- NEW: Dashboard Overview ----
router.get('/dashboard/metrics', ...adminGuard, getDashboardMetrics);
router.get('/dashboard/gmv-history', ...adminGuard, getGmvHistory);
router.get('/dashboard/campus-performance', ...adminGuard, getCampusPerformance);
router.get('/dashboard/live-operations', ...adminGuard, getLiveOperations);

// ---- NEW: Quality Gate ----
router.get('/products/quality-stats', ...adminGuard, getQualityStats);
router.put('/products/bulk-review', ...adminGuard, bulkReview);

// ---- NEW: Global Logistics ----
router.get('/logistics/pipeline', ...adminGuard, getPipeline);
router.get('/logistics/shipments', ...adminGuard, getActiveShipments);
router.get('/logistics/shipments/:id/tracking', ...adminGuard, getShipmentTracking);
router.get('/logistics/export-csv', ...adminGuard, exportCSV);
router.post('/logistics/schedule-pickup', ...adminGuard, schedulePickup);

module.exports = router;
