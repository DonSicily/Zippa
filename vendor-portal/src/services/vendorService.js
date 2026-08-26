import api from './api';

// Dashboard Stats
export const getDashboardStats = async () => {
  const response = await api.get('/vendors/dashboard');
  return response.data;
};

// Products Management
export const getVendorProducts = async (params = {}) => {
  const response = await api.get('/vendors/products', { params });
  return response.data;
};

export const createVendorProduct = async (formData) => {
  // Note: Use multipart/form-data for image uploads
  const response = await api.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateVendorProduct = async (productId, formData) => {
  const response = await api.put(`/products/${productId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteVendorProduct = async (productId) => {
  const response = await api.delete(`/products/${productId}`);
  return response.data;
};

// Order Management
export const getVendorOrders = async (params = {}) => {
  const response = await api.get('/vendors/orders', { params });
  return response.data;
};

// Profile Management
export const updateVendorProfile = async (profileData) => {
  const response = await api.put('/vendors/profile', profileData);
  return response.data;
};
