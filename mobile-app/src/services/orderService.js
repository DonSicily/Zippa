import { api } from './api';

// Create a new order
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create order' };
  }
};

// Verify payment after Paystack redirect
export const verifyOrderPayment = async (reference) => {
  try {
    const response = await api.post('/orders/verify-payment', { reference });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Payment verification failed' };
  }
};

// Get current user's order history
export const getMyOrders = async (params = {}) => {
  try {
    const response = await api.get('/orders/my-orders', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch orders' };
  }
};

// Get details of a specific order
export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch order details' };
  }
};

// Cancel an order
export const cancelOrder = async (id, reason) => {
  try {
    const response = await api.put(`/orders/${id}/cancel`, { reason });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to cancel order' };
  }
};
