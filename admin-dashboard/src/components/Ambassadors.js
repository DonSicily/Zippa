import React from 'react';
import { UserCircle } from 'lucide-react';
import { COLORS, SHADOWS } from '../utils/colors';

const AMBASSADORS = [
  { name: 'Chidera Okafor', campus: 'UNILAG', referrals: 34, gmv: '$12,400', status: 'Active' },
  { name: 'Tunde Adeyemi', campus: 'OAU', referrals: 28, gmv: '$9,850', status: 'Active' },
  { name: 'Amara Nwosu', campus: 'UI', referrals: 19, gmv: '$7,200', status: 'Pending Payout' },
  { name: 'Ibrahim Musa', campus: 'UNN', referrals: 12, gmv: '$4,300', status: 'Active' },
];

const cell = { padding: '16px', fontSize: '14px', color: COLORS.textMain };

const Ambassadors = () => (
  <div>
    <div style={{ marginBottom: '24px' }}>
      <h1 style={{ color: COLORS.navy, margin: 0, fontSize: '24px', fontWeight: '700' }}>Campus Ambassadors</h1>
      <p style={{ color: COLORS.textMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Student growth partners driving orders per campus.</p>
    </div>

    <div style={{ backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: SHADOWS.card, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#F8FAFC', borderBottom: `1px solid ${COLORS.border}` }}>
            {['Ambassador', 'Campus', 'Referrals', 'GMV Generated', 'Status'].map((h) => (
              <th key={h} style={{ padding: '16px', color: COLORS.textMuted, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {AMBASSADORS.map((a, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${COLORS.borderLight}` }}>
              <td style={cell}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600' }}>
                  <UserCircle size={20} color={COLORS.gold} /> {a.name}
                </div>
              </td>
              <td style={cell}>{a.campus}</td>
              <td style={cell}>{a.referrals}</td>
              <td style={{ ...cell, fontWeight: '600' }}>{a.gmv}</td>
              <td style={cell}>
                <span style={{
                  padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600',
                  backgroundColor: a.status === 'Active' ? COLORS.successBg : COLORS.warningBg,
                  color: a.status === 'Active' ? COLORS.success : '#92400E',
                }}>
                  {a.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Ambassadors;
