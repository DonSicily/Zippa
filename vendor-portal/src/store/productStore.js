// Dedicated state for Product Management in the Vendor Portal.
// Keeps the Product List and Product Form decoupled from the main store for better performance.

import { create } from 'zustand';
import { getVendorProducts, createVendorProduct, deleteVendorProduct } from '../services/vendorService';

export const useProductStore = create((set, get) => ({
  // --- Data State ---
  products: [],
  loading: false,
  error: null,
  pagination: { page: 1, totalPages: 1, totalItems: 0 },
  filters: { status: 'all', category: 'all' },

  // --- Actions ---
  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters }, pagination: { ...get().pagination, page: 1 } });
    get().fetchProducts(); // Auto-fetch when filters change
  },

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { page, limit } = get().pagination;
      const { status, category } = get().filters;
      
      const response = await getVendorProducts({ page, limit, status, category });
      
      set({ 
        products: response.data, 
        pagination: response.pagination,
        loading: false 
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addProduct: async (formData) => {
    set({ loading: true });
    try {
      await createVendorProduct(formData);
      set({ loading: false });
      get().fetchProducts(); // Refresh list
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },

  removeProduct: async (productId) => {
    try {
      await deleteVendorProduct(productId);
      set((state) => ({
        products: state.products.filter(p => p._id !== productId)
      }));
    } catch (error) {
      set({ error: error.message });
    }
  }
}));
