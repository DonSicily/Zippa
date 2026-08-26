// FIX: this entire controller was missing — see note in
// models/WalletTransaction.js for context.

const User = require('../models/User');
const WalletTransaction = require('../models/WalletTransaction');
const { initializePayment } = require('../config/paystack');

// @desc    Get current wallet balance
// @route   GET /api/wallet/balance
// @access  Private
exports.getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('walletBalance');
    res.json({ success: true, data: { balance: user.walletBalance } });
  } catch (error) {
    console.error('Get wallet balance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get wallet transaction history
// @route   GET /api/wallet/transactions
// @access  Private
exports.getTransactions = async (req, res) => {
  try {
    const { limit = 10, type = 'all' } = req.query;
    const filter = { user: req.user.id };
    if (type !== 'all') filter.type = type;

    const transactions = await WalletTransaction.find(filter)
      .sort('-createdAt')
      .limit(Number(limit));

    res.json({ success: true, data: transactions });
  } catch (error) {
    console.error('Get wallet transactions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Initiate a Paystack transaction to top up the wallet
// @route   POST /api/wallet/fund
// @access  Private
exports.fundWallet = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'A valid amount is required' });
    }

    const payment = await initializePayment(req.user.email, amount, {
      type: 'wallet_funding',
      userId: req.user.id,
    });

    await WalletTransaction.create({
      user: req.user.id,
      type: 'fund',
      amount,
      status: 'pending',
      reference: payment.data.reference,
      method: 'paystack',
    });

    res.status(201).json({
      success: true,
      message: 'Complete payment to fund your wallet',
      data: {
        reference: payment.data.reference,
        paymentUrl: payment.data.authorization_url,
      },
    });
  } catch (error) {
    console.error('Fund wallet error:', error);
    res.status(500).json({ message: 'Server error initiating wallet funding' });
  }
};

// @desc    Withdraw funds from wallet to a bank account
// @route   POST /api/wallet/withdraw
// @access  Private
// NOTE: this records the withdrawal and decrements the balance immediately.
// A production build should integrate Paystack Transfers
// (https://paystack.com/docs/transfers/) and only mark the transaction
// 'completed' once the transfer succeeds — wiring that up requires a
// dedicated Paystack "Transfer Recipient" business balance and is left as
// a follow-up (see DEPLOYMENT_MANUAL.md "Known Limitations").
exports.withdrawFunds = async (req, res) => {
  try {
    const { amount, accountNumber, bankCode, accountName } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'A valid amount is required' });
    }
    if (!accountNumber || !bankCode || !accountName) {
      return res.status(400).json({ message: 'Bank account details are required' });
    }

    const user = await User.findById(req.user.id);
    if (user.walletBalance < amount) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }

    user.walletBalance -= amount;
    await user.save();

    const transaction = await WalletTransaction.create({
      user: req.user.id,
      type: 'withdraw',
      amount,
      status: 'pending', // flipped to 'completed' once ops confirms the bank transfer
      method: 'bank_transfer',
      bankDetails: { accountNumber, bankCode, accountName },
      balanceAfter: user.walletBalance,
      notes: 'Awaiting manual payout confirmation',
    });

    res.status(201).json({
      success: true,
      message: 'Withdrawal request submitted and will be processed within 1-2 business days',
      data: transaction,
    });
  } catch (error) {
    console.error('Withdraw funds error:', error);
    res.status(500).json({ message: 'Server error processing withdrawal' });
  }
};
