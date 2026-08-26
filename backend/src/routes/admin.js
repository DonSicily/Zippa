const express = require('express');
const router = express.Router();
const {
  getAdminDashboard, approveProduct, approveVendor,
  processPayout, createCampus, getPendingProducts, getAllVendors,
} = require('../controllers/adminController');
const { protect, adminProtect } = require('../middleware/auth');

router.get('/dashboard', protect, adminProtect, getAdminDashboard);
router.get('/products/pending', protect, adminProtect, getPendingProducts);
router.put('/products/:id/approve', protect, adminProtect, approveProduct);
router.get('/vendors', protect, adminProtect, getAllVendors); // FIX: was missing
router.put('/vendors/:id/approve', protect, adminProtect, approveVendor);
router.post('/vendors/:id/payout', protect, adminProtect, processPayout);
router.post('/campuses', protect, adminProtect, createCampus);

module.exports = router;
