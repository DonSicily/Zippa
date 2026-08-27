import React, { useState } from 'react';
import { Lock, ShieldCheck, Cloud, Fingerprint } from 'lucide-react';
import { COLORS } from '../utils/colors';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('founder@bestiez.com');
  const [password, setPassword] = useState('');
  const [use2FA, setUse2FA] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLoginSuccess(); }, 1000);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Left Panel */}
      <div style={{ flex: 1, backgroundColor: COLORS.navy, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px', color: COLORS.white, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '60px' }}>
          <div style={{ width: '40px', height: '40px', border: `2px solid ${COLORS.gold}`, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.gold, fontWeight: 'bold', fontSize: '20px' }}>B</div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '600' }}>Bestiez HQ</h1>
        </div>
        <h2 style={{ fontSize: '42px', fontWeight: '700', lineHeight: '1.1', marginBottom: '20px' }}>Welcome back,<br/>operator.</h2>
        <p style={{ color: '#9CA3AF', fontSize: '16px', lineHeight: '1.5', maxWidth: '400px' }}>Sign in to manage vendors, products, and global logistics.</p>
        
        {/* Trust Badges */}
        <div style={{ position: 'absolute', bottom: '60px', display: 'flex', gap: '30px', fontSize: '12px', color: '#9CA3AF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} /> ISO 27001<br/>Certified</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Cloud size={16} /> SOC 2<br/>Type II</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Fingerprint size={16} /> 2FA<br/>Enforced</div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, backgroundColor: COLORS.cream, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
        <div style={{ backgroundColor: COLORS.white, padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '420px', boxShadow: SHADOWS.modal }}>
          <div style={{ color: COLORS.textMuted, fontSize: '14px', marginBottom: '8px' }}>Sign In</div>
          <h2 style={{ color: COLORS.navy, margin: '0 0 30px 0', fontSize: '28px', fontWeight: '700' }}>Super Admin</h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textMain, fontSize: '14px' }}>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${COLORS.border}`, fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textMain, fontSize: '14px' }}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${COLORS.border}`, fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
              <div onClick={() => setUse2FA(!use2FA)} style={{ width: '40px', height: '22px', backgroundColor: use2FA ? COLORS.navy : '#D1D5DB', borderRadius: '11px', position: 'relative', cursor: 'pointer', transition: '0.3s' }}>
                <div style={{ width: '18px', height: '18px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: use2FA ? '20px' : '2px', transition: '0.3s' }} />
              </div>
              <span style={{ fontSize: '14px', color: COLORS.textMain }}>Use 2FA authenticator</span>
            </div>

            <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: COLORS.coral, color: 'white', border: 'none', padding: '14px', borderRadius: '30px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <Lock size={16} /> {loading ? 'Authenticating...' : 'Sign In Securely'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '20px' }}><a href="#" style={{ color: COLORS.navy, fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>Forgot password?</a></div>
          </form>
        </div>
        <div style={{ position: 'absolute', bottom: '30px', color: COLORS.textMuted, fontSize: '13px' }}>© 2026 Bestiez HQ · Internal Use Only</div>
      </div>
    </div>
  );
};
export default Login;
