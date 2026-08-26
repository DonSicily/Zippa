import React, { useState } from 'react';

const COLORS = { primary: '#004E89', accent: '#FF6B35', white: '#FFFFFF', textDark: '#0F172A', textLight: '#64748B', success: '#10B981' };

const Settings = () => {
  const [settings, setSettings] = useState({
    commissionRate: '15',
    serviceFee: '2',
    baseShipping: '1500',
    maintenanceMode: false,
    allowVendorRegistration: true
  });

  const handleSave = () => {
    alert('Platform settings updated successfully!');
  };

  const ToggleSwitch = ({ label, value, onChange }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #F1F5F9' }}>
      <div>
        <div style={{ fontWeight: '600', color: COLORS.textDark, fontSize: '14px' }}>{label}</div>
      </div>
      <div 
        onClick={() => onChange(!value)}
        style={{ 
          width: '44px', height: '24px', borderRadius: '12px', padding: '2px', cursor: 'pointer',
          backgroundColor: value ? COLORS.success : '#CBD5E1', transition: 'background 0.3s',
          display: 'flex', alignItems: 'center'
        }}
      >
        <div style={{ 
          width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FFF', 
          transform: value ? 'translateX(20px)' : 'translateX(0)', transition: 'transform 0.3s',
          boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
        }} />
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: COLORS.textDark, margin: 0, fontSize: '24px' }}>Platform Settings ⚙️</h1>
        <p style={{ color: COLORS.textLight, margin: '4px 0 0 0', fontSize: '14px' }}>Configure global fees, commissions, and system states.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Financial Settings */}
        <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 20px 0', color: COLORS.textDark, fontSize: '16px' }}>Financial Configuration</h3>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textDark, fontSize: '13px' }}>Vendor Commission Rate (%)</label>
            <input 
              type="number" value={settings.commissionRate} onChange={(e) => setSettings({...settings, commissionRate: e.target.value})}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', boxSizing: 'border-box', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textDark, fontSize: '13px' }}>Customer Service Fee (%)</label>
            <input 
              type="number" value={settings.serviceFee} onChange={(e) => setSettings({...settings, serviceFee: e.target.value})}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', boxSizing: 'border-box', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textDark, fontSize: '13px' }}>Base Shipping Fee (₦)</label>
            <input 
              type="number" value={settings.baseShipping} onChange={(e) => setSettings({...settings, baseShipping: e.target.value})}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', boxSizing: 'border-box', fontSize: '14px' }}
            />
          </div>
        </div>

        {/* System Toggles */}
        <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 20px 0', color: COLORS.textDark, fontSize: '16px' }}>System States</h3>
          
          <ToggleSwitch 
            label="Maintenance Mode (Disable Student App)" 
            value={settings.maintenanceMode} 
            onChange={(val) => setSettings({...settings, maintenanceMode: val})} 
          />
          <ToggleSwitch 
            label="Allow New Vendor Registrations" 
            value={settings.allowVendorRegistration} 
            onChange={(val) => setSettings({...settings, allowVendorRegistration: val})} 
          />
        </div>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={handleSave}
          style={{ 
            backgroundColor: COLORS.primary, color: COLORS.white, border: 'none', 
            padding: '12px 32px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', cursor: 'pointer' 
          }}
        >
          Save Global Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
