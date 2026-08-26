const express = require('express');
const router = express.Router();
const { register, login, verifyAccount, getMe, updateProfile, updatePushToken } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/verify', authLimiter, verifyAccount);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/push-token', protect, updatePushToken); // FIX: route was missing entirely

module.exports = router;
