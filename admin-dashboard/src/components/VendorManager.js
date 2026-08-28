import React, { useEffect, useState } from 'react';
import { Eye, CheckCircle, Ban, MapPin, Factory } from 'lucide-react';
import { getAllVendors, approveVendor } from '../services/adminService';
import { COLORS, SHADOWS } from '../utils/colors';

const SEED_VENDORS = [
  { _id: 'V-01', name: 'vendorX', contact: 'vendorx@163.com', loc: 'Guangzhou, CN', products: 0, gmv: '$0', status: 'Pending', joined: 'Aug 27, 2026' },
  { _id: 'V-02', name: 'Shenzhen Tech Co.', contact: 'sales@sztech.cn', loc: 'Shenzhen, CN', products: 14, gmv: '$86,200', status: 'Active', joined: 'Jan 12, 2026' },
  { _id: 'V-03', name: 'Guangzhou Fashion', contact: 'hello@gzfashion.cn', loc: 'Guangzhou, CN', products: 9, gmv: '$54,750', status: 'Active', joined: 'Feb 03, 2026' },
  { _id: 'V-04', name: 'Yiwu Home Goods', contact: 'ops@yiwuhome.cn', loc: 'Yiwu, CN', products: 11, gmv: '$38,900', status: 'Active', joined: 'Mar 18, 2026' },
  { _id: 'V-05', name: 'Dongguan Bags Ltd', contact: 'info@dgbags.cn', loc: 'Dongguan, CN', products: 6, gmv: '$21,400', status: 'Suspended', joined: 'Apr 22, 2026' },
];

const statusStyle = (s) => ({
  Active: { bg: COLORS.successBg, color: COLORS.success },
  Pending: { bg: COLORS.warningBg, color: '#92400E' },
  Suspended: { bg: COLORS.dangerBg, color: COLORS.danger },
}[s] || { bg: COLORS.borderLight, color: COLORS.textMuted });

const VendorManager = () => {
  const [vendors, setVendors] = useState(SEED_VENDORS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllVendors()
      .then((res) => {
        const data = Array.isArray(res) ? res : res?.vendors;
        if (Array.isArray(data) && data.length) setVendors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false)); // Seed remains as fallback
  }, []);

  const handleApprove = async (id) => {
    try { await approveVendor(id); } catch (e) { /* demo mode */ }
    setVendors((v) => v.map((x) => (x._id === id ? { ...x, status: 'Active' } : x)));
  };

  const handleSuspend = (id) => {
    setVendors((v) => v.map((x) => (x._id === id ? { ...x, status: x.status === 'Suspended' ? 'Active' : 'Suspended' } : x)));
  };

  const pills = [
    { label: 'Total Vendors', value: vendors.length, dot: COLORS.info },
    { label: 'Pending Approval', value: vendors.filter((v) => v.status === 'Pending').length, dot: COLORS.warning },
    { label: 'Suspended', value: vendors.filter((v) => v.status === 'Suspended').length, dot: COLORS.danger },
  ];

  const cell = { padding: '16px', fontSize: '14px', color: COLORS.textMain };

  return (
    <div style={{ opacity: loading ? 0.7 : 1 }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ color: COLORS.navy, margin: 0, fontSize: '24px', fontWeight: '700' }}>Vendor Management</h1>
        <p style={{ color: COLORS.textMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Onboard, approve, and supervise marketplace vendors.</p>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {pills.map((p, i) => (
          <span key={i} style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: COLORS.textMain, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: SHADOWS.card }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: p.dot }} />
            {p.label}
            <span style={{ backgroundColor: COLORS.cream, padding: '2px 8px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>{p.value}</span>
          </span>
        ))}
      </div>

      <div style={{ backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: SHADOWS.card, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: `1px solid ${COLORS.border}` }}>
              {['Vendor', 'Location', 'Products', 'GMV', 'Status', 'Joined', 'Actions'].map((h) => (
                <th key={h} style={{ padding: '16px', color: COLORS.textMuted, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => {
              const st = statusStyle(v.status);
              return (
                <tr key={v._id} style={{ borderBottom: `1px solid ${COLORS.borderLight}` }}>
                  <td style={cell}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', backgroundColor: COLORS.borderLight, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Factory size={18} color={COLORS.textMuted} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: COLORS.textMain }}>{v.name}</div>
                        <div style={{ color: COLORS.textMuted, fontSize: '12px' }}>{v.contact}</div>
                      </div>
                    </div>
                  </td>
                  <td style={cell}><span style={{ display: '
