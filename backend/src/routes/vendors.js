const express = require('express');
const router = express.Router();
const {
  registerVendor, 
  loginVendor, 
  getDashboard,
  getVendorProducts, 
  getVendorOrders, 
  updateVendorProfile,
  wechatLogin, 
  updateOrderItemStatus,
  // Added new controllers for payouts (ensure these are exported from vendorController.js)
  getVendorPayoutHistory, 
  requestVendorPayout 
} = require('../controllers/vendorController');

const { protect, vendorProtect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

// Auth
router.post('/register', authLimiter, registerVendor);
router.post('/login', authLimiter, loginVendor);
router.post('/wechat-login', authLimiter, wechatLogin); 

// Dashboard & Profile
router.get('/dashboard', protect, vendorProtect, getDashboard);
router.put('/profile', protect, vendorProtect, updateVendorProfile);

// Products
router.get('/products', protect, vendorProtect, getVendorProducts);

// Orders
router.get('/orders', protect, vendorProtect, getVendorOrders);
router.put('/orders/:id/status', protect, vendorProtect, updateOrderItemStatus); 

// Payouts (New Routes)
router.get('/payouts/history', protect, vendorProtect, getVendorPayoutHistory);
router.post('/payouts/request', protect, vendorProtect, requestVendorPayout);

module.exports = router;
