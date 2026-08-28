import React, { useState } from 'react';
import { useVendorStore } from '../store/vendorStore';
import { updateVendorProfile } from '../services/vendorService';
import { Card, Button, Input, SectionHeader } from './ui';
import { COLORS } from '../utils/colors';

const Profile = () => {
  const { vendor, updateProfile } = useVendorStore();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    companyName: vendor?.companyName ?? 'Guangzhou Tech Ltd.',
    contactPerson: vendor?.contactPerson ?? 'Wei Zhang',
    email: vendor?.email ?? 'wei@guangzhoutech.com',
    phone: vendor?.phone ?? '+86 138 0000 0000',
    address: vendor?.warehouseAddress ?? vendor?.address ?? 'Building 4, Futian District, Shenzhen',
    alipay: vendor?.payoutDetails?.alipay ?? vendor?.alipay ?? 'wei@alipay.com',
    wechatPay: vendor?.payoutDetails?.wechatPay ?? vendor?.wechatPay ?? 'wxid_123456789',
  });

  const handleChange = (field, value) => setProfile({ ...profile, [field]: value });

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateVendorProfile(profile);
      updateProfile(profile); // sync Zustand + persisted storage
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      window.alert(e.response?.data?.message || 'Failed to save profile.');
    } finally { setSaving(false); }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: COLORS.navy, margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>Company Profile</h1>
        <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: '14px' }}>Manage your business and payout details.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <Card style={{ padding: '32px' }}>
          <SectionHeader color={COLORS.coral}>Business Information</SectionHeader>
          <Input label="Company Name" value={profile.companyName} onChange={(e) => handleChange('companyName', e.target.value)} />
          <Input label="Contact Person" value={profile.contactPerson} onChange={(e) => handleChange('contactPerson', e.target.value)} />
          <Input label="Email Address" value={profile.email} onChange={(e) => handleChange('email', e.target.value)} />
          <Input label="Phone Number" value={profile.phone} onChange={(e) => handleChange('phone', e.target.value)} />
          <Input label="Warehouse Address" value={profile.address} onChange={(e) => handleChange('address', e.target.value)} />
        </Card>

        <Card style={{ padding: '32px' }}>
          <SectionHeader color={COLORS.gold}>Payout Details</SectionHeader>
          <Input label="Alipay Account" value={profile.alipay} onChange={(e) => handleChange('alipay', e.target.value)} />
          <Input label="WeChat Pay ID" value={profile.wechatPay} onChange={(e) => handleChange('wechatPay', e.target.value)} />

          <div style={{ marginTop: '8px', padding: '20px', backgroundColor: COLORS.cream, borderRadius: '12px', border: `1px solid ${COLORS.border}` }}>
            <h4 style={{ margin: '0 0 8px 0', color: COLORS.navy, fontSize: '14px', fontWeight: '600' }}>Payout Schedule</h4>
            <p style={{ margin: 0, color: COLORS.textSecondary, fontSize: '13px', lineHeight: '1.6' }}>
              Funds are automatically released to your accounts every Friday for all orders marked as "Delivered" 14 days prior.
            </p>
          </div>
        </Card>
      </div>

      <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px' }}>
        {saved && <span style={{ color: COLORS.success, fontSize: '13px', fontWeight: '600' }}>✓ Saved</span>}
        <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</Button>
      </div>
    </div>
  );
};

export default Profile;
