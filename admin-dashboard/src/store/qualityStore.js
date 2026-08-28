// Dedicated state for the Quality Gate (Product Approvals).
// Isolates the approval queue so the rest of the admin dashboard doesn't re-render when a product is approved.
import { create } from 'zustand';
import {
  getPendingProducts,
  approveProduct,
  rejectProduct,
  getQualityStats,
  bulkQualityAction,
} from '../services/adminService';
import { useAdminStore } from './adminStore';

// Seed data mirrors the approved mockup so the UI renders correctly
// even before the new backend endpoints are deployed.
const SEED_PRODUCTS = [
  { _id: 'P-101', sku: 'BZ-101', name: 'Aero Pro Wireless Earbuds Pro', vendor: 'Shenzhen Tech Co.', loc: 'Shenzhen', price: '$58', submitted: '2h ago', assets: 3, assetsOk: true, score: 94, status: 'Pending' },
  { _id: 'P-102', sku: 'BZ-102', name: 'Oversized Campus Hoodie', vendor: 'Guangzhou Fashion', loc: 'Guangzhou', price: '$32', submitted: '3h ago', assets: 2, assetsOk: false, score: 78, status: 'Pending' },
  { _id: 'P-103', sku: 'BZ-103', name: 'Aurora LED Desk Lamp v2', vendor: 'Yiwu Home Goods', loc: 'Yiwu', price: '$18', submitted: '5h ago', assets: 4, assetsOk: true, score: 88, status: 'Flagged' },
  { _id: 'P-104', sku: 'BZ-104', name: 'Urban Comfort Sneakers 2026', vendor: 'Dongguan Bags Ltd', loc: 'Dongguan', price: '$52', submitted: '8h ago', assets: 3, assetsOk: true, score: 92, status: 'Pending' },
  { _id: 'P-105', sku: 'BZ-105', name: 'Eco-Friendly Dorm Bottle', vendor: 'Yiwu Home Goods', loc: 'Yiwu', price: '$14', submitted: '1d ago', assets: 1, assetsOk: false, score: 62, status: 'Flagged' },
];

export const useQualityStore = create((set, get) => ({
  // --- Data State ---
  pendingProducts: SEED_PRODUCTS,
  loading: false,
  actionLoading: null, // Stores the ID of the product currently being approved/rejected ('bulk' for bulk ops)

  // NEW: header pills (Pending / Approved today / Rejected today)
  qualityStats: { pending: 12, approvedToday: 28, rejectedToday: 3 },

  // NEW: toolbar state — filter tabs, bulk selection, pagination
  filter: 'all', // 'all' | 'pending' | 'flagged'
  selectedIds: [],
  page: 1,
  pageSize: 5,

  // --- UI Actions ---
  setFilter: (filter) => set({ filter, page: 1, selectedIds: [] }),
  setPage: (page) => set({ page }),

  toggleSelect: (id) => set((state) => ({
    selectedIds: state.selectedIds.includes(id)
      ? state.selectedIds.filter((s) => s !== id)
      : [...state.selectedIds, id],
  })),

  toggleSelectAll: (ids) => set((state) => ({
    selectedIds: state.selectedIds.length === ids.length ? [] : [...ids],
  })),

  // --- Data Actions ---
  fetchPendingProducts: async () => {
    set({ loading: true });
    try {
      const response = await getPendingProducts();
      set({ pendingProducts: response.data, loading: false });
    } catch (error) {
      console.error('Failed to fetch pending products:', error);
      set({ loading: false }); // Seed data remains as graceful fallback
    }
  },

  // NEW: refresh header pills from the backend
  fetchQualityStats: async () => {
    try {
      const response = await getQualityStats();
      set({ qualityStats: response.data });
    } catch (error) {
      console.error('Failed to fetch quality stats:', error);
    }
  },

  handleApprove: async (productId) => {
    set({ actionLoading: productId });
    try {
      await approveProduct(productId);
      // Optimistic UI update: remove from list immediately, bump counters
      set((state) => ({
        pendingProducts: state.pendingProducts.filter((p) => p._id !== productId),
        actionLoading: null,
        qualityStats: {
          ...state.qualityStats,
          pending: Math.max(0, state.qualityStats.pending - 1),
          approvedToday: state.qualityStats.approvedToday + 1,
        },
      }));
      useAdminStore.getState().decrementPendingApprovals();
      return { success: true };
    } catch (error) {
      set({ actionLoading: null });
      return { success: false, message: error.message };
    }
  },

  handleReject: async (productId, rejectionReason) => {
    set({ actionLoading: productId });
    try {
      await rejectProduct(productId, rejectionReason);
      set((state) => ({
        pendingProducts: state.pendingProducts.filter((p) => p._id !== productId),
        actionLoading: null,
        qualityStats: {
          ...state.qualityStats,
          pending: Math.max(0, state.qualityStats.pending - 1),
          rejectedToday: state.qualityStats.rejectedToday + 1,
        },
      }));
      useAdminStore.getState().decrementPendingApprovals();
      return { success: true };
    } catch (error) {
      set({ actionLoading: null });
      return { success: false, message: error.message };
    }
  },

  // NEW: bulk approve/reject from the "Bulk Actions" dropdown
  handleBulkAction: async (action, reason = null) => {
    const ids = get().selectedIds;
    if (!ids.length) return { success: false, message: 'No products selected' };
    set({ actionLoading: 'bulk' });
    try {
      await bulkQualityAction(ids, action, reason);
      set((state) => ({
        pendingProducts: state.pendingProducts.filter((p) => !ids.includes(p._id)),
        selectedIds: [],
        actionLoading: null,
        qualityStats: {
          ...state.qualityStats,
          pending: Math.max(0, state.qualityStats.pending - ids.length),
          approvedToday: state.qualityStats.approvedToday + (action === 'approve' ? ids.length : 0),
          rejectedToday: state.qualityStats.rejectedToday + (action === 'reject' ? ids.length : 0),
        },
      }));
      useAdminStore.getState().adjustPendingApprovals(-ids.length);
      return { success: true };
    } catch (error) {
      set({ actionLoading: null });
      return { success: false, message: error.message };
    }
  },
}));
