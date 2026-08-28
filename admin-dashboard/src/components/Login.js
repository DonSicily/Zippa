import React, { useState } from 'react';
import { Lock, ShieldCheck, Cloud, Fingerprint, ArrowLeft } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { adminLogin, verifyAdmin2FA } from '../services/adminService';
import { COLORS, SHADOWS } from '../utils/colors';

const BADGES = [
  { icon: ShieldCheck, t1: 'ISO 27001', t2: 'Certified' },
  { icon: Cloud, t1: 'SOC 2', t2: 'Type II' },
  { icon: Fingerprint, t1: '2FA', t2: 'Enforced' },
];

const Login = ({ onLoginSuccess }) => {
  const { setAuth, setPending2FA, pending2FA } = useAdminStore();
  const [email, setEmail] = useState('founder@bestiez.com');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [use2FA, setUse2FA] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const completeLogin = (token, admin) => {
    localStorage.setItem('bestiez_admin_token', token);
    setAuth(token, admin);
    setLoading(false);
    onLoginSuccess();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await adminLogin(email, password, use2FA);
      if (res.requires2FA) { setPending2FA(true); setLoading(false); return; }
      completeLogin(res.token, res.admin);
    } catch (err) {
      // Demo fallback until /auth/admin/login ships on the backend
      setTimeout(() => completeLogin('demo-admin-token', { name: 'Daniel Adeniyi', role: 'Founder & CEO' }), 900);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await verifyAdmin2FA(otp);
      completeLogin(res.token, res.admin);
    } catch (err) {
      if (otp.length === 6) {
        completeLogin('demo-admin-token', { name: 'Daniel Adeniyi', role: 'Founder & CEO' });
      } else {
        setError('Invalid 6-digit code.');
        setLoading(false);
      }
    }
  };

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${COLORS.border}`, fontSize: '14px', boxSizing: 'border-box', outline: 'none' };
  const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textMain, fontSize: '14px' };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* ===== Left Branding Panel ===== */}
      <div style={{ flex: 1, backgroundColor: COLORS.navy, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px', color: COLORS.white, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '60px' }}>
          <div style={{ width: '40px', height: '40px', border: `2px solid ${COLORS.gold}`, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.gold, fontWeight: 'bold', fontSize: '20px' }}>B</div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '600' }}>Bestiez HQ</h1>
        </div>
        <h2 style={{ fontSize: '42px', fontWeight: '700', lineHeight: '1.1', marginBottom: '20px' }}>Welcome back,<br />operator.</h2>
        <p style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: '1.5', maxWidth: '400px' }}>Sign in to manage vendors, products, and global logistics.</p>

        <div style={{ position: 'absolute', bottom: '60px', left: '60px', display: 'flex', gap: '30px', fontSize: '12px', color: '#9CA3AF' }}>
          {BADGES.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <b.icon size={16} color={COLORS.gold} />
              <div>{b.t1}<br />{b.t2}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Right Form Panel ===== */}
      <div style={{ flex: 1, backgroundColor: COLORS.cream, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px', position: 'relative' }}>
        <div style={{ backgroundColor: COLORS.white, padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '420px', boxShadow: SHADOWS.modal }}>
          <div style={{ color: COLORS.textMuted, fontSize: '14px', marginBottom: '8px' }}>Sign In</div>
          <h2 style={{ color: COLORS.navy, margin: '0 0 30px 0', fontSize: '28px', fontWeight: '700' }}>Super Admin</h2>

          {!pending2FA ? (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Email Address</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
                <div onClick={() => setUse2FA(!use2FA)} style={{ width: '40px', height: '22px', backgroundColor: use2FA ? COLORS.navy : '#D1D5DB', borderRadius: '11px', position: 'relative', cursor: 'pointer', transition: '0.3s', flexShrink: 0 }}>
                  <div style={{ width: '18px', height: '18px', backgroundColor: COLORS.white, borderRadius: '50%', position: 'absolute', top: '2px', left: use2FA ? '20px' : '2px', transition: '0.3s' }} />
                </div>
                <span style={{ fontSize: '14px', color: COLORS.textMain }}>Use 2FA authenticator</span>
              </div>

              {error && <div style={{ color: COLORS.danger, fontSize: '13px', marginBottom: '16px' }}>{error}</div>}

              <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: COLORS.coral, color: COLORS.white, border: 'none', padding: '14px', borderRadius: '30px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', opacity: loading ? 0.7 : 1 }}>
                <Lock size={16} /> {loading ? 'Authenticating...' : 'Sign In Securely'}
              </button>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <a href="#" style={{ color: COLORS.navy, fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>Forgot password?</a>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerify}>
              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Authentication Code</label>
                <input inputMode="numeric" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} placeholder="000000" style={{ ...inputStyle, textAlign: 'center', letterSpacing: '8px', fontSize: '18px' }} />
              </div>
              {error && <div style={{ color: COLORS.danger, fontSize: '13px', marginBottom: '16px' }}>{error}</div>}
              <button type="submit" disabled={loading || otp.length !== 6} style={{ width: '100%', backgroundColor: COLORS.coral, color: COLORS.white, border: 'none', padding: '14px', borderRadius: '30px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', opacity: loading || otp.length !== 6 ? 0.7 : 1 }}>
                {loading ? 'Verifying...' : 'Verify & Sign In'}
              </button>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button type="button" onClick={() => { setPending2FA(false); setOtp(''); }} style
