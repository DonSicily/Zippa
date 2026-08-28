const express = require('express');
const router = express.Router();
const { 
  register, login, verifyOtp, refresh, logout,
  getMe, updateProfile, updatePushToken, // Mobile app routes
  adminLogin, verifyAdmin2FA              // Admin dashboard routes
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

// ---- Student/Vendor Auth (Mobile App) ----
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/verify', authLimiter, verifyOtp); 
router.post('/refresh', refresh); 
router.post('/logout', protect, logout); 

// Mobile profile management
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/push-token', protect, updatePushToken);

// ---- Admin Auth (Dashboard with 2FA) ----
router.post('/admin/login', authLimiter, adminLogin);
router.post('/admin/verify-2fa', authLimiter, verifyAdmin2FA);

module.exports = router;
