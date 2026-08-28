const express = require('express');
const router = express.Router();
const {
  createOrder, verifyOrderPayment, getMyOrders,
  getOrderById, cancelOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');
const { trackServerEvent } = require('../middleware/analyticsTracker');

// Student order lifecycle
router.post('/', protect, trackServerEvent('ORDER_CREATED'), createOrder);
router.post('/verify-payment', protect, trackServerEvent('PAYMENT_VERIFIED'), verifyOrderPayment);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/cancel', protect, trackServerEvent('ORDER_CANCELLED'), cancelOrder);

module.exports = router;
