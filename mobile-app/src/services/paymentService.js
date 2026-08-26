import { api } from './api';
import { PAYSTACK_PUBLIC_KEY } from '../utils/constants';

// Initialize a Paystack transaction via our backend
export const initializePayment = async (email, amount, metadata) => {
  try {
    // We call our backend to initialize, so the secret key stays secure on the server
    const response = await api.post('/payments/initialize', { email, amount, metadata });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Payment initialization failed' };
  }
};

// Verify the transaction status via our backend
export const verifyPayment = async (reference) => {
  try {
    const response = await api.post('/payments/verify', { reference });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Payment verification failed' };
  }
};

// Helper to generate Paystack inline config for React Native WebView
export const getPaystackConfig = (email, amount, reference, onSuccess, onClose) => {
  return {
    email,
    amount: amount * 100, // Paystack expects amount in kobo
    publicKey: PAYSTACK_PUBLIC_KEY,
    reference,
    onSuccess: (transaction) => onSuccess(transaction),
    onClose: () => onClose(),
    currency: 'NGN',
    channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
  };
};
