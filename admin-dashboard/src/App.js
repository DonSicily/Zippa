import React, { useState } from 'react';
import { Home, ShieldCheck, Users, Package, Bell, CreditCard, GraduationCap, UserCircle, FileText, Settings, LogOut, Calendar } from 'lucide-react';
import Login from './components/Login';
import Dashboard from './components/Dashboard'; // New File
import QualityGate from './components/QualityGate';
import OrderTracker from './components/OrderTracker';
// ... import other components
import { COLORS } from './utils/colors';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAuthenticated) return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;

  const NavItem = ({ id, label, icon: Icon, badge }) => (
    <div onClick={() => setActiveTab(id)} style={{
      padding: '10px 12px', cursor: 'pointer', borderRadius: '6px', marginBottom: '4px',
      backgroundColor: activeTab === id ? '#1E3A8A' : 'transparent', // Blue highlight
      color: activeTab === id ? 'white' : '#94A3B8',
      fontWeight: activeTab === id ? '600' : '400',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', transition: 'all 0.2s'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Icon size={18} /> {label}
      </div>
      {badge && <span style={{ backgroundColor: COLORS.danger, color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' }}>{badge}</span>}
    </div>
  );

  const SectionTitle = ({ title }) => <div style={{ color: '#64748B', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '12px', marginTop: '24px', paddingLeft: '12px', letterSpacing: '0.5px' }}>{title}</div>;

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: COLORS.cream }}>
      {/* Sidebar */}
      <div style={{ width: '260px', backgroundColor: COLORS.navy, padding: '24px 16px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #1E293B' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', paddingLeft: '8px' }}>
          <div style={{ width: '32px', height: '32px', border: `1px solid ${COLORS.gold}`, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.gold, fontWeight: 'bold' }}>B</div>
          <h2 style={{ color: 'white', margin: 0, fontSize: '18px', fontWeight: '700' }}>Bestiez HQ</h2>
        </div>
        
        <SectionTitle title="Operations" />
        <NavItem id="overview" label="Overview" icon={Home} />
        <NavItem id="quality" label="Quality Gate" icon={ShieldCheck} badge="12" />
        <NavItem id="vendors" label="Vendors" icon={Users} />
        <NavItem id="orders" label="Orders & Logistics" icon={Package} />
        <NavItem id="notifications" label="Notifications" icon={Bell} />
        
        <SectionTitle title="Growth & Finance" />
        <NavItem id="financials" label="Financials" icon={CreditCard} />
        <NavItem id="campus" label="Campus Hub" icon={GraduationCap} />
        <NavItem id="ambassadors" label="Ambassadors" icon={UserCircle} />
        
        <SectionTitle title="System" />
        <NavItem id="audit" label="Audit Logs" icon={FileText} />
        <NavItem id="settings" label="Settings" icon={Settings} />

        <div style={{ marginTop: 'auto', padding: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', backgroundColor: COLORS.gold, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.navy, fontWeight: 'bold' }}>DA</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>Daniel Adeniyi</div>
            <div style={{ color: '#94A3B8', fontSize: '11px' }}>Founder & CEO</div>
          </div>
          <LogOut size={18} color="#94A3B8" style={{ cursor: 'pointer' }} onClick={() => setIsAuthenticated(false)} />
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <div style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: COLORS.cream }}>
          <div>
            <h1 style={{ color: COLORS.navy, margin: 0, fontSize: '28px', fontWeight: '700' }}>Good afternoon, Daniel</h1>
            <p style={{ color: COLORS.textMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Tuesday, August 18, 2026 · Lagos</p>
          </div>
          <button style={{ backgroundColor: COLORS.navy, color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            <Calendar size={16} /> Last 30 days
          </button>
        </div>
        
        <div style={{ flex: 1, padding: '0 32px 32px 32px', overflowY: 'auto' }}>
          {activeTab === 'overview' && <Dashboard />}
          {activeTab === 'quality' && <QualityGate />}
          {activeTab === 'orders' && <OrderTracker />}
          {/* ... other tabs ... */}
        </div>
      </div>
    </div>
  );
};
export default App;
