import React, { useState } from 'react';

const COLORS = { 
  primary: '#004E89', accent: '#FF6B35', bg: '#F8FAFC', white: '#FFFFFF', 
  textDark: '#0F172A', textLight: '#64748B', border: '#E2E8F0', sidebar: '#0F172A' 
};

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate secure admin authentication
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Left Branding Panel */}
      <div style={{ 
        flex: 1, backgroundColor: COLORS.sidebar, display: 'flex', flexDirection: 'column', 
        justifyContent: 'center', padding: '60px', color: COLORS.white 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: COLORS.accent, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>B</div>
          <h1 style={{ margin: 0, fontSize: '24px' }}>Bestiez Admin</h1>
        </div>
        <h2 style={{ fontSize: '36px', fontWeight: '700', lineHeight: '1.2', marginBottom: '20px' }}>Super Admin Control Center.</h2>
        <p style={{ color: '#94A3B8', fontSize: '16px', lineHeight: '1.6', maxWidth: '400px' }}>
          Manage vendors, approve products, oversee global logistics, and control the entire Bestiez ecosystem.
        </p>
      </div>

      {/* Right Login Form */}
      <div style={{ 
        flex: 1, backgroundColor: COLORS.bg, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' 
      }}>
        <div style={{ backgroundColor: COLORS.white, padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ color: COLORS.textDark, margin: '0 0 8px 0', fontSize: '24px' }}>Welcome back</h2>
          <p style={{ color: COLORS.textLight, margin: '0 0 30px 0', fontSize: '14px' }}>Please enter your credentials to access the dashboard.</p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textDark, fontSize: '13px' }}>Email Address</label>
              <input 
                type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                placeholder="founder@bestiez.com" required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: `1px solid ${COLORS.border}`, fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} 
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textDark, fontSize: '13px' }}>Password</label>
              <input 
                type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••••••" required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: `1px solid ${COLORS.border}`, fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} 
              />
            </div>

            <button 
              type="submit" disabled={loading}
              style={{ 
                width: '100%', backgroundColor: COLORS.primary, color: COLORS.white, border: 'none', 
                padding: '14px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', cursor: 'pointer',
                opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s'
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In to Admin'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
