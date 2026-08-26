// Centralized color palette for the Super Admin Dashboard.
// Slightly more authoritative and data-dense than the vendor portal.

export const COLORS = {
  primary: '#004E89',     // Navy Blue (Authoritative)
  primaryDark: '#003366',
  
  accent: '#FF6B35',      // Orange (High-priority actions)
  
  sidebar: '#0F172A',     // Dark Slate (Sidebar background)
  sidebarText: '#94A3B8', // Muted text for sidebar
  
  background: '#F8FAFC',  // Very light slate (Main background)
  surface: '#FFFFFF',     // White (Cards, Tables)
  
  textDark: '#0F172A',    // Very dark slate (Primary text)
  textLight: '#64748B',   // Medium slate (Secondary text)
  
  border: '#E2E8F0',      // Light gray (Table borders)
  borderLight: '#F1F5F9', // Very light gray (Row dividers)
  
  success: '#10B981',     // Emerald Green (Revenue, approved)
  successLight: '#D1FAE5',
  
  warning: '#F59E0B',     // Amber (Pending, needs attention)
  warningLight: '#FEF3C7',
  
  danger: '#EF4444',      // Red (Rejected, suspended, critical errors)
  dangerLight: '#FEE2E2',
  
  info: '#3B82F6',        // Blue (In transit, processing)
  infoLight: '#DBEAFE',
};

export const SHADOWS = {
  card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  hover: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};
