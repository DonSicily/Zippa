const express = require('express');
const router = express.Router();
const { 
  register, login, verifyOtp, refresh, logout,
  adminLogin, verifyAdmin2FA // NEW: Admin 2FA endpoints
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

// Student/Vendor auth (existing)
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/verify', authLimiter, verifyOtp); // FIX: was verifyAccount
router.post('/refresh', refresh); // FIX: was missing
router.post('/logout', protect, logout); // FIX: was missing

// NEW: Admin-specific auth with 2FA support
router.post('/admin/login', authLimiter, adminLogin);
router.post('/admin/verify-2fa', authLimiter, verifyAdmin2FA);

module.exports = router;
