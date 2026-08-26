import React, { useState } from 'react';
import Login from './components/Login';
import QualityGate from './components/QualityGate';
import VendorManager from './components/VendorManager';
import OrderTracker from './components/OrderTracker';
import Financials from './components/Financials';
import CampusHub from './components/CampusHub';
import Notifications from './components/Notifications';
import AuditLogs from './components/AuditLogs';
import Settings from './components/Settings';

// --- ADMIN BRAND COLORS ---
const COLORS = {
  primary: '#004E89',   // Navy Blue (Authoritative)
  accent: '#FF6B35',    // Orange (Action)
  bg: '#F8FAFC',        // Very light slate
  sidebar: '#0F172A',   // Dark slate for sidebar
  white: '#FFFFFF',
  textDark: '#0F172A',
  textLight: '#64748B',
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('quality');

  // If not logged in, show Admin Login
  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'quality': return <QualityGate />;
      case 'vendors': return <VendorManager />;
      case 'orders': return <OrderTracker />;
      case 'financials': return <Financials />;
      case 'campuses': return <CampusHub />;
      case 'notifications': return <Notifications />;
      case 'audit': return <AuditLogs />;
      case 'settings': return <Settings />;
      default: return <QualityGate />;
    }
  };

  const NavItem = ({ id, label, icon, badge }) => (
    <div 
      onClick={() => setActiveTab(id)}
      style={{
        padding: '12px 16px',
        cursor: 'pointer',
        borderRadius: '6px',
        marginBottom: '4px',
        backgroundColor: activeTab === id ? 'rgba(255,255,255,0.1)' : 'transparent',
        color: activeTab === id ? COLORS.white : '#94A3B8',
        fontWeight: activeTab === id ? '600' : '400',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '14px',
        transition: 'all 0.2s'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '18px' }}>{icon}</span> {label}
      </div>
      {badge && <span style={{ backgroundColor: COLORS.accent, color: COLORS.white, padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' }}>{badge}</span>}
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: COLORS.bg }}>
      {/* Sidebar */}
      <div style={{ width: '260px', backgroundColor: COLORS.sidebar, padding: '24px 16px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #1E293B' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', paddingLeft: '8px' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: COLORS.accent, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>B</div>
          <h2 style={{ color: COLORS.white, margin: 0, fontSize: '18px', fontWeight: '700' }}>Bestiez Admin</h2>
        </div>
        
        <div style={{ color: '#64748B', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '12px', paddingLeft: '12px', letterSpacing: '0.5px' }}>Operations</div>
        <NavItem id="quality" label="Quality Gate" icon="️" badge="12" />
        <NavItem id="vendors" label="Vendor Management" icon="🏭" />
        <NavItem id="orders" label="Global Logistics" icon="🌍" />
        <NavItem id="notifications" label="Push Notifications" icon="📢" />
        
        <div style={{ color: '#64748B', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '12px', marginTop: '24px', paddingLeft: '12px', letterSpacing: '0.5px' }}>Growth & Finance</div>
        <NavItem id="financials" label="Financials" icon="" />
        <NavItem id="campuses" label="Campus & Ambassadors" icon="🎓" />
        
        <div style={{ color: '#64748B', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '12px', marginTop: '24px', paddingLeft: '12px', letterSpacing: '0.5px' }}>System</div>
        <NavItem id="audit" label="Audit Logs" icon="🔒" />
        <NavItem id="settings" label="Platform Settings" icon="⚙️" />
        
        <div style={{ marginTop: 'auto', padding: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: COLORS.white, fontSize: '13px', fontWeight: '600' }}>Super Admin</div>
            <div style={{ color: '#94A3B8', fontSize: '12px', marginTop: '4px' }}>founder@bestiez.com</div>
          </div>
          <div 
            onClick={() => setIsAuthenticated(false)} 
            style={{ color: '#EF4444', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}
          >
            Logout
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
