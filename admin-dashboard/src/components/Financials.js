import React, { useState } from 'react';
import { DollarSign, Clock, CheckCircle, TrendingUp, Download } from 'lucide-react';
import { processVendorPayout } from '../services/adminService';
import { COLORS, SHADOWS } from '../utils/colors';

const SEED_PAYOUTS = [
  { id: 'PO-201', vendor: 'Shenzhen Tech Co.', amount: '$3,240', orders: 42, status: 'Pending', requested: '2h ago' },
  { id: 'PO-202', vendor: 'Guangzhou Fashion', amount: '$2,810', orders: 37, status: 'Pending', requested: '5h ago' },
  { id: 'PO-203', vendor: 'Yiwu Home Goods', amount: '$2,890', orders: 31, status: 'Processing', requested: '1d ago' },
  { id: 'PO-204', vendor: 'Dongguan Bags Ltd', amount: '$1,460', orders: 18, status: 'Completed', requested: '3d ago' },
];

const statusStyle = (s) => ({
  Pending: { bg: COLORS.warningBg, color: '#92400E' },
  Processing: { bg: COLORS.infoBg, color: COLORS.info },
  Completed: { bg: COLORS.successBg, color: COLORS.success },
}[s] || { bg: COLORS.borderLight, color: COLORS.textMuted });

const Financials = () => {
  const [payouts, setPayouts] = useState(SEED_PAYOUTS);
  const [processingId, setProcessingId] = useState(null);

  const kpis = [
    { label: 'Total Revenue', value: '$42,675', trend: '+18%', icon: <TrendingUp size={16} color={COLORS.success} />, bg: COLORS.successBg },
    { label: 'Pending Payouts', value: '$8,940', trend: null, icon: <Clock size={16} color={COLORS.warning} />, bg: COLORS.warningBg },
    { label: 'Processed (30d)', value: '$23,120', trend: '+9%', icon: <CheckCircle size={16} color={COLORS.success} />, bg: COLORS.successBg },
    { label: 'Avg Commission', value: '15%', trend: null, icon: <DollarSign size={16} color={COLORS.info} />, bg: COLORS.infoBg },
  ];

  const handleProcess = async (id, amount) => {
    setProcessingId(id);
    try { await processVendorPayout(id, amount); } catch (e) { /* demo mode */ }
    setPayouts((p) => p.map((x) => (x.id === id ? { ...x, status: 'Processing' } : x)));
    setProcessingId(null);
  };

  const handleExport = () => {
    const rows = [['Payout ID', 'Vendor', 'Amount', 'Orders', 'Status', 'Requested'],
      ...payouts.map((p) => [p.id, p.vendor, p.amount, p.orders, p.status, p.requested])];
    const blob = new Blob([rows.map((r) => r.join(',')).join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'bestiez-financial-report.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const cell = { padding: '16px', fontSize: '14px', color: COLORS.textMain };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: COLORS.navy, margin: 0, fontSize: '24px', fontWeight: '700' }}>Financials</h1>
          <p style={{ color: COLORS.textMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Revenue, commissions, and vendor payouts.</p>
        </div>
        <button onClick={handleExport} style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: COLORS.textMain }}>
          <Download size={16} /> Export Report
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
        {kpis.map((kpi, i) => (
          <div key={i} style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: SHADOWS.card }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <span style={{ color: COLORS.textMuted, fontSize: '14px' }}>{kpi.label}</span>
              <div style={{ backgroundColor: kpi.bg, padding: '6px', borderRadius: '50%' }}>{kpi.icon}</div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: COLORS.navy, marginBottom: '10px' }}>{kpi.value}</div>
            {kpi.trend && <span style={{ backgroundColor: COLORS.successBg, color: COLORS.success, padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>{kpi.trend}</span>}
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: SHADOWS.card, overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: `1px solid ${COLORS.borderLight}` }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: COLORS.navy }}>Vendor Payouts</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: `1px solid ${COLORS.border}` }}>
              {['Payout ID', 'Vendor', 'Amount', 'Orders', 'Status', 'Requested', 'Action'].map((h) => (
                <th key={h} style={{ padding: '16px', color: COLORS.textMuted, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => {
              const st = statusStyle(p.status);
              return (
                <tr key={p.id} style={{ borderBottom: `1px solid ${COLORS.borderLight}` }}>
                  <td style={{ ...cell, fontWeight: '600', color: COLORS.navy }}>{p.id}</td>
                  <td style={cell}>{p.vendor}</td>
                  <td style={{ ...cell, fontWeight: '600' }}>{p.amount}</td>
                  <td style={cell}>{p.orders}</td>
                  <td style={cell}><span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', backgroundColor: st.bg, color: st.color }}>{p.status}</span></td>
                  <td style={{ ...cell, color: COLORS.textMuted }}>{p.requested}</td>
                  <td style={cell}>
                    {p.status === 'Pending' ? (
                      <button onClick={() => handleProcess(p.id, p.amount)} disabled={processingId === p.id} style={{ backgroundColor: COLORS.coral, color: COLORS.white, border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', opacity: processingId === p.id ? 0.6 : 1 }}>
                        {processingId === p.id ? 'Processing…' : 'Process Payout'}
                      </button>
                    ) : (
                      <span style={{ color: COLORS.textMuted, fontSize: '13px' }}>—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Financials;
