// Global state for the Vendor Portal.
// Manages authentication, profile data, and UI states (like sidebar toggles).
// Requires: npm install zustand

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

export const useVendorStore = create(
  persist(
    (set, get) => ({
      // --- Auth State ---
      isAuthenticated: false,
      vendor: null,
      token: null,

      // --- UI State ---
      isSidebarCollapsed: false,

      // --- Actions ---
      setAuth: (token, vendorData) => set({ 
        isAuthenticated: true, 
        token, 
        vendor: vendorData 
      }),
      
      logout: () => {
        localStorage.removeItem('bestiez_vendor_token');
        set({ isAuthenticated: false, vendor: null, token: null });
      },

      updateProfile: (updatedData) => set((state) => ({
        vendor: { ...state.vendor, ...updatedData }
      })),

      toggleSidebar: () => set((state) => ({ 
        isSidebarCollapsed: !state.isSidebarCollapsed 
      })),

      // --- API Actions ---
      fetchVendorProfile: async () => {
        try {
          const response = await api.get('/vendors/profile');
          set({ vendor: response.data.data });
        } catch (error) {
          console.error('Failed to fetch vendor profile:', error);
        }
      }
    }),
    {
      name: 'bestiez-vendor-storage', // Name for localStorage
      partialize: (state) => ({ 
        token: state.token, 
        isAuthenticated: state.isAuthenticated,
        vendor: state.vendor 
      }), // Only persist these specific fields
    }
  )
);
