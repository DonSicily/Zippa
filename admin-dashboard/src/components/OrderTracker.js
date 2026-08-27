import React from 'react';
import { Download, Truck, CheckCircle, ArrowRight } from 'lucide-react';
import { COLORS } from '../utils/colors';

const OrderTracker = () => {
  const pipeline = [
    { stage: 'Confirmed', count: 45, color: '#3B82F6' },
    { stage: 'China Hub', count: 120, color: '#8B5CF6' },
    { stage: 'SPEEDAF Transit', count: 85, color: COLORS.gold },
    { stage: 'Customs (Lagos)', count: 30, color: COLORS.success },
    { stage: 'Campus Pickup', count: 12, color: COLORS.coral },
  ];

  const shipments = [
    { id: 'SPD-9921', orders: 14, weight: '12.5kg', status: 'In Transit', eta: 'Nov 18, 2024' },
    { id: 'SPD-9920', orders: 8, weight: '5.4kg', status: 'Customs', eta: 'Nov 19, 2024' },
    { id: 'SPD-9919', orders: 20, weight: '18.2kg', status: 'Arrived', eta: 'Nov 17, 2024' },
  ];

  const StatusBadge = ({ status }) => {
    const colors = { 'In Transit': COLORS.infoBg, 'Customs': COLORS.successBg, 'Arrived': COLORS.warningBg, 'Confirmed': '#DBEAFE' };
    const textColors = { 'In Transit': COLORS.info, 'Customs': COLORS.success, 'Arrived': '#92400E', 'Confirmed': COLORS.info };
    return <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', backgroundColor: colors[status], color: textColors[status] }}>{status}</span>;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: COLORS.navy, margin: 0, fontSize: '24px' }}>Global Logistics</h1>
          <p style={{ color: COLORS.textMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Track cross-border shipments from China to Nigeria.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><Download size={16} /> Export CSV</button>
          <button style={{ backgroundColor: COLORS.coral, color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><Truck size={16} /> Schedule Pickup</button>
        </div>
      </div>

      {/* Pipeline */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '30px', alignItems: 'center' }}>
        {pipeline.map((step, idx) => (
          <React.Fragment key={idx}>
            <div style={{ flex: 1, backgroundColor: COLORS.white, padding: '16px', borderRadius: '8px', boxShadow: SHADOWS.card, borderLeft: `4px solid ${step.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: step.color }} />
                <span style={{ color: COLORS.textMuted, fontSize: '12px', fontWeight: '600' }}>{step.stage}</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: COLORS.navy }}>{step.count}</div>
            </div>
            {idx < pipeline.length - 1 && <ArrowRight size={20} color={COLORS.textMuted} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: SHADOWS.card, height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${COLORS.gold}` }}>
          [World Map Visualization: China to Lagos Route]
        </div>
        <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: SHADOWS.card }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: COLORS.navy }}>Active Shipments</h3>
          {shipments.map((s, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: `1px solid ${COLORS.border}` }}>
              <div style={{ fontWeight: '700', fontSize: '14px', color: COLORS.navy }}>{s.id}</div>
              <div style={{ fontSize: '12px', color: COLORS.textMuted, margin: '4px 0' }}>{s.orders} orders · {s.weight}</div>
              <StatusBadge status={s.status} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: SHADOWS.card, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: `1px solid ${COLORS.border}` }}>
              {['SPEEDAF ID', 'Origin → Destination', 'Orders', 'Weight', 'Status', 'ETA', 'Action'].map(h => (
                <th key={h} style={{ padding: '16px', color: COLORS.textMuted, fontSize: '12px', fontWeight: '600' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shipments.map((s) => (
              <tr key={s.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                <td style={{ padding: '16px', fontWeight: '600', color: COLORS.navy }}>{s.id}</td>
                <td style={{ padding: '16px', color: COLORS.textMain, fontSize: '14px' }}>China Hub → Lagos Hub</td>
                <td style={{ padding: '16px', color: COLORS.textMain }}>{s.orders}</td>
                <td style={{ padding: '16px', color: COLORS.textMain }}>{s.weight}</td>
                <td style={{ padding: '16px' }}><StatusBadge status={s.status} /></td>
                <td style={{ padding: '16px', color: COLORS.textMain, fontSize: '14px' }}>{s.eta}</td>
                <td style={{ padding: '16px' }}><a href="#" style={{ color: COLORS.coral, fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>Track</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrderTracker;
