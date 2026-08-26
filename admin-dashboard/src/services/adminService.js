import api from './api';

// Admin Dashboard Overview
export const getAdminDashboard = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

// Quality Gate (Product Approvals)
export const getPendingProducts = async () => {
  const response = await api.get('/admin/products/pending');
  return response.data;
};

export const approveProduct = async (productId) => {
  const response = await api.put(`/admin/products/${productId}/approve`, { action: 'approve' });
  return response.data;
};

export const rejectProduct = async (productId, rejectionReason) => {
  const response = await api.put(`/admin/products/${productId}/approve`, { 
    action: 'reject', 
    rejectionReason 
  });
  return response.data;
};

// Vendor Management
export const getAllVendors = async () => {
  const response = await api.get('/admin/vendors'); // Assuming a route exists or using a generic users route filtered by role
  return response.data;
};

export const approveVendor = async (vendorId) => {
  const response = await api.put(`/admin/vendors/${vendorId}/approve`, { action: 'approve' });
  return response.data;
};

// Financials & Payouts
export const processVendorPayout = async (vendorId, amount) => {
  const response = await api.post(`/admin/vendors/${vendorId}/payout`, { amount });
  return response.data;
};

// Campus Management
export const createCampus = async (campusData) => {
  const response = await api.post('/admin/campuses', campusData);
  return response.data;
};
