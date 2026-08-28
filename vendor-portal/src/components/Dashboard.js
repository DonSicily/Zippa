import React from 'react';
import { COLORS } from '../utils/colors';

const StatCard = ({ title, value, subtext, delta, icon }) => (
  <div style={{ 
    backgroundColor: COLORS.white, 
    padding: '24px', 
    borderRadius: '16px', 
    flex: 1, 
    boxShadow: COLORS.shadow,
    border: `1px solid ${COLORS.border}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ color: COLORS.textSecondary, fontSize: '13px', fontWeight: 500 }}>{title}</div>
      <div style={{ 
        width: '32px', height: '32px', borderRadius: '8px', 
        backgroundColor: COLORS.cream, 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '16px'
      }}>{icon}</div>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
      <div style={{ color: COLORS.navy, fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>{value}</div>
      {delta && (
        <div style={{ 
          fontSize: '12px', 
          fontWeight: '600',
          color: delta.startsWith('+') ? COLORS.success : COLORS.danger,
          backgroundColor: delta.startsWith('+') ? COLORS.successBg : COLORS.dangerBg,
          padding: '2px 8px',
          borderRadius: '12px'
        }}>
          {delta}
        </div>
      )}
    </div>
    <div style={{ color: COLORS.textMuted, fontSize: '12px' }}>{subtext}</div>
  </div>
);

const Dashboard = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: COLORS.navy, margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>Dashboard Overview</h1>
        <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: '14px' }}>Here's what's happening with your store today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <StatCard title="Total Revenue" value="¥124,500" subtext="vs last month" delta="+12%" icon="💰" />
        <StatCard title="Total Orders" value="1,240" subtext="85 completed this week" delta="+8%" icon="📦" />
        <StatCard title="Pending Orders" value="14" subtext="Needs fulfillment" delta="-2" icon="⏳" />
        <StatCard title="Payout Balance" value="¥45,200" subtext="Next payout: Friday" icon="🏦" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Chart Placeholder */}
        <div style={{ 
          backgroundColor: COLORS.white, 
          padding: '24px', 
          borderRadius: '16px', 
          boxShadow: COLORS.shadow,
          border: `1px solid ${COLORS.border}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ color: COLORS.navy, margin: 0, fontSize: '16px', fontWeight: '600' }}>Sales Trend</h3>
            <div style={{ fontSize: '12px', color: COLORS.textSecondary, padding: '6px 12px', backgroundColor: COLORS.cream, borderRadius: '20px' }}>Last 7 Days</div>
          </div>
          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '12px', paddingBottom: '10px' }}>
            {[40, 70, 55, 80, 65, 90, 75].map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ 
                  width: '100%', 
                  height: `${h}%`, 
                  background: i === 5 ? `linear-gradient(180deg, ${COLORS.coral}, ${COLORS.gold})` : COLORS.cream,
                  borderRadius: '6px',
                  transition: 'all 0.3s ease'
                }}></div>
                <span style={{ fontSize: '11px', color: COLORS.textMuted }}>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance / Quick Actions */}
        <div style={{ 
          backgroundColor: COLORS.white, 
          padding: '24px', 
          borderRadius: '16px', 
          boxShadow: COLORS.shadow,
          border: `1px solid ${COLORS.border}`
        }}>
          <h3 style={{ color: COLORS.navy, margin: '0 0 20px 0', fontSize: '16px', fontWeight: '600' }}>Store Performance</h3>
          
          {[
            { label: 'Quality Score', value: '92%', color: COLORS.success },
            { label: 'Fulfillment Rate', value: '98%', color: COLORS.success },
            { label: 'Return Rate', value: '1.2%', color: COLORS.warning }
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? '20px' : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: COLORS.textSecondary }}>{item.label}</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: COLORS.navy }}>{item.value}</span>
              </div>
              <div style={{ height: '6px', backgroundColor: COLORS.cream, borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', 
                  width: item.value, 
                  backgroundColor: item.color, 
                  borderRadius: '3px',
                  transition: 'width 0.5s ease'
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{ 
        backgroundColor: COLORS.white, 
        padding: '24px', 
        borderRadius: '16px', 
        boxShadow: COLORS.shadow,
        border: `1px solid ${COLORS.border}`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ color: COLORS.navy, margin: 0, fontSize: '16px', fontWeight: '600' }}>Recent Orders</h3>
          <button style={{ 
            background: 'none', border: 'none', color: COLORS.coral, 
            fontSize: '13px', fontWeight: '600', cursor: 'pointer' 
          }}>View All →</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              <th style={{ padding: '12px 0', color: COLORS.textSecondary, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Order ID</th>
              <th style={{ padding: '12px 0', color: COLORS.textSecondary, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Customer</th>
              <th style={{ padding: '12px 0', color: COLORS.textSecondary, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Amount</th>
              <th style={{ padding: '12px 0', color: COLORS.textSecondary, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'BSTZ-8X92A', customer: 'John Doe', amount: '¥450', status: 'Pending' },
              { id: 'BSTZ-7Y81B', customer: 'Jane Smith', amount: '¥1,200', status: 'Shipped to Hub' },
              { id: 'BSTZ-6W70C', customer: 'Mike Johnson', amount: '¥890', status: 'Completed' },
            ].map((order, idx) => (
              <tr key={idx} style={{ borderBottom: idx < 2 ? `1px solid ${COLORS.border}` : 'none' }}>
                <td style={{ padding: '16px 0', fontWeight: '600', color: COLORS.navy }}>{order.id}</td>
                <td style={{ padding: '16px 0', color: COLORS.textPrimary }}>{order.customer}</td>
                <td style={{ padding: '16px 0', color: COLORS.textPrimary }}>{order.amount}</td>
                <td style={{ padding: '16px 0' }}>
                  <span style={{ 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: '600',
                    backgroundColor: order.status === 'Completed' ? COLORS.successBg : order.status === 'Pending' ? COLORS.warningBg : COLORS.infoBg,
                    color: order.status === 'Completed' ? COLORS.success : order.status === 'Pending' ? COLORS.warning : COLORS.info
                  }}>
                    {order.status}
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

export default Dashboard;
