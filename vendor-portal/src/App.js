import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import OrderManager from './components/OrderManager';
import Payouts from './components/Payouts';
import Analytics from './components/Analytics';
import Profile from './components/Profile';
import Support from './components/Support';
import { useVendorStore } from './store/vendorStore';
import { useVendorAuth } from './hooks/useVendorAuth';
import { COLORS } from './utils/colors';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const { isAuthenticated, vendor, isSidebarCollapsed, toggleSidebar } = useVendorStore();
  const { handleLogout } = useVendorAuth();

  if (!isAuthenticated) return <Login />;

  const companyName = vendor?.companyName || 'Vendor Partner';
  const initial = companyName.charAt(0).toUpperCase();

  const renderContent = () => {
    if (showProductForm) return <ProductForm onClose={() => setShowProductForm(false)} />;
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'products': return <ProductList onAddNew={() => setShowProductForm(true)} />;
      case 'orders': return <OrderManager />;
      case 'payouts': return <Payouts />;
      case 'analytics': return <Analytics />;
      case 'profile': return <Profile />;
      case 'support': return <Support />;
      default: return <Dashboard />;
    }
  };

  const SectionLabel = ({ children }) => isSidebarCollapsed
    ? <div style={{ height: 12 }} />
    : <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', margin: '0 0 12px 12px', letterSpacing: '1px' }}>{children}</div>;

  const NavItem = ({ id, label, icon }) => {
    const isActive = activeTab === id;
    return (
      <div
        title={label}
        onClick={() => { setActiveTab(id); setShowProductForm(false); }}
        style={{
          padding: '12px 14px', cursor: 'pointer', borderRadius: '10px', marginBottom: '4px',
          backgroundColor: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
          color: isActive ? COLORS.white : 'rgba(255,255,255,0.6)',
          fontWeight: isActive ? '600' : '400',
          display: 'flex', alignItems: 'center', gap: '14px', fontSize: '14px',
          borderLeft: isActive ? `3px solid ${COLORS.gold}` : '3px solid transparent',
          justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
          whiteSpace: 'nowrap', overflow: 'hidden', transition: 'all 0.2s ease',
        }}
      >
        <span style={{ fontSize: '18px', width: '20px', textAlign: 'center', flexShrink: 0 }}>{icon}</span>
        {!isSidebarCollapsed && label}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", backgroundColor: COLORS.cream }}>
      {/* Sidebar */}
      <div style={{
        width: isSidebarCollapsed ? 82 : 260, transition: 'width 0.2s ease',
        backgroundColor: COLORS.navy, padding: '24px 14px',
        display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px', paddingLeft: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.gold})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '16px', flexShrink: 0 }}>
            {initial}
          </div>
          {!isSidebarCollapsed && <h2 style={{ color: COLORS.white, margin: 0, fontSize: '18px', fontWeight: '700', letterSpacing: '-0.5px', whiteSpace: 'nowrap' }}>Bestiez Vendor</h2>}
        </div>

        <SectionLabel>Main Menu</SectionLabel>
        <NavItem id="dashboard" label="Dashboard" icon="📊" />
        <NavItem id="analytics" label="Analytics" icon="📈" />
        <NavItem id="products" label="My Products" icon="📦" />
        <NavItem id="orders" label="Orders" icon="🧾" />
        <NavItem id="payouts" label="Payouts" icon="💰" />

        <div style={{ height: '20px' }} />
        <SectionLabel>Account</SectionLabel>
        <NavItem id="profile" label="Company Profile" icon="🏢" />
        <NavItem id="support" label="Help & Support" icon="🎧" />

        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '10px', justifyContent: isSidebarCollapsed ? 'center' : 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: COLORS.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.navy, fontWeight: '700', fontSize: '14px', flexShrink: 0 }}>
              {initial}
            </div>
            {!isSidebarCollapsed && (
              <div style={{ overflow: 'hidden' }}>
                <div style={{ color: COLORS.white, fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap' }}>{companyName}</div>
                <div onClick={handleLogout} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', cursor: 'pointer', marginTop: '2px' }}>Log Out</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ height: '72px', backgroundColor: COLORS.white, borderBottom: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={toggleSidebar} style={{ width: '36px', height: '36px', borderRadius: '10px', border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.white, cursor: 'pointer', fontSize: '14px', color: COLORS.textSecondary }}>
              {isSidebarCollapsed ? '»' : '«'}
            </button>
            <div style={{ fontSize: '14px', color: COLORS.textSecondary }}>
              Welcome back, <span style={{ color: COLORS.textPrimary, fontWeight: 600 }}>{vendor?.contactPerson?.split(' ')[0] || 'Partner'}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '8px 16px', backgroundColor: COLORS.cream, borderRadius: '20px', fontSize: '13px', color: COLORS.textPrimary, cursor: 'pointer' }}>🔔 Notifications</div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: COLORS.cream, border: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.navy, fontWeight: '700' }}>{initial}</div>
          </div>
        </div>

        <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;
