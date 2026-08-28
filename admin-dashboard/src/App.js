import React, { useState, useEffect } from 'react';
import {
  Home, ShieldCheck, Users, Package, Bell, CreditCard, GraduationCap,
  UserCircle, FileText, Settings as SettingsIcon, LogOut, Calendar, ChevronDown,
} from 'lucide-react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import QualityGate from './components/QualityGate';
import VendorManager from './components/VendorManager';
import OrderTracker from './components/OrderTracker';
import Financials from './components/Financials';
import CampusHub from './components/CampusHub';
import Ambassadors from './components/Ambassadors';
import Notifications from './components/Notifications';
import AuditLogs from './components/AuditLogs';
import Settings from './components/Settings';
import { useAdminStore } from './store/adminStore';
import { COLORS, SHADOWS } from './utils/colors';

const RANGES = [
  { id: '7d', label: 'Last 7 days' },
  { id: '30d', label: 'Last 30 days' },
  { id: '90d', label: 'Last 90 days' },
];

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [rangeOpen, setRangeOpen] = useState(false);

  const pendingApprovals = useAdminStore((s) => s.dashboardStats.pendingApprovals);
  const dateRange = useAdminStore((s) => s.dateRange);
  const setDateRange = useAdminStore((s) => s.setDateRange);
  const logout = useAdminStore((s) => s.logout);

  useEffect(() => {
    if (isAuthenticated) useAdminStore.getState().fetchDashboardStats();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Dashboard />;
      case 'quality': return <QualityGate />;
      case 'vendors': return <VendorManager />;
      case 'orders': return <OrderTracker />;
      case 'notifications': return <Notifications />;
      case 'financials': return <Financials />;
      case 'campus': return <CampusHub />;
      case 'ambassadors': return <Ambassadors />;
      case 'audit': return <AuditLogs />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  const SectionTitle = ({ title }) => (
    <div style={{ color: '#64748B', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '10px', marginTop: '24px', paddingLeft: '12px', letterSpacing: '0.5px' }}>{title}</div>
  );

  const NavItem = ({ id, label, icon: Icon, badge }) => (
    <div
      onClick={() => setActiveTab(id)}
      style={{
        padding: '10px 12px', cursor: 'pointer', borderRadius: '6px', marginBottom: '4px',
        backgroundColor: activeTab === id ? '#1E3A8A' : 'transparent',
        color: activeTab === id ? COLORS.white : '#94A3B8',
        fontWeight: activeTab === id ? '600' : '400',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: '14px', transition: 'all 0.2s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Icon size={18} /> {label}
      </div>
      {badge > 0 && (
        <span style={{ backgroundColor: COLORS.danger, color: COLORS.white, padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' }}>{badge}</span>
      )}
    </div>
  );

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const today = new Date().toLocaleDateString('en-NG', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const activeRange = RANGES.find((r) => r.id === dateRange) || RANGES[1];

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: COLORS.cream }}>
      {/* ============ Sidebar ============ */}
      <div style={{ width: '260px', backgroundColor: COLORS.navy, padding: '24px 16px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', paddingLeft: '8px' }}>
          <div style={{ width: '32px', height: '32px', border: `1px solid ${COLORS.gold}`, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.gold, fontWeight: 'bold' }}>B</div>
          <h2 style={{ color: COLORS.white, margin: 0, fontSize: '18px', fontWeight: '700' }}>Bestiez HQ</h2>
        </div>

        <SectionTitle title="Operations" />
        <NavItem id="overview" label="Overview" icon={Home} />
        <NavItem id="quality" label="Quality Gate" icon={ShieldCheck} badge={pendingApprovals} />
        <NavItem id="vendors" label="Vendors" icon={Users} />
        <NavItem id="orders" label="Orders & Logistics" icon={Package} />
        <NavItem id="notifications" label="Notifications" icon={Bell} />

        <SectionTitle title="Growth & Finance" />
        <NavItem id="financials" label="Financials" icon={CreditCard} />
        <NavItem id="campus" label="Campus Hub" icon={GraduationCap} />
        <NavItem id="ambassadors" label="Ambassadors" icon={UserCircle} />

        <SectionTitle title="System" />
        <NavItem id="audit" label="Audit Logs" icon={FileText} />
        <NavItem id="settings" label="Settings" icon={SettingsIcon} />

        <div style={{ marginTop: 'auto', padding: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', backgroundColor: COLORS.gold, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.navy, fontWeight: 'bold', flexShrink: 0 }}>DA</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: COLORS.white, fontSize: '13px', fontWeight: '600' }}>Daniel Adeniyi</div>
            <div style={{ color: '#94A3B8', fontSize: '11px' }}>Founder & CEO</div>
          </div>
          <LogOut size={18} color="#94A3B8" style={{ cursor: 'pointer' }} onClick={() => { logout(); setIsAuthenticated(false); }} />
        </div>
      </div>

      {/* ============ Main ============ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ color: COLORS.navy, margin: 0, fontSize: '28px', fontWeight: '700' }}>{greeting}, Daniel</h1>
            <p style={{ color: COLORS.textMuted, margin: '4px 0 0 0', fontSize: '14px' }}>{today} · Lagos</p>
          </div>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setRangeOpen(!rangeOpen)}
              style={{ backgroundColor: COLORS.navy, color: COLORS.white, border: 'none', padding: '10px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
            >
              <Calendar size={16} /> {activeRange.label} <ChevronDown size={14} />
            </button>
            {rangeOpen && (
              <div style={{ position: 'absolute', right: 0, top: '44px', backgroundColor: COLORS.white, borderRadius: '8px', boxShadow: SHADOWS.modal, border: `1px solid ${COLORS.border}`, overflow: 'hidden', zIndex: 50, minWidth: '150px' }}>
                {RANGES.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => { setDateRange(r.id); setRangeOpen(false); }}
                    style={{ padding: '10px 16px', fontSize: '13px', cursor: 'pointer', backgroundColor: r.id === dateRange ? COLORS.cream : COLORS.white, color: COLORS.textMain, fontWeight: r.id === dateRange ? '600' : '400' }}
                  >
                    {r.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ flex: 1, padding: '0 32px 32px 32px', overflowY: 'auto' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;
