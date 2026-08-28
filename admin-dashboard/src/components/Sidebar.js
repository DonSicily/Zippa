import React from 'react';
import {
  Home, ShieldCheck, Users, Package, Bell, CreditCard, GraduationCap,
  UserCircle, FileText, Settings as SettingsIcon, LogOut,
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { COLORS } from '../utils/colors';

const SectionTitle = ({ title }) => (
  <div style={{ color: '#64748B', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '10px', marginTop: '24px', paddingLeft: '12px', letterSpacing: '0.5px' }}>{title}</div>
);

const Sidebar = ({ activeTab, onNavigate, onLogout }) => {
  const pendingApprovals = useAdminStore((s) => s.dashboardStats.pendingApprovals);

  const NavItem = ({ id, label, icon: Icon, badge }) => (
    <div
      onClick={() => onNavigate(id)}
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

  return (
    <div style={{ width: '260px', backgroundColor: COLORS.navy, padding: '24px 16px', display: 'flex', flexDirection: 'column', overflowY: 'auto', flexShrink: 0 }}>
      {/* Brand */}
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

      {/* Profile footer */}
      <div style={{ marginTop: 'auto', padding: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '36px', height: '36px', backgroundColor: COLORS.gold, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.navy, fontWeight: 'bold', flexShrink: 0 }}>DA</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: COLORS.white, fontSize: '13px', fontWeight: '600' }}>Daniel Adeniyi</div>
          <div style={{ color: '#94A3B8', fontSize: '11px' }}>Founder & CEO</div>
        </div>
        <LogOut size={18} color="#94A3B8" style={{ cursor: 'pointer' }} onClick={onLogout} />
      </div>
    </div>
  );
};

export default Sidebar;
