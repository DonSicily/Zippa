import React, { useState } from 'react';

const COLORS = { 
  primary: '#004E89', accent: '#FF6B35', bg: '#F4F6F8', white: '#FFFFFF', 
  textDark: '#1A202C', textLight: '#718096', border: '#E2E8F0' 
};

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1000);
  };

  const InputField = ({ label, type, value, onChange, placeholder }) => (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textDark, fontSize: '14px' }}>{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        placeholder={placeholder}
        style={{ 
          width: '100%', padding: '14px', borderRadius: '8px', border: `1px solid ${COLORS.border}`, 
          fontSize: '15px', boxSizing: 'border-box', outline: 'none'
        }} 
      />
    </div>
  );

  return (
    <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', 
      backgroundColor: COLORS.bg, fontFamily: 'Arial, sans-serif' 
    }}>
      <div style={{ 
        backgroundColor: COLORS.white, padding: '40px', borderRadius: '16px', 
        width: '100%', maxWidth: '420px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: COLORS.primary, margin: '0 0 8px 0', fontSize: '28px' }}>Bestiez</h1>
          <p style={{ color: COLORS.textLight, margin: 0, fontSize: '14px' }}>Vendor Portal Login</p>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField label="Email Address" type="email" value={email} onChange={setEmail} placeholder="factory@example.com" />
          <InputField label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '13px' }}>
            <label style={{ display: 'flex', alignItems: 'center', color: COLORS.textLight }}>
              <input type="checkbox" style={{ marginRight: '8px' }} /> Remember me
            </label>
            <a href="#" style={{ color: COLORS.primary, textDecoration: 'none', fontWeight: '600' }}>Forgot password?</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', backgroundColor: COLORS.primary, color: COLORS.white, border: 'none', 
              padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Logging in...' : 'Log In to Dashboard'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: COLORS.textLight }}>
          Don't have a vendor account? <a href="#" style={{ color: COLORS.accent, textDecoration: 'none', fontWeight: '600' }}>Apply to sell on Bestiez</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
