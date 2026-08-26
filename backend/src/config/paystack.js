const axios = require('axios');

const PAYSTACK_BASE_URL = 'https://api.paystack.co';

const paystackApi = axios.create({
  baseURL: PAYSTACK_BASE_URL,
  headers: {
    'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Initialize payment transaction
const initializePayment = async (email, amount, metadata) => {
  try {
    const response = await paystackApi.post('/transaction/initialize', {
      email,
      amount: amount * 100, // Convert to kobo
      currency: 'NGN',
      metadata,
    });
    return response.data;
  } catch (error) {
    console.error('Paystack initialization error:', error.response?.data || error.message);
    throw error;
  }
};

// Verify payment
const verifyPayment = async (reference) => {
  try {
    const response = await paystackApi.get(`/transaction/verify/${reference}`);
    return response.data;
  } catch (error) {
    console.error('Paystack verification error:', error.response?.data || error.message);
    throw error;
  }
};

// Get transaction details
const getTransaction = async (id) => {
  try {
    const response = await paystackApi.get(`/transaction/${id}`);
    return response.data;
  } catch (error) {
    console.error('Paystack get transaction error:', error);
    throw error;
  }
};

module.exports = {
  initializePayment,
  verifyPayment,
  getTransaction,
};
