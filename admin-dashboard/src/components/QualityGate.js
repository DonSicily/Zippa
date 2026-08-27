import React, { useState } from 'react';
import { Eye, CheckCircle, AlertTriangle } from 'lucide-react';
import { COLORS } from '../utils/colors';

const QualityGate = () => {
  const [filter, setFilter] = useState('all');
  const products = [
    { id: 'BZ-101', name: 'Aero Pro Wireless Earbuds Pro', vendor: 'Shenzhen Tech Co.', loc: 'Shenzhen', price: '$58', time: '2h ago', assets: 3, score: 94, status: 'Pending' },
    { id: 'HD-202', name: 'Oversized Campus Hoodie', vendor: 'Guangzhou Fashion', loc: 'Guangzhou', price: '$32', time: '3h ago', assets: 2, score: 78, status: 'Pending' },
    { id: 'LP-303', name: 'Aurora LED Desk Lamp v2', vendor: 'Yiwu Home Goods', loc: 'Yiwu', price: '$18', time: '5h ago', assets: 4, score: 88, status: 'Flagged' },
  ];

  const ScoreRing = ({ score }) => {
    const radius = 16; const circ = 2 * Math.PI * radius;
    const offset = circ - (score / 100) * circ;
    const color = score >= 90 ? COLORS.success : score >= 70 ? COLORS.warning : COLORS.danger;
    return (
      <svg width="40" height="40" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="20" cy="20" r={radius} fill="none" stroke="#F1F5F9" strokeWidth="3" />
        <circle cx="20" cy="20" r={radius} fill="none" stroke={color} strokeWidth="3" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
        <text x="20" y="20" fill={color} fontSize="10" fontWeight="bold" textAnchor="middle" dy=".3em" style={{ transform: 'rotate(90deg)', transformOrigin: '20px 20px' }}>{score}</text>
      </svg>
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: COLORS.navy, margin: 0, fontSize: '24px' }}>Quality Gate</h1>
          <p style={{ color: COLORS.textMuted, margin: '4px 0 0 0', fontSize: '14px' }}>12 items pending review</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ backgroundColor: COLORS.white, borderRadius: '8px', padding: '4px', display: 'flex', border: `1px solid ${COLORS.border}` }}>
            {['All', 'Pending', 'Flagged'].map(f => (
              <button key={f} onClick={() => setFilter(f.toLowerCase())} style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', backgroundColor: filter === f.toLowerCase() ? COLORS.infoBg : 'transparent', color: filter === f.toLowerCase() ? COLORS.info : COLORS.textMuted, fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                {f} {f === 'Pending' && <span style={{ marginLeft: '4px' }}>1</span>}
              </button>
            ))}
          </div>
          <button style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Bulk Actions</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <span style={{ backgroundColor: COLORS.warningBg, color: '#92400E', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>Pending 12</span>
        <span style={{ backgroundColor: COLORS.successBg, color: COLORS.success, padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>Approved today 28</span>
        <span style={{ backgroundColor: COLORS.dangerBg, color: COLORS.danger, padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>Rejected today 3</span>
      </div>

      <div style={{ backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: SHADOWS.card, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: `1px solid ${COLORS.border}` }}>
              {['Product', 'Vendor', 'Price', 'Submitted', 'Assets', 'Quality Score', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '16px', color: COLORS.textMuted, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#F1F5F9', borderRadius: '8px' }} />
                    <div>
                      <div style={{ fontWeight: '600', color: COLORS.textMain, fontSize: '14px' }}>{p.name}</div>
                      <div style={{ color: COLORS.textMuted, fontSize: '12px' }}>{p.id}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px', fontSize: '14px' }}>
                  <div style={{ fontWeight: '600', color: COLORS.textMain }}>{p.vendor}</div>
                  <div style={{ color: COLORS.textMuted, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>📍 {p.loc}</div>
                </td>
                <td style={{ padding: '16px', fontWeight: '600', color: COLORS.textMain }}>{p.price}</td>
                <td style={{ padding: '16px', color: COLORS.textMuted, fontSize: '14px' }}>{p.time}</td>
                <td style={{ padding: '16px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {p.assets} images {p.assets < 3 ? <AlertTriangle size={14} color={COLORS.warning} /> : <CheckCircle size={14} color={COLORS.success} />}
                </td>
                <td style={{ padding: '16px' }}><ScoreRing score={p.score} /></td>
                <td style={{ padding: '16px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', backgroundColor: p.status === 'Pending' ? COLORS.warningBg : COLORS.dangerBg, color: p.status === 'Pending' ? '#92400E' : COLORS.danger }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button style={{ backgroundColor: COLORS.success, color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Approve</button>
                  <button style={{ backgroundColor: 'white', color: COLORS.danger, border: `1px solid ${COLORS.danger}`, padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Reject</button>
                  <Eye size={16} color={COLORS.textMuted} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default QualityGate;
