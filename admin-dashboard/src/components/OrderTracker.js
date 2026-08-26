import React from 'react';

const COLORS = { primary: '#004E89', accent: '#FF6B35', white: '#FFFFFF', textDark: '#0F172A', textLight: '#64748B', success: '#10B981' };

const OrderTracker = () => {
  const pipeline = [
    { stage: 'Confirmed', count: 45, color: '#3B82F6' },
    { stage: 'At China Hub', count: 120, color: '#8B5CF6' },
    { stage: 'Shipped (SPEEDAF)', count: 85, color: '#F59E0B' },
    { stage: 'In Nigeria', count: 30, color: '#10B981' },
    { stage: 'Campus Pickup', count: 12, color: COLORS.accent },
  ];

  const recentShipments = [
    { id: 'SPD-9921', orders: 14, weight: '12.5kg', status: 'In Transit to Lagos', eta: 'Aug 05' },
    { id: 'SPD-9920', orders: 22, weight: '18.2kg', status: 'Cleared Customs', eta: 'Aug 03' },
    { id: 'SPD-9919', orders: 8, weight: '5.1kg', status: 'Delivered to Hub', eta: 'Delivered' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: COLORS.textDark, margin: 0, fontSize: '24px' }}>Global Logistics Tracker 🌍</h1>
        <p style={{ color: COLORS.textLight, margin: '4px 0 0 0', fontSize: '14px' }}>Track consolidation, SPEEDAF shipments, and last-mile delivery.</p>
      </div>

      {/* Visual Pipeline */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        {pipeline.map((step, idx) => (
          <div key={idx} style={{ flex: 1, backgroundColor: COLORS.white, padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${step.color}` }}>
            <div style={{ color: COLORS.textLight, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>{step.stage}</div>
            <div style={{ color: COLORS.textDark, fontSize: '28px', fontWeight: '700' }}>{step.count}</div>
            <div style={{ color: COLORS.textLight, fontSize: '12px', marginTop: '4px' }}>orders</div>
          </div>
        ))}
      </div>

      {/* SPEEDAF Shipments Table */}
      <div style={{ backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: COLORS.textDark, fontSize: '16px' }}>Active SPEEDAF Consolidations</h3>
          <button style={{ color: COLORS.primary, background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>View All Shipments</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>SPEEDAF ID</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>ORDERS CONSOLIDATED</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>TOTAL WEIGHT</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>STATUS</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>ETA</th>
            </tr>
          </thead>
          <tbody>
            {recentShipments.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '16px', fontWeight: '600', color: COLORS.primary }}>{s.id}</td>
                <td style={{ padding: '16px', color: COLORS.textDark }}>{s.orders} items</td>
                <td style={{ padding: '16px', color: COLORS.textDark }}>{s.weight}</td>
                <td style={{ padding: '16px', color: COLORS.textDark, fontWeight: '500' }}>{s.status}</td>
                <td style={{ padding: '16px', color: s.eta === 'Delivered' ? COLORS.success : COLORS.textDark, fontWeight: '600' }}>{s.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTracker;
