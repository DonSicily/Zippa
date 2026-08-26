// FIX: this entire route file was missing — see models/WalletTransaction.js

const express = require('express');
const router = express.Router();
const { getBalance, getTransactions, fundWallet, withdrawFunds } = require('../controllers/walletController');
const { protect } = require('../middleware/auth');
const { paymentLimiter } = require('../middleware/rateLimiter');

router.get('/balance', protect, getBalance);
router.get('/transactions', protect, getTransactions);
router.post('/fund', protect, paymentLimiter, fundWallet);
router.post('/withdraw', protect, paymentLimiter, withdrawFunds);

module.exports = router;
