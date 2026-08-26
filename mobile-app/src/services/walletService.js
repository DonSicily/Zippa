import { api } from './api';

// Get current wallet balance
export const getWalletBalance = async () => {
  try {
    const response = await api.get('/wallet/balance');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch balance' };
  }
};

// Fund wallet (Initiates Paystack transaction on backend)
export const fundWallet = async (data) => {
  try {
    const response = await api.post('/wallet/fund', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fund wallet' };
  }
};

// Get transaction history
export const getRecentTransactions = async (limit = 10, type = 'all') => {
  try {
    const response = await api.get('/wallet/transactions', { params: { limit, type } });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch transactions' };
  }
};

// Withdraw funds to bank account
export const withdrawFunds = async (data) => {
  try {
    const response = await api.post('/wallet/withdraw', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to process withdrawal' };
  }
};
