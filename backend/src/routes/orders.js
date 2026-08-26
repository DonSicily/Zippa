const express = require('express');
const router = express.Router();
const { 
  createOrder, verifyOrderPayment, getMyOrders, 
  getOrderById, cancelOrder 
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.post('/verify-payment', protect, verifyOrderPayment);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;
