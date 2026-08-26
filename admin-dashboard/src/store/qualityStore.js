// Dedicated state for the Quality Gate (Product Approvals).
// Isolates the approval queue so the rest of the admin dashboard doesn't re-render when a product is approved.

import { create } from 'zustand';
import { getPendingProducts, approveProduct, rejectProduct } from '../services/adminService';
import { useAdminStore } from './adminStore';

export const useQualityStore = create((set, get) => ({
  // --- Data State ---
  pendingProducts: [],
  loading: false,
  actionLoading: null, // Stores the ID of the product currently being approved/rejected

  // --- Actions ---
  fetchPendingProducts: async () => {
    set({ loading: true });
    try {
      const response = await getPendingProducts();
      set({ pendingProducts: response.data, loading: false });
    } catch (error) {
      console.error('Failed to fetch pending products:', error);
      set({ loading: false });
    }
  },

  handleApprove: async (productId) => {
    set({ actionLoading: productId });
    try {
      await approveProduct(productId);
      
      // Optimistic UI update: Remove from list immediately
      set((state) => ({
        pendingProducts: state.pendingProducts.filter(p => p._id !== productId),
        actionLoading: null
      }));
      
      // Update global admin stats
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
        pendingProducts: state.pendingProducts.filter(p => p._id !== productId),
        actionLoading: null
      }));
      
      useAdminStore.getState().decrementPendingApprovals();
      return { success: true };
    } catch (error) {
      set({ actionLoading: null });
      return { success: false, message: error.message };
    }
  }
}));
