// Global state for the Super Admin Dashboard.
// Manages high-level metrics, auth, and global UI configurations.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  getAdminDashboard,
  getDashboardMetrics,
  getGmvHistory,
  getCampusPerformance,
  getLiveOperations,
  getQualityStats,
  getLogisticsPipeline,
  getActiveShipments,
} from '../services/adminService';

export const useAdminStore = create(
  persist(
    (set, get) => ({
      // --- Auth State ---
      isAuthenticated: false,
      admin: null,
      token: null,
      pending2FA: false, // NEW: true while awaiting an authenticator OTP

      // --- Dashboard Data (legacy overview, kept for compatibility) ---
      dashboardStats: {
        totalUsers: 0,
        totalVendors: 0,
        totalRevenue: 0,
        pendingApprovals: 0,
      },
      loadingStats: false,

      // --- NEW: Redesigned Overview page ---
      dateRange: '30d', // "Last 30 days" picker in the top bar
      overviewMetrics: {
        totalGMV: 0,
        gmvTrend: null,
        activeVendors: 0,
        vendorTrend: null,
        pendingQC: 0,
        activeCampuses: 0,
        campusTrend: null,
      },
      gmvHistory: [],        // area-chart series
      campusPerformance: [], // campus share bars
      liveOperations: [],    // live activity feed
      loadingOverview: false,

      // --- NEW: Quality Gate counters (Pending / Approved today / Rejected today) ---
      qualityStats: { pending: 0, approvedToday: 0, rejectedToday: 0 },
      loadingQualityStats: false,

      // --- NEW: Global Logistics ---
      logisticsPipeline: [],
      activeShipments: [],
      shipmentRange: '24h', // "Last 24h" dropdown on the map card
      loadingLogistics: false,

      // --- Actions ---
      setAuth: (token, adminData) =>
        set({ isAuthenticated: true, token, admin: adminData, pending2FA: false }),

      // NEW: used by Login.js when the backend issues a 2FA challenge
      setPending2FA: (value) => set({ pending2FA: Boolean(value) }),

      logout: () => {
        localStorage.removeItem('bestiez_admin_token');
        set({ isAuthenticated: false, admin: null, token: null, pending2FA: false });
      },

      // --- NEW: date-range picker drives every overview fetch ---
      setDateRange: (range) => {
        set({ dateRange: range });
        get().fetchAllOverview();
      },

      // NEW: "Last 24h" dropdown on the logistics map card
      setShipmentRange: (range) => {
        set({ shipmentRange: range });
        get().fetchActiveShipments();
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

      // NEW: single call that hydrates the whole Overview page
      fetchAllOverview: async () => {
        set({ loadingOverview: true });
        try {
          const range = get().dateRange;
          const [metrics, gmv, campus, live] = await Promise.all([
            getDashboardMetrics(range),
            getGmvHistory(range),
            getCampusPerformance(range),
            getLiveOperations(),
          ]);
          set({
            overviewMetrics: metrics.data,
            gmvHistory: gmv.data,
            campusPerformance: campus.data,
            liveOperations: live.data,
            loadingOverview: false,
          });
        } catch (error) {
          console.error('Failed to fetch overview data:', error);
          set({ loadingOverview: false });
        }
      },

      // NEW: Quality Gate header pills
      fetchQualityStats: async () => {
        set({ loadingQualityStats: true });
        try {
          const response = await getQualityStats();
          set({ qualityStats: response.data, loadingQualityStats: false });
        } catch (error) {
          console.error('Failed to fetch quality stats:', error);
          set({ loadingQualityStats: false });
        }
      },

      // NEW: pipeline + shipments for the Orders & Logistics page
      fetchLogistics: async () => {
        set({ loadingLogistics: true });
        try {
          const [pipeline, shipments] = await Promise.all([
            getLogisticsPipeline(),
            getActiveShipments(get().shipmentRange),
          ]);
          set({
            logisticsPipeline: pipeline.data,
            activeShipments: shipments.data,
            loadingLogistics: false,
          });
        } catch (error) {
          console.error('Failed to fetch logistics data:', error);
          set({ loadingLogistics: false });
        }
      },

      // NEW: standalone refresh (used by the "Last 24h" dropdown)
      fetchActiveShipments: async () => {
        try {
          const response = await getActiveShipments(get().shipmentRange);
          set({ activeShipments: response.data });
        } catch (error) {
          console.error('Failed to fetch active shipments:', error);
        }
      },

      // Helper to increment pending approvals UI instantly without refetching.
      // Now also keeps the Quality Gate pill + sidebar badge in sync.
      incrementPendingApprovals: () => set((state) => ({
        dashboardStats: {
          ...state.dashboardStats,
          pendingApprovals: state.dashboardStats.pendingApprovals + 1
        },
        qualityStats: {
          ...state.qualityStats,
          pending: state.qualityStats.pending + 1
        }
      })),

      decrementPendingApprovals: () => set((state) => ({
        dashboardStats: {
          ...state.dashboardStats,
          pendingApprovals: Math.max(0, state.dashboardStats.pendingApprovals - 1)
        },
        qualityStats: {
          ...state.qualityStats,
          pending: Math.max(0, state.qualityStats.pending - 1)
        }
      })),

      // NEW: bulk adjust after "Bulk Actions" approve/reject (delta may be negative)
      adjustPendingApprovals: (delta) => set((state) => ({
        dashboardStats: {
          ...state.dashboardStats,
          pendingApprovals: Math.max(0, state.dashboardStats.pendingApprovals + delta)
        },
        qualityStats: {
          ...state.qualityStats,
          pending: Math.max(0, state.qualityStats.pending + delta)
        }
      })),
    }),
    {
      name: 'bestiez-admin-storage',
      partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);
