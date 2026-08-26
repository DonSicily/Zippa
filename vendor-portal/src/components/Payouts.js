import React from 'react';

const COLORS = { primary: '#004E89', accent: '#FF6B35', white: '#FFFFFF', textDark: '#1A202C', textLight: '#718096', success: '#38A169' };

const Payouts = () => {
  const transactions = [
    { id: 'PAY-001', date: '2026-07-28', amount: '¥12,500', status: 'Completed', method: 'Alipay' },
    { id: 'PAY-002', date: '2026-07-21', amount: '¥8,200', status: 'Completed', method: 'WeChat Pay' },
    { id: 'PAY-003', date: '2026-07-14', amount: '¥15,000', status: 'Completed', method: 'Bank Transfer' },
  ];

  return (
    <div>
      <h1 style={{ color: COLORS.textDark, marginBottom: '24px' }}>Payouts & Earnings</h1>

      <div style={{ backgroundColor: COLORS.primary, borderRadius: '16px', padding: '30px', color: COLORS.white, marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>Available Balance</div>
          <div style={{ fontSize: '42px', fontWeight: 'bold' }}>¥45,200.00</div>
          <div style={{ fontSize: '13px', opacity: 0.8, marginTop: '8px' }}>Next automatic payout: Friday, Aug 07</div>
        </div>
        <button style={{ 
          backgroundColor: COLORS.accent, color: COLORS.white, border: 'none', 
          padding: '14px 28px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          Request Payout
        </button>
      </div>

      <div style={{ backgroundColor: COLORS.white, borderRadius: '12px', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ color: COLORS.textDark, marginBottom: '16px' }}>Transaction History</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #EDF2F7' }}>
              <th style={{ padding: '12px 0', color: COLORS.textLight, fontSize: '12px' }}>ID</th>
              <th style={{ padding: '12px 0', color: COLORS.textLight, fontSize: '12px' }}>DATE</th>
              <th style={{ padding: '12px 0', color: COLORS.textLight, fontSize: '12px' }}>AMOUNT</th>
              <th style={{ padding: '12px 0', color: COLORS.textLight, fontSize: '12px' }}>METHOD</th>
              <th style={{ padding: '12px 0', color: COLORS.textLight, fontSize: '12px' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} style={{ borderBottom: '1px solid #EDF2F7' }}>
                <td style={{ padding: '16px 0', fontWeight: 'bold', color: COLORS.textDark }}>{t.id}</td>
                <td style={{ padding: '16px 0', color: COLORS.textLight }}>{t.date}</td>
                <td style={{ padding: '16px 0', fontWeight: 'bold', color: COLORS.success }}>{t.amount}</td>
                <td style={{ padding: '16px 0', color: COLORS.textDark }}>{t.method}</td>
                <td style={{ padding: '16px 0' }}>
                  <span style={{ 
                    padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                    backgroundColor: '#C6F6D5', color: '#276749'
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
