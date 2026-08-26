// FIX: added. The mobile app ships a full wallet UI
// (screens/wallet/WalletScreen.js, FundWalletScreen.js,
// TransactionHistoryScreen.js) and a service layer
// (services/walletService.js) calling GET /wallet/balance,
// GET /wallet/transactions, POST /wallet/fund, POST /wallet/withdraw —
// but none of it existed on the backend. This model + the wallet
// controller/routes implement it.

const mongoose = require('mongoose');

const walletTransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: ['fund', 'withdraw', 'order_payment', 'refund'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  reference: {
    type: String,
    unique: true,
    sparse: true,
  },
  method: {
    type: String, // e.g. 'paystack', 'bank_transfer'
    default: 'paystack',
  },
  bankDetails: {
    accountNumber: String,
    bankCode: String,
    accountName: String,
  },
  balanceAfter: Number,
  notes: String,
}, {
  timestamps: true,
});

walletTransactionSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('WalletTransaction', walletTransactionSchema);
