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

// Seed mirrors the approved mockup (12 pending items → 3 pages at pageSize 5)
// and remains as a graceful fallback until the new backend endpoints ship.
const SEED_PRODUCTS = [
  { _id: 'P-101', sku: 'BZ-101', name: 'Aero Pro Wireless Earbuds Pro', vendor: 'Shenzhen Tech Co.', loc: 'Shenzhen', price: '$58', submitted: '2h ago', assets: 3, assetsOk: true, score: 94, status: 'Pending' },
  { _id: 'P-102', sku: 'BZ-102', name: 'Oversized Campus Hoodie', vendor: 'Guangzhou Fashion', loc: 'Guangzhou', price: '$32', submitted: '3h ago', assets: 2, assetsOk: false, score: 78, status: 'Pending' },
  { _id: 'P-103', sku: 'BZ-103', name: 'Aurora LED Desk Lamp v2', vendor: 'Yiwu Home Goods', loc: 'Yiwu', price: '$18', submitted: '5h ago', assets: 4, assetsOk: true, score: 88, status: 'Flagged' },
  { _id: 'P-104', sku: 'BZ-104', name: 'Urban Comfort Sneakers 2026', vendor: 'Dongguan Bags Ltd', loc: 'Dongguan', price: '$52', submitted: '8h ago', assets: 3, assetsOk: true, score: 92, status: 'Pending' },
  { _id: 'P-105', sku: 'BZ-105', name: 'Eco-Friendly Dorm Bottle', vendor: 'Yiwu Home Goods', loc: 'Yiwu', price: '$14', submitted: '1d ago', assets: 1, assetsOk: false, score: 62, status: 'Flagged' },
  { _id: 'P-106', sku: 'BZ-106', name: 'Titan Power Bank 20K', vendor: 'Shenzhen Tech Co.', loc: 'Shenzhen', price: '$22', submitted: '1d ago', assets: 3, assetsOk: true, score: 90, status: 'Pending' },
  { _id: 'P-107', sku: 'BZ-107', name: 'Minimalist Canvas Tote', vendor: 'Guangzhou Fashion', loc: 'Guangzhou', price: '$12', submitted: '1d ago', assets: 2, assetsOk: false, score: 74, status: 'Flagged' },
  { _id: 'P-108', sku: 'BZ-108', name: 'Smart Study Planner Kit', vendor: 'Yiwu Home Goods', loc: 'Yiwu', price: '$16', submitted: '2d ago', assets: 4, assetsOk: true, score: 86, status: 'Pending' },
  { _id: 'P-109', sku: 'BZ-109', name: 'Cozy Fleece Blanket', vendor: 'Hangzhou Living', loc: 'Hangzhou', price: '$25', submitted: '2d ago', assets: 3, assetsOk: true, score: 91, status: 'Pending' },
  { _id: 'P-110', sku: 'BZ-110', name: 'Bluetooth Party Speaker', vendor: 'Shenzhen Tech Co.', loc: 'Shenzhen', price: '$40', submitted: '2d ago', assets: 1, assetsOk: false, score: 58, status: 'Flagged' },
  { _id: 'P-111', sku: 'BZ-111', name: 'Gradient Water Bottle 1L', vendor: 'Yiwu Home Goods', loc: 'Yiwu', price: '$11', submitted: '3d ago', assets: 3, assetsOk: true, score: 89, status: 'Pending' },
  { _id: 'P-112', sku: 'BZ-112', name: 'Campus Backpack Pro', vendor: 'Dongguan Bags Ltd', loc: 'Dongguan', price: '$35', submitted: '3d ago', assets: 5, assetsOk: true, score: 95, status: 'Pending' },
];

export const useQualityStore = create((set, get) => ({
  // --- Data State ---
  pendingProducts: SEED_PRODUCTS,
  loading: false,
  actionLoading: null, // product _id currently being actioned, or 'bulk'

  // Header pills (Pending / Approved today / Rejected today)
  qualityStats: { pending: 12, approvedToday: 28, rejectedToday: 3 },

  // Toolbar state — filter tabs, bulk selection, pagination
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
      set({ loading: false }); // Seed remains as fallback
    }
  },

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
