import React from 'react';
import { COLORS } from '../utils/colors';

const Payouts = () => {
  const transactions = [
    { id: 'PAY-001', date: '2026-07-28', amount: '¥12,500', status: 'Completed', method: 'Alipay' },
    { id: 'PAY-002', date: '2026-07-21', amount: '¥8,200', status: 'Completed', method: 'WeChat Pay' },
    { id: 'PAY-003', date: '2026-07-14', amount: '¥15,000', status: 'Completed', method: 'Bank Transfer' },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: COLORS.navy, margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>Payouts & Earnings</h1>
        <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: '14px' }}>Manage your store balance and withdrawal history.</p>
      </div>

      {/* Hero Balance Card */}
      <div style={{ 
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, #1A365D 100%)`,
        borderRadius: '20px', 
        padding: '32px', 
        color: COLORS.white, 
        marginBottom: '32px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(circle, ${COLORS.gold}40 0%, transparent 70%)` }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS.gold }}></span>
            Available Balance
          </div>
          <div style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-1px', marginBottom: '8px' }}>¥45,200.00</div>
          <div style={{ fontSize: '13px', opacity: 0.8 }}>Next automatic payout: <span style={{ color: COLORS.gold, fontWeight: 600 }}>Friday, Aug 07</span></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 1 }}>
          <button style={{ 
            backgroundColor: COLORS.coral, 
            color: COLORS.white, 
            border: 'none', 
            padding: '14px 28px', 
            borderRadius: '12px', 
            fontWeight: '600', 
            fontSize: '15px', 
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(241, 96, 46, 0.3)'
          }}>
            Withdraw Now
          </button>
          <button style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            color: COLORS.white, 
            border: `1px solid rgba(255,255,255,0.2)`, 
            padding: '12px 28px', 
            borderRadius: '12px', 
            fontWeight: '500', 
            fontSize: '14px', 
            cursor: 'pointer',
            backdropFilter: 'blur(4px)'
          }}>
            View Breakdown
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div style={{ 
        backgroundColor: COLORS.white, 
        borderRadius: '16px', 
        padding: '24px', 
        boxShadow: COLORS.shadow,
        border: `1px solid ${COLORS.border}`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ color: COLORS.navy, margin: 0, fontSize: '16px', fontWeight: '600' }}>Transaction History</h3>
          <button style={{ 
            background: 'none', border: 'none', color: COLORS.coral, 
            fontSize: '13px', fontWeight: '600', cursor: 'pointer' 
          }}>Download All</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              <th style={{ padding: '12px 0', color: COLORS.textSecondary, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>ID</th>
              <th style={{ padding: '12px 0', color: COLORS.textSecondary, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Date</th>
              <th style={{ padding: '12px 0', color: COLORS.textSecondary, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Amount</th>
              <th style={{ padding: '12px 0', color: COLORS.textSecondary, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Method</th>
              <th style={{ padding: '12px 0', color: COLORS.textSecondary, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, idx) => (
              <tr key={t.id} style={{ borderBottom: idx < transactions.length - 1 ? `1px solid ${COLORS.border}` : 'none' }}>
                <td style={{ padding: '16px 0', fontWeight: '600', color: COLORS.navy }}>{t.id}</td>
                <td style={{ padding: '16px 0', color: COLORS.textSecondary }}>{t.date}</td>
                <td style={{ padding: '16px 0', fontWeight: '700', color: COLORS.success }}>+ {t.amount}</td>
                <td style={{ padding: '16px 0', color: COLORS.textPrimary }}>{t.method}</td>
                <td style={{ padding: '16px 0' }}>
                  <span style={{ 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: '600',
                    backgroundColor: COLORS.successBg, 
                    color: COLORS.success
                  }}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payouts;
