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
import { COLORS } from './utils/colors';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume logged in for preview
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    if (showProductForm) {
      return <ProductForm onClose={() => setShowProductForm(false)} />;
    }
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

  const NavItem = ({ id, label, icon }) => {
    const isActive = activeTab === id;
    return (
      <div
        onClick={() => { setActiveTab(id); setShowProductForm(false); }}
        style={{
          padding: '12px 16px',
          cursor: 'pointer',
          borderRadius: '10px',
          marginBottom: '4px',
          backgroundColor: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
          color: isActive ? COLORS.white : 'rgba(255,255,255,0.6)',
          fontWeight: isActive ? '600' : '400',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          fontSize: '14px',
          transition: 'all 0.2s ease',
          position: 'relative',
          borderLeft: isActive ? `3px solid ${COLORS.gold}` : '3px solid transparent',
          marginLeft: isActive ? '-16px' : '0',
          paddingLeft: isActive ? '29px' : '16px',
        }}
      >
        <span style={{ fontSize: '18px', width: '20px', textAlign: 'center' }}>{icon}</span>
        {label}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", backgroundColor: COLORS.cream }}>
      {/* Sidebar */}
      <div style={{ 
        width: '260px', 
        backgroundColor: COLORS.navy, 
        padding: '24px 16px', 
        display: 'flex', 
        flexDirection: 'column', 
        boxShadow: '4px 0 20px rgba(0,0,0,0.05)',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', paddingLeft: '12px' }}>
          <div style={{ 
            width: '36px', height: '36px', borderRadius: '10px', 
            background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.gold})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            color: 'white', fontWeight: '800', fontSize: '16px'
          }}>
            Z
          </div>
          <h2 style={{ color: COLORS.white, margin: 0, fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px' }}>Zippa Vendor</h2>
        </div>

        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '12px', paddingLeft: '12px', letterSpacing: '1px' }}>Main Menu</div>
        <NavItem id="dashboard" label="Dashboard" icon="📊" />
        <NavItem id="analytics" label="Analytics" icon="📈" />
        <NavItem id="products" label="My Products" icon="📦" />
        <NavItem id="orders" label="Orders" icon="🧾" />
        <NavItem id="payouts" label="Payouts" icon="💰" />
        
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '12px', marginTop: '24px', paddingLeft: '12px', letterSpacing: '1px' }}>Account</div>
        <NavItem id="profile" label="Company Profile" icon="🏢" />
        <NavItem id="support" label="Help & Support" icon="🎧" />
        
        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '12px' }}>
            <div style={{ 
              width: '36px', height: '36px', borderRadius: '50%', 
              backgroundColor: COLORS.gold, 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              color: COLORS.navy, fontWeight: 'bold', fontSize: '14px'
            }}>W</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: COLORS.white, fontSize: '13px', fontWeight: '600' }}>Guangzhou Tech</div>
              <div 
                onClick={() => setIsAuthenticated(false)} 
                style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', cursor: 'pointer', marginTop: '2px' }}
              >
                Log Out
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Header Bar */}
        <div style={{ 
          height: '72px', 
          backgroundColor: COLORS.white, 
          borderBottom: `1px solid ${COLORS.border}`,
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '0 40px',
          flexShrink: 0
        }}>
          <div style={{ fontSize: '14px', color: COLORS.textSecondary }}>
            Welcome back, <span style={{ color: COLORS.textPrimary, fontWeight: 600 }}>Wei</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ 
              padding: '8px 16px', 
              backgroundColor: COLORS.cream, 
              borderRadius: '20px', 
              fontSize: '13px', 
              color: COLORS.textPrimary,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}>
              <span>🔔</span> Notifications
            </div>
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '50%', 
              backgroundColor: COLORS.cream, 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${COLORS.border}`
            }}>
              <span style={{ fontSize: '18px' }}>👤</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;
