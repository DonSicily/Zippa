import React from 'react';

const COLORS = { primary: '#004E89', accent: '#FF6B35', white: '#FFFFFF', textDark: '#0F172A', textLight: '#64748B', success: '#10B981' };

const Financials = () => {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: COLORS.textDark, margin: 0, fontSize: '24px' }}>Financials & Revenue 💰</h1>
        <p style={{ color: COLORS.textLight, margin: '4px 0 0 0', fontSize: '14px' }}>Track GMV, platform commissions, and vendor payouts.</p>
      </div>

      {/* High Level Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: COLORS.primary, padding: '24px', borderRadius: '12px', color: 'white' }}>
          <div style={{ fontSize: '13px', opacity: 0.8, marginBottom: '8px' }}>Total GMV (This Month)</div>
          <div style={{ fontSize: '32px', fontWeight: '700' }}>₦12,450,000</div>
          <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '8px' }}>↑ 18% vs last month</div>
        </div>
        <div style={{ backgroundColor: COLORS.accent, padding: '24px', borderRadius: '12px', color: 'white' }}>
          <div style={{ fontSize: '13px', opacity: 0.8, marginBottom: '8px' }}>Platform Revenue (15% Comm.)</div>
          <div style={{ fontSize: '32px', fontWeight: '700' }}>₦1,867,500</div>
          <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '8px' }}>Net profit after ops</div>
        </div>
        <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '13px', color: COLORS.textLight, marginBottom: '8px' }}>Pending Vendor Payouts</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: COLORS.textDark }}>¥45,200</div>
          <div style={{ fontSize: '12px', color: COLORS.textLight, marginTop: '8px' }}>Auto-releases on Friday</div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div style={{ backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #F1F5F9' }}>
          <h3 style={{ margin: 0, color: COLORS.textDark, fontSize: '16px' }}>Recent Platform Earnings</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>ORDER ID</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>CUSTOMER</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>TOTAL AMOUNT</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>PLATFORM FEE (15%)</th>
              <th style={{ padding: '16px', color: COLORS.textLight, fontSize: '12px', fontWeight: '600' }}>VENDOR PAYOUT</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'BSTZ-8X92A', customer: 'Chinedu O.', total: '₦22,000', fee: '₦3,300', payout: '₦18,700' },
              { id: 'BSTZ-7Y81B', customer: 'Aisha M.', total: '₦15,000', fee: '₦2,250', payout: '₦12,750' },
              { id: 'BSTZ-6W70C', customer: 'Tunde B.', total: '₦45,000', fee: '₦6,750', payout: '₦38,250' },
            ].map((t) => (
              <tr key={t.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '16px', fontWeight: '600', color: COLORS.primary }}>{t.id}</td>
                <td style={{ padding: '16px', color: COLORS.textDark }}>{t.customer}</td>
                <td style={{ padding: '16px', color: COLORS.textDark, fontWeight: '500' }}>{t.total}</td>
                <td style={{ padding: '16px', color: COLORS.success, fontWeight: '600' }}>{t.fee}</td>
                <td style={{ padding: '16px', color: COLORS.textLight }}>{t.payout}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Financials;
