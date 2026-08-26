const express = require('express');
const router = express.Router();
const {
  handleWebhook, getPaymentHistory,
  initializePayment, verifyPaymentGeneric,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');
const { paymentLimiter } = require('../middleware/rateLimiter');

router.post('/webhook', handleWebhook);
router.get('/history', protect, getPaymentHistory);
router.post('/initialize', protect, paymentLimiter, initializePayment); // FIX: was missing
router.post('/verify', protect, verifyPaymentGeneric); // FIX: was missing

module.exports = router;
