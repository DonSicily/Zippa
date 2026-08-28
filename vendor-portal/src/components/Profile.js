import React, { useState } from 'react';
import { COLORS } from '../utils/colors';

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
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: COLORS.textSecondary, fontSize: '13px' }}>{label}</label>
      <input 
        type="text" 
        value={profile[field]} 
        onChange={(e) => handleChange(field, e.target.value)}
        style={{ 
          width: '100%', 
          padding: '12px 16px', 
          borderRadius: '10px', 
          border: `1px solid ${COLORS.border}`, 
          fontSize: '14px', 
          boxSizing: 'border-box', 
          outline: 'none',
          transition: 'border-color 0.2s ease',
          backgroundColor: COLORS.card || COLORS.white
        }} 
      />
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: COLORS.navy, margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>Company Profile</h1>
        <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: '14px' }}>Manage your business and payout details.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ 
          backgroundColor: COLORS.white, 
          padding: '32px', 
          borderRadius: '16px', 
          boxShadow: COLORS.shadow,
          border: `1px solid ${COLORS.border}`
        }}>
          <h3 style={{ color: COLORS.navy, marginTop: 0, marginBottom: '24px', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '4px', height: '20px', backgroundColor: COLORS.coral, borderRadius: '2px' }}></span>
            Business Information
          </h3>
          <InputGroup label="Company Name" field="companyName" />
          <InputGroup label="Contact Person" field="contactPerson" />
          <InputGroup label="Email Address" field="email" />
          <InputGroup label="Phone Number" field="phone" />
          <InputGroup label="Warehouse Address" field="address" />
        </div>

        <div style={{ 
          backgroundColor: COLORS.white, 
          padding: '32px', 
          borderRadius: '16px', 
          boxShadow: COLORS.shadow,
          border: `1px solid ${COLORS.border}`
        }}>
          <h3 style={{ color: COLORS.navy, marginTop: 0, marginBottom: '24px', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '4px', height: '20px', backgroundColor: COLORS.gold, borderRadius: '2px' }}></span>
            Payout Details
          </h3>
          <InputGroup label="Alipay Account" field="alipay" />
          <InputGroup label="WeChat Pay ID" field="wechatPay" />
          
          <div style={{ 
            marginTop: '24px', 
            padding: '20px', 
            backgroundColor: COLORS.cream, 
            borderRadius: '12px', 
            border: `1px solid ${COLORS.border}` 
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: COLORS.navy, fontSize: '14px', fontWeight: '600' }}>Payout Schedule</h4>
            <p style={{ margin: 0, color: COLORS.textSecondary, fontSize: '13px', lineHeight: '1.6' }}>
              Funds are automatically released to your accounts every Friday for all orders marked as "Delivered" 14 days prior.
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{ 
          backgroundColor: COLORS.coral, 
          color: COLORS.white, 
          border: 'none', 
          padding: '14px 32px', 
          borderRadius: '12px', 
          fontWeight: '600', 
          cursor: 'pointer',
          fontSize: '15px',
          boxShadow: '0 4px 12px rgba(241, 96, 46, 0.2)'
        }}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
