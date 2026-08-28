const express = require('express');
const router = express.Router();
const {
  getAdminDashboard, approveProduct, approveVendor,
  processPayout, createCampus, getPendingProducts, getAllVendors,
  getAmbassadors // NEW
} = require('../controllers/adminController');

const { protect, adminProtect } = require('../middleware/auth');

// Existing Routes
router.get('/dashboard', protect, adminProtect, getAdminDashboard);
router.get('/products/pending', protect, adminProtect, getPendingProducts);
router.put('/products/:id/approve', protect, adminProtect, approveProduct);
router.get('/vendors', protect, adminProtect, getAllVendors);
router.put('/vendors/:id/approve', protect, adminProtect, approveVendor);
router.post('/vendors/:id/payout', protect, adminProtect, processPayout);
router.post('/campuses', protect, adminProtect, createCampus);

// NEW: Ambassador Route
router.get('/ambassadors', protect, adminProtect, getAmbassadors);

module.exports = router;
