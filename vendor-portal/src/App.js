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

// --- BRAND COLORS ---
const COLORS = {
  primary: '#004E89',   // Navy Blue
  accent: '#FF6B35',    // Orange
  bg: '#F4F6F8',        // Light Gray
  white: '#FFFFFF',
  textDark: '#1A202C',
  textLight: '#718096',
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);

  // If not logged in, show Login Screen
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

  const NavItem = ({ id, label, icon }) => (
    <div 
      onClick={() => { setActiveTab(id); setShowProductForm(false); }}
      style={{
        padding: '12px 20px',
        cursor: 'pointer',
        borderRadius: '8px',
        marginBottom: '4px',
        backgroundColor: activeTab === id ? 'rgba(255,255,255,0.1)' : 'transparent',
        color: COLORS.white,
        fontWeight: activeTab === id ? 'bold' : 'normal',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '14px',
        transition: 'background 0.2s'
      }}
    >
      <span style={{ fontSize: '18px' }}>{icon}</span> {label}
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif', backgroundColor: COLORS.bg }}>
      {/* Sidebar */}
      <div style={{ width: '260px', backgroundColor: COLORS.primary, padding: '24px 16px', display: 'flex', flexDirection: 'column', boxShadow: '2px 0 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: COLORS.white, marginBottom: '40px', paddingLeft: '12px', fontSize: '22px', fontWeight: '800' }}>Bestiez Vendor</h2>
        
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '12px', paddingLeft: '12px', letterSpacing: '1px' }}>Main Menu</div>
        <NavItem id="dashboard" label="Dashboard" icon="📊" />
        <NavItem id="analytics" label="Analytics" icon="📈" />
        <NavItem id="products" label="My Products" icon="📦" />
        <NavItem id="orders" label="Orders" icon="" />
        <NavItem id="payouts" label="Payouts" icon="" />
        
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '12px', marginTop: '24px', paddingLeft: '12px', letterSpacing: '1px' }}>Account</div>
        <NavItem id="profile" label="Company Profile" icon="🏭" />
        <NavItem id="support" label="Help & Support" icon="🎧" />
        
        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: COLORS.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>W</div>
            <div>
              <div style={{ color: COLORS.white, fontSize: '13px', fontWeight: '600' }}>Guangzhou Tech</div>
              <div 
                onClick={() => setIsAuthenticated(false)} 
                style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', cursor: 'pointer', marginTop: '2px' }}
              >
                Log Out
              </div>
            </div>
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
