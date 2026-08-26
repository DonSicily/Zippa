import React from 'react';

const COLORS = { primary: '#004E89', accent: '#FF6B35', white: '#FFFFFF', textDark: '#0F172A', textLight: '#64748B', success: '#10B981', danger: '#EF4444' };

const VendorManager = () => {
  const vendors = [
    { id: 'V-01', name: 'Shenzhen Tech Co.', location: 'Shenzhen', orders: 1240, rating: 4.8, status: 'Approved' },
    { id: 'V-02', name: 'Guangzhou Fashion', location: 'Guangzhou', orders: 850, rating: 4.5, status: 'Approved' },
    { id: 'V-03', name: 'Yiwu Home Goods', location: 'Yiwu', orders: 120, rating: 3.9, status: 'Suspended' },
    { id: 'V-04', name: 'Dongguan Bags Ltd', location: 'Guangzhou', orders: 0, rating: 0, status: 'Pending' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: COLORS.textDark, margin: 0, fontSize: '24px' }}>Vendor Management 🏭</h1>
        <p style={{ color: COLORS.textLight, margin: '4px 0 0 0', fontSize: '14px' }}>Manage factory partnerships, performance, and payouts.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Vendors', value: '24', color: COLORS.primary },
          { label: 'Approved', value: '18', color: COLORS.success },
          { label: 'Pending Approval', value: '4', color: '#F59E0B' },
          { label: 'Suspended', value: '2', color: COLORS.danger },
        ].map((stat, idx) => (
          <div key={idx} style={{ backgroundColor: COLORS.white, padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ color: COLORS.textLight, fontSize: '13px', marginBottom: '8px' }}>{stat.label}</div>
            <div style={{ color: stat.color, fontSize: '28px', fontWeight: '700' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>VENDOR</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>LOCATION</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>TOTAL ORDERS</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>RATING</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>STATUS</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '16px', fontWeight: '600', color: COLORS.textDark }}>{v.name}</td>
                <td style={{ padding: '16px', color: COLORS.textLight }}>{v.location}</td>
                <td style={{ padding: '16px', color: COLORS.textDark }}>{v.orders}</td>
                <td style={{ padding: '16px', color: COLORS.textDark }}>{v.rating > 0 ? `⭐ ${v.rating}` : '-'}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600',
                    backgroundColor: v.status === 'Approved' ? '#D1FAE5' : v.status === 'Pending' ? '#FEF3C7' : '#FEE2E2',
                    color: v.status === 'Approved' ? '#065F46' : v.status === 'Pending' ? '#92400E' : '#991B1B'
                  }}>
                    {v.status}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <button style={{ color: COLORS.primary, background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorManager;
