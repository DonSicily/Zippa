import React from 'react';

const COLORS = { primary: '#004E89', accent: '#FF6B35', white: '#FFFFFF', textDark: '#1A202C', textLight: '#718096', success: '#38A169' };

const Analytics = () => {
  // Mock data for the bar chart (Last 7 days sales in RMB)
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

  return (
    <div>
      <h1 style={{ color: COLORS.textDark, marginBottom: '24px' }}>Sales Analytics 📈</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        {[
          { label: 'Total Revenue (30 Days)', value: '¥124,500', change: '+12.5%', color: COLORS.primary },
          { label: 'Orders Fulfilled', value: '1,240', change: '+8.2%', color: COLORS.success },
          { label: 'Conversion Rate', value: '4.8%', change: '-0.4%', color: COLORS.accent },
        ].map((stat, idx) => (
          <div key={idx} style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ color: COLORS.textLight, fontSize: '13px', marginBottom: '8px' }}>{stat.label}</div>
            <div style={{ color: stat.color, fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: stat.change.startsWith('+') ? COLORS.success : COLORS.accent, fontWeight: '600' }}>
              {stat.change} vs last month
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Weekly Sales Chart */}
        <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: COLORS.textDark, marginBottom: '24px', marginTop: 0 }}>Weekly Sales Trend</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', paddingBottom: '20px', borderBottom: '1px solid #EDF2F7' }}>
            {weeklySales.map((data, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{ 
                  width: '60%', backgroundColor: COLORS.primary, borderRadius: '6px 6px 0 0', 
                  height: `${(data.amount / maxSales) * 100}%`, minHeight: '10px', transition: 'height 0.3s' 
                }}></div>
                <div style={{ marginTop: '10px', fontSize: '12px', color: COLORS.textLight }}>{data.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Products */}
        <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: COLORS.textDark, marginBottom: '20px', marginTop: 0 }}>Top Products</h3>
          {topProducts.map((prod, idx) => (
            <div key={idx} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: idx < topProducts.length - 1 ? '1px solid #EDF2F7' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600', color: COLORS.textDark, fontSize: '14px' }}>{prod.name}</span>
                <span style={{ fontWeight: 'bold', color: COLORS.primary, fontSize: '14px' }}>{prod.revenue}</span>
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textLight }}>{prod.sold} units sold</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
