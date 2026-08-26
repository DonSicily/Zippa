import React, { useState } from 'react';

const COLORS = { primary: '#004E89', accent: '#FF6B35', white: '#FFFFFF', textDark: '#0F172A', textLight: '#64748B', success: '#10B981', danger: '#EF4444', warning: '#F59E0B' };

const QualityGate = () => {
  const [products, setProducts] = useState([
    { id: 'P-101', vendor: 'Shenzhen Tech Co.', name: 'Wireless Earbuds Pro', price: '¥120', images: 3, status: 'Pending' },
    { id: 'P-102', vendor: 'Guangzhou Fashion', name: 'Oversized Campus Hoodie', price: '¥45', images: 2, status: 'Pending' },
    { id: 'P-103', vendor: 'Yiwu Home Goods', name: 'LED Desk Lamp', price: '¥30', images: 1, status: 'Flagged' },
  ]);

  const handleAction = (id, action) => {
    setProducts(products.filter(p => p.id !== id));
    alert(`Product ${id} has been ${action === 'approve' ? 'approved and published' : 'rejected and notified to vendor'}.`);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: COLORS.textDark, margin: 0, fontSize: '24px' }}>Quality Gate 🛡️</h1>
          <p style={{ color: COLORS.textLight, margin: '4px 0 0 0', fontSize: '14px' }}>Review and approve products before they go live on the student app.</p>
        </div>
      </div>

      <div style={{ backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>PRODUCT</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>VENDOR</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>PRICE</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>ASSETS</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>STATUS</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '16px', fontWeight: '600', color: COLORS.textDark }}>{p.name}</td>
                <td style={{ padding: '16px', color: COLORS.textLight }}>{p.vendor}</td>
                <td style={{ padding: '16px', color: COLORS.textDark }}>{p.price}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ color: p.images < 3 ? COLORS.danger : COLORS.success, fontSize: '13px', fontWeight: '500' }}>
                    {p.images} images {p.images < 3 && '(Min 3 required)'}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600',
                    backgroundColor: p.status === 'Pending' ? '#FEF3C7' : '#FEE2E2',
                    color: p.status === 'Pending' ? '#92400E' : '#991B1B'
                  }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <button onClick={() => handleAction(p.id, 'reject')} style={{ color: COLORS.danger, background: 'none', border: '1px solid #FECACA', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', marginRight: '8px', fontSize: '13px' }}>Reject</button>
                  <button onClick={() => handleAction(p.id, 'approve')} style={{ color: COLORS.white, backgroundColor: COLORS.success, border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: COLORS.textLight }}>All caught up! No pending products.</div>}
      </div>
    </div>
  );
};

export default QualityGate;
