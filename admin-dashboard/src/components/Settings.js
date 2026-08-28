import React, { useState } from 'react';
import { Building2, ShieldCheck, Truck, SlidersHorizontal, Save, CheckCircle } from 'lucide-react';
import { COLORS, SHADOWS } from '../utils/colors';

const Toggle = ({ on, onChange }) => (
  <div onClick={onChange} style={{ width: '40px', height: '22px', backgroundColor: on ? COLORS.navy : '#D1D5DB', borderRadius: '11px', position: 'relative', cursor: 'pointer', transition: '0.3s', flexShrink: 0 }}>
    <div style={{ width: '18px', height: '18px', backgroundColor: COLORS.white, borderRadius: '50%', position: 'absolute', top: '2px', left: on ? '20px' : '2px', transition: '0.3s' }} />
  </div>
);

const Settings = () => {
  const [orgName, setOrgName] = useState('Bestiez HQ');
  const [supportEmail, setSupportEmail] = useState('hq@bestiez.com');
  const [enforce2FA, setEnforce2FA] = useState(true);
  const [ipAllowlist, setIpAllowlist] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('8h');
  const [speedafKey, setSpeedafKey] = useState('SPD-****-****-8842');
  const [minImages, setMinImages] = useState(3);
  const [minScore, setMinScore] = useState(70);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${COLORS.border}`, fontSize: '14px', boxSizing: 'border-box', outline: 'none' };
  const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textMain, fontSize: '13px' };
  const cardStyle = { backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: SHADOWS.card, padding: '24px', marginBottom: '20px' };
  const rowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${COLORS.borderLight}` };

  return (
    <div style={{ maxWidth: '760px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: COLORS.navy, margin: 0, fontSize: '24px', fontWeight: '700' }}>Platform Settings</h1>
        <p style={{ color: COLORS.textMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Organization, security, integrations, and quality rules.</p>
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Building2 size={18} color={COLORS.gold} />
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: COLORS.navy }}>Organization</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Organization Name</label>
            <input value={orgName} onChange={(e) => setOrgName(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Support Email</label>
            <input value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} style={inputStyle} />
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <ShieldCheck size={18} color={COLORS.gold} />
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: COLORS.navy }}>Security</h3>
        </div>
        <div style={rowStyle}>
          <div>
            <div style={{ fontWeight: '600', fontSize: '14px', color: COLORS.textMain }}>Enforce 2FA for all admins</div>
            <div style={{ color: COLORS.textMuted, fontSize: '12px', marginTop: '2px' }}>Authenticator app required at every sign-in</div>
          </div>
          <Toggle on={enforce2FA} onChange={() => setEnforce2FA(!enforce2FA)} />
        </div>
        <div style={rowStyle}>
          <div>
            <div style={{ fontWeight: '600', fontSize: '14px', color: COLORS.textMain }}>IP allowlist</div>
            <div style={{ color: COLORS.textMuted, fontSize: '12px', marginTop: '2px' }}>Restrict dashboard access to known office IPs</div>
          </div>
          <Toggle on={ipAllowlist} onChange={() => setIpAllowlist(!ipAllowlist)} />
        </div>
        <div style={{ paddingTop: '12px' }}>
          <label style={labelStyle}>Session timeout</label>
          <select value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)} style={{ ...inputStyle, width: '160px' }}>
            {['1h', '4h', '8h', '24h'].map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Truck size={18} color={COLORS.gold} />
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: COLORS.navy }}>Logistics Integration</h3>
        </div>
        <label style={labelStyle}>SPEEDAF API Key</label>
        <input value={speedafKey} onChange={(e) => setSpeedafKey(e.target.value)} style={{ ...inputStyle, fontFamily: 'monospace' }} />
      </div>

      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <SlidersHorizontal size={18} color={COLORS.gold} />
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: COLORS.navy }}>Quality Gate Rules</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Minimum product images</label>
            <input type="number" min="1" max="8" value={minImages} onChange={(e) => setMinImages(Number(e.target.value))} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Minimum quality score ({minScore})</label>
            <input type="range" min="40" max="95" value={minScore} onChange={(e) => setMinScore(Number(e.target.value))} style={{ width: '100%', accentColor: COLORS.coral }} />
          </div>
        </div>
      </div>

      <button onClick={handleSave} style={{ backgroundColor: saved ? COLORS.success : COLORS.coral, color: COLORS.white, border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'background-color 0.3s' }}>
        {saved ? <CheckCircle size={16} /> : <Save size={16} />} {saved ? 'Settings Saved' : 'Save Changes'}
      </button>
    </div>
  );
};

export default Settings;
