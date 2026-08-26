// Global state for the Super Admin Dashboard.
// Manages high-level metrics, auth, and global UI configurations.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getAdminDashboard } from '../services/adminService';

export const useAdminStore = create(
  persist(
    (set, get) => ({
      // --- Auth State ---
      isAuthenticated: false,
      admin: null,
      token: null,

      // --- Dashboard Data ---
      dashboardStats: {
        totalUsers: 0,
        totalVendors: 0,
        totalRevenue: 0,
        pendingApprovals: 0,
      },
      loadingStats: false,

      // --- Actions ---
      setAuth: (token, adminData) => set({ 
        isAuthenticated: true, 
        token, 
        admin: adminData 
      }),
      
      logout: () => {
        localStorage.removeItem('bestiez_admin_token');
        set({ isAuthenticated: false, admin: null, token: null });
      },

      fetchDashboardStats: async () => {
        set({ loadingStats: true });
        try {
          const response = await getAdminDashboard();
          set({ 
            dashboardStats: response.data.overview,
            loadingStats: false 
          });
        } catch (error) {
          console.error('Failed to fetch admin stats:', error);
          set({ loadingStats: false });
        }
      },

      // Helper to increment pending approvals UI instantly without refetching
      incrementPendingApprovals: () => set((state) => ({
        dashboardStats: { 
          ...state.dashboardStats, 
          pendingApprovals: state.dashboardStats.pendingApprovals + 1 
        }
      })),
      
      decrementPendingApprovals: () => set((state) => ({
        dashboardStats: { 
          ...state.dashboardStats, 
          pendingApprovals: Math.max(0, state.dashboardStats.pendingApprovals - 1) 
        }
      }))
    }),
    {
      name: 'bestiez-admin-storage',
      partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);
