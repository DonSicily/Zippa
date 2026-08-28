import React from 'react';
import { COLORS } from '../utils/colors';

const Analytics = () => {
  const weeklySales = [
    { day: 'Mon', amount: 4500 }, { day: 'Tue', amount: 6200 }, { day: 'Wed', amount: 5100 },
    { day: 'Thu', amount: 8400 }, { day: 'Fri', amount: 12000 }, { day: 'Sat', amount: 15500 }, { day: 'Sun', amount: 9800 }
  ];
  const maxSales = Math.max(...weeklySales.map(d => d.amount));
  
  const topProducts = [
    { name: 'Wireless Earbuds Pro', sold: 142, revenue: '¥17,040' },
    { name: 'Smart Fitness Watch', sold: 98, revenue: '¥8,330' },
    { name: 'Canvas Backpack', sold: 76, revenue: '¥3,420' },
  ];

  const stats = [
    { label: 'Total Revenue (30 Days)', value: '¥124,500', change: '+12.5%', positive: true },
    { label: 'Orders Fulfilled', value: '1,240', change: '+8.2%', positive: true },
    { label: 'Conversion Rate', value: '4.8%', change: '-0.4%', positive: false },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: COLORS.navy, margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>Sales Analytics</h1>
        <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: '14px' }}>Detailed performance metrics for your store.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{ 
            backgroundColor: COLORS.white, 
            padding: '24px', 
            borderRadius: '16px', 
            boxShadow: COLORS.shadow,
            border: `1px solid ${COLORS.border}`
          }}>
            <div style={{ color: COLORS.textSecondary, fontSize: '13px', marginBottom: '12px' }}>{stat.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <div style={{ color: COLORS.navy, fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>{stat.value}</div>
              <div style={{ 
                fontSize: '12px', 
                fontWeight: '600',
                color: stat.positive ? COLORS.success : COLORS.danger,
                backgroundColor: stat.positive ? COLORS.successBg : COLORS.dangerBg,
                padding: '2px 8px',
                borderRadius: '12px'
              }}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ 
          backgroundColor: COLORS.white, 
          padding: '24px', 
          borderRadius: '16px', 
          boxShadow: COLORS.shadow,
          border: `1px solid ${COLORS.border}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ color: COLORS.navy, margin: 0, fontSize: '16px', fontWeight: '600' }}>Weekly Sales Trend</h3>
            <div style={{ fontSize: '12px', color: COLORS.textSecondary, padding: '6px 12px', backgroundColor: COLORS.cream, borderRadius: '20px' }}>This Week</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '220px', paddingBottom: '20px', borderBottom: `1px solid ${COLORS.border}` }}>
            {weeklySales.map((data, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '10px' }}>
                <div style={{ 
                  width: '60%', 
                  backgroundColor: idx === 5 ? COLORS.coral : COLORS.cream,
                  borderRadius: '6px 6px 0 0', 
                  height: `${(data.amount / maxSales) * 100}%`, 
                  minHeight: '10px', 
                  transition: 'height 0.3s ease' 
                }}></div>
                <div style={{ fontSize: '12px', color: COLORS.textMuted }}>{data.day}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ 
          backgroundColor: COLORS.white, 
          padding: '24px', 
          borderRadius: '16px', 
          boxShadow: COLORS.shadow,
          border: `1px solid ${COLORS.border}`
        }}>
          <h3 style={{ color: COLORS.navy, margin: '0 0 20px 0', fontSize: '16px', fontWeight: '600' }}>Top Products</h3>
          {topProducts.map((prod, idx) => (
            <div key={idx} style={{ 
              marginBottom: '20px', 
              paddingBottom: '20px', 
              borderBottom: idx < topProducts.length - 1 ? `1px solid ${COLORS.border}` : 'none' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: '600', color: COLORS.textPrimary, fontSize: '14px' }}>{prod.name}</span>
                <span style={{ fontWeight: '700', color: COLORS.coral, fontSize: '14px' }}>{prod.revenue}</span>
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary }}>{prod.sold} units sold</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
