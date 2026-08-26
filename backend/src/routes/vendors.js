const express = require('express');
const router = express.Router();
const {
  registerVendor, loginVendor, getDashboard,
  getVendorProducts, getVendorOrders, updateVendorProfile,
  wechatLogin, updateOrderItemStatus,
} = require('../controllers/vendorController');
const { protect, vendorProtect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, registerVendor);
router.post('/login', authLimiter, loginVendor);
router.post('/wechat-login', authLimiter, wechatLogin); // FIX: was missing
router.get('/dashboard', protect, vendorProtect, getDashboard);
router.get('/products', protect, vendorProtect, getVendorProducts);
router.get('/orders', protect, vendorProtect, getVendorOrders);
router.put('/orders/:id/status', protect, vendorProtect, updateOrderItemStatus); // FIX: was missing
router.put('/profile', protect, vendorProtect, updateVendorProfile);

module.exports = router;
