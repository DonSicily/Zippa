import React, { useState } from 'react';

const COLORS = { primary: '#004E89', accent: '#FF6B35', white: '#FFFFFF', textDark: '#1A202C', textLight: '#718096', bg: '#F4F6F8', border: '#E2E8F0' };

const Profile = () => {
  const [profile, setProfile] = useState({
    companyName: 'Guangzhou Tech Ltd.',
    contactPerson: 'Wei Zhang',
    email: 'wei@guangzhoutech.com',
    phone: '+86 138 0000 0000',
    address: 'Building 4, Futian District, Shenzhen',
    alipay: 'wei@alipay.com',
    wechatPay: 'wxid_123456789'
  });

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const InputGroup = ({ label, field }) => (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: COLORS.textDark, fontSize: '14px' }}>{label}</label>
      <input 
        type="text" 
        value={profile[field]} 
        onChange={(e) => handleChange(field, e.target.value)}
        style={{ 
          width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${COLORS.border}`, 
          fontSize: '14px', boxSizing: 'border-box', outline: 'none'
        }} 
      />
    </div>
  );

  return (
    <div>
      <h1 style={{ color: COLORS.textDark, marginBottom: '24px' }}>Company Profile </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Company Information */}
        <div style={{ backgroundColor: COLORS.white, padding: '30px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: COLORS.textDark, marginTop: 0, marginBottom: '20px', borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '10px' }}>Business Information</h3>
          <InputGroup label="Company Name" field="companyName" />
          <InputGroup label="Contact Person" field="contactPerson" />
          <InputGroup label="Email Address" field="email" />
          <InputGroup label="Phone Number" field="phone" />
          <InputGroup label="Warehouse Address" field="address" />
        </div>

        {/* Payout Information */}
        <div style={{ backgroundColor: COLORS.white, padding: '30px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: COLORS.textDark, marginTop: 0, marginBottom: '20px', borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '10px' }}>Payout Details</h3>
          <InputGroup label="Alipay Account" field="alipay" />
          <InputGroup label="WeChat Pay ID" field="wechatPay" />
          
          <div style={{ marginTop: '30px', padding: '16px', backgroundColor: '#EBF8FF', borderRadius: '8px', border: '1px solid #BEE3F8' }}>
            <h4 style={{ margin: '0 0 8px 0', color: COLORS.primary, fontSize: '14px' }}>Payout Schedule</h4>
            <p style={{ margin: 0, color: COLORS.textLight, fontSize: '13px', lineHeight: '1.5' }}>
              Funds are automatically released to your accounts every Friday for all orders marked as "Delivered" 14 days prior.
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{ 
          backgroundColor: COLORS.accent, color: COLORS.white, border: 'none', 
          padding: '12px 30px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(255, 107, 53, 0.2)'
        }}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
