import React, { useState } from 'react';
import { COLORS } from '../utils/colors';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLoginSuccess(); }, 1000);
  };

  const InputField = ({ label, type, value, onChange, placeholder }) => {
    const [focused, setFocused] = useState(false);
    return (
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: COLORS.textSecondary, fontSize: '13px' }}>{label}</label>
        <input
          type={type} value={value} placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            width: '100%', padding: '14px 16px', borderRadius: '10px',
            border: `1px solid ${focused ? COLORS.gold : COLORS.border}`,
            fontSize: '15px', boxSizing: 'border-box', outline: 'none',
            transition: 'border-color 0.2s ease', color: COLORS.textPrimary,
          }}
        />
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: COLORS.cream, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", padding: '24px', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: COLORS.white, padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '420px', boxShadow: COLORS.shadowHover, borderTop: `4px solid ${COLORS.gold}`, boxSizing: 'border-box' }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', backgroundColor: COLORS.navy, border: `2px solid ${COLORS.gold}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <span style={{ color: COLORS.gold, fontSize: '22px', fontWeight: '800' }}>B</span>
          </div>
          <h1 style={{ color: COLORS.navy, margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700', letterSpacing: '-0.5px' }}>Bestiez Vendor</h1>
          <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: '14px' }}>Partner Portal Login</p>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField label="Email Address" type="email" value={email} onChange={setEmail} placeholder="factory@example.com" />
          <InputField label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '13px' }}>
            <label style={{ display: 'flex', alignItems: 'center', color: COLORS.textSecondary, cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginRight: '8px', accentColor: COLORS.coral }} /> Remember me
            </label>
            <a href="#" style={{ color: COLORS.coral, textDecoration: 'none', fontWeight: '600' }}>Forgot password?</a>
          </div>

          <button
            type="submit" disabled={loading}
            style={{
              width: '100%', backgroundColor: COLORS.coral, color: COLORS.white, border: 'none',
              padding: '14px', borderRadius: '12px', fontWeight: '600', fontSize: '15px',
              cursor: 'pointer', opacity: loading ? 0.7 : 1,
              boxShadow: '0 4px 12px rgba(241, 96, 46, 0.25)',
            }}
          >
            {loading ? 'Logging in...' : 'Log In to Dashboard'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: COLORS.textSecondary }}>
          Don't have a vendor account? <a href="#" style={{ color: COLORS.coral, textDecoration: 'none', fontWeight: '600' }}>Apply to sell on Bestiez</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
