const express = require('express');
const router = express.Router();
const {
  handleWebhook, getPaymentHistory,
  initializePayment, verifyPaymentGeneric,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');
const { paymentLimiter } = require('../middleware/rateLimiter');
const { trackServerEvent } = require('../middleware/analyticsTracker');

router.post('/webhook', trackServerEvent('PAYMENT_VERIFIED'), handleWebhook);
router.get('/history', protect, getPaymentHistory);
router.post('/initialize', protect, paymentLimiter, trackServerEvent('PAYMENT_INITIALIZED'), initializePayment); 
router.post('/verify', protect, trackServerEvent('PAYMENT_VERIFIED'), verifyPaymentGeneric); 

module.exports = router;
