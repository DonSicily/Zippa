// --- Order Fulfillment ---
export const updateOrderStatus = async (orderId, status) => {
  // Fixed path to match vendors.js
  const response = await api.put(`/vendors/orders/${orderId}/status`, { status });
  return response.data;
};

// --- Payouts (Requires backend additions, see below) ---
export const getPayoutHistory = async (params = {}) => {
  const response = await api.get('/vendors/payouts/history', { params });
  return response.data;
};

export const requestPayout = async (amount) => {
  const response = await api.post('/vendors/payouts/request', { amount });
  return response.data;
};
