import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
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
import { COLORS } from './utils/colors';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const logout = useAdminStore((s) => s.logout);

  useEffect(() => {
    if (isAuthenticated) useAdminStore.getState().fetchDashboardStats();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

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

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: COLORS.cream }}>
      <Sidebar activeTab={activeTab} onNavigate={setActiveTab} onLogout={handleLogout} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar />
        <div style={{ flex: 1, padding: '0 32px 32px 32px', overflowY: 'auto' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;
