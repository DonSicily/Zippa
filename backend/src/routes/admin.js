const express = require('express');
const router = express.Router();
const {
  getAdminDashboard, approveProduct, approveVendor,
  processPayout, createCampus, getPendingProducts, getAllVendors,
  getAmbassadors, getDashboardMetrics, getGmvHistory, 
  getCampusPerformance, getLiveOperations, getQualityStats, bulkReview
} = require('../controllers/adminController');

const { protect, authorize } = require('../middleware/auth');
const { trackServerEvent } = require('../middleware/analyticsTracker'); // Your explicit tracker

const adminGuard = [protect, authorize('admin')];

// ---- Dashboard & Metrics ----
router.get('/dashboard', ...adminGuard, getAdminDashboard);
router.get('/dashboard/metrics', ...adminGuard, getDashboardMetrics);
router.get('/dashboard/gmv-history', ...adminGuard, getGmvHistory);
router.get('/dashboard/campus-performance', ...adminGuard, getCampusPerformance);
router.get('/dashboard/live-operations', ...adminGuard, getLiveOperations);

// ---- Quality Gate (Product Approvals) ----
router.get('/products/pending', ...adminGuard, getPendingProducts);
router.get('/products/quality-stats', ...adminGuard, getQualityStats);

// Wire tracker to high-value actions so they show in Live Operations feed
router.put('/products/:id/approve', ...adminGuard, trackServerEvent('PRODUCT_REVIEWED'), approveProduct);
router.put('/products/bulk-review', ...adminGuard, trackServerEvent('BULK_REVIEW'), bulkReview);

// ---- Vendor Management ----
router.get('/vendors', ...adminGuard, getAllVendors);
router.put('/vendors/:id/approve', ...adminGuard, trackServerEvent('VENDOR_REVIEWED'), approveVendor);
router.post('/vendors/:id/payout', ...adminGuard, trackServerEvent('PAYOUT_PROCESSED'), processPayout);

// ---- Campus & Ambassadors ----
router.post('/campuses', ...adminGuard, createCampus);
router.get('/ambassadors', ...adminGuard, getAmbassadors);

module.exports = router;
