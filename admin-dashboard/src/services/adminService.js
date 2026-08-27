import api from './api';

// ============================================================
// AUTH — 2FA-aware admin login (redesigned Login page)
// ============================================================

// Posts credentials; backend responds with either a session token
// or a 2FA challenge when use2FA is enabled.
export const adminLogin = async (email, password, use2FA = true) => {
  const response = await api.post('/auth/admin/login', { email, password, use2FA });
  return response.data;
};

// Verifies the authenticator OTP and returns the session token.
export const verifyAdmin2FA = async (otp) => {
  const response = await api.post('/auth/admin/verify-2fa', { otp });
  return response.data;
};

// ============================================================
// ADMIN DASHBOARD OVERVIEW (redesigned "Overview" page)
// ============================================================

// Legacy overview (kept for backward compatibility)
export const getAdminDashboard = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

// NEW: KPI cards — Total GMV, Active Vendors, Pending QC, Active Campuses (+ trend %)
export const getDashboardMetrics = async (range = '30d') => {
  const response = await api.get('/admin/dashboard/metrics', { params: { range } });
  return response.data;
};

// NEW: "GMV · Last 30 days" area-chart series
export const getGmvHistory = async (range = '30d') => {
  const response = await api.get('/admin/dashboard/gmv-history', { params: { range } });
  return response.data;
};

// NEW: Campus performance bars (UNILAG / OAU / UI / UNN % of total orders)
export const getCampusPerformance = async (range = '30d') => {
  const response = await api.get('/admin/dashboard/campus-performance', { params: { range } });
  return response.data;
};

// NEW: Live operations feed (order shipped, vendor application, QC failure, etc.)
export const getLiveOperations = async () => {
  const response = await api.get('/admin/dashboard/live-operations');
  return response.data;
};

// ============================================================
// QUALITY GATE (Product Approvals)
// ============================================================

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

// NEW: header pills (Pending / Approved today / Rejected today)
export const getQualityStats = async () => {
  const response = await api.get('/admin/products/quality-stats');
  return response.data;
};

// NEW: bulk approve/reject from the "Bulk Actions" dropdown
export const bulkQualityAction = async (productIds, action, reason = null) => {
  const response = await api.put('/admin/products/bulk-review', {
    productIds,
    action,
    reason,
  });
  return response.data;
};

// ============================================================
// VENDOR MANAGEMENT
// ============================================================

export const getAllVendors = async () => {
  const response = await api.get('/admin/vendors'); // Assuming a route exists or using a generic users route filtered by role
  return response.data;
};

export const approveVendor = async (vendorId) => {
  const response = await api.put(`/admin/vendors/${vendorId}/approve`, { action: 'approve' });
  return response.data;
};

// ============================================================
// FINANCIALS & PAYOUTS
// ============================================================

export const processVendorPayout = async (vendorId, amount) => {
  const response = await api.post(`/admin/vendors/${vendorId}/payout`, { amount });
  return response.data;
};

// ============================================================
// CAMPUS MANAGEMENT
// ============================================================

export const createCampus = async (campusData) => {
  const response = await api.post('/admin/campuses', campusData);
  return response.data;
};

// ============================================================
// GLOBAL LOGISTICS (redesigned "Orders & Logistics" page)
// ============================================================

// NEW: 5-stage pipeline counts (Confirmed → China Hub → SPEEDAF → Customs → Campus Pickup)
export const getLogisticsPipeline = async () => {
  const response = await api.get('/admin/logistics/pipeline');
  return response.data;
};

// NEW: Active SPEEDAF consolidations (list + map markers), filterable by range
export const getActiveShipments = async (range = '24h') => {
  const response = await api.get('/admin/logistics/shipments', { params: { range } });
  return response.data;
};

// NEW: detailed tracking timeline for a single SPEEDAF ID ("Track" action)
export const getShipmentTracking = async (speedafId) => {
  const response = await api.get(`/admin/logistics/shipments/${speedafId}/tracking`);
  return response.data;
};

// NEW: "Export CSV" button — returns a Blob so the UI can trigger a file download
export const exportShipmentsCSV = async () => {
  const response = await api.get('/admin/logistics/export-csv', { responseType: 'blob' });
  return response;
};

// NEW: "Schedule Pickup" button — books a SPEEDAF collection from the China hub
export const schedulePickup = async (pickupData) => {
  const response = await api.post('/admin/logistics/schedule-pickup', pickupData);
  return response.data;
};
