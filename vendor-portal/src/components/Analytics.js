import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/vendorService';
import { Card, KpiCard } from './ui';
import { COLORS } from '../utils/colors';

const FALLBACK_TREND = [
  { day: 'Mon', amount: 4500 }, { day: 'Tue', amount: 6200 }, { day: 'Wed', amount: 5100 },
  { day: 'Thu', amount: 8400 }, { day: 'Fri', amount: 12000 }, { day: 'Sat', amount: 15500 }, { day: 'Sun', amount: 9800 },
];
const FALLBACK_TOP = [
  { name: 'Wireless Earbuds Pro', sold: 142, revenue: '¥17,040' },
  { name: 'Smart Fitness Watch', sold: 98, revenue: '¥8,330' },
  { name: 'Canvas Backpack', sold: 76, revenue: '¥3,420' },
];

const Analytics = () => {
  const [stats, setStats] = useState({});
  useEffect(() => { getDashboardStats().then(b => setStats(b?.data || b || {})).catch(() => {}); }, []);

  const trend = stats.salesTrend?.length ? stats.salesTrend.map(d => ({ day: d.label || d.day || d.date?.slice(0, 3), amount: d.amount ?? d.value ?? 0 })) : FALLBACK_TREND;
  const top = stats.topProducts?.length ? stats.topProducts : FALLBACK_TOP;
  const maxSales = Math.max(...trend.map(d => d.amount), 1);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: COLORS.navy, margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>Sales Analytics</h1>
        <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: '14px' }}>Detailed performance metrics for your store.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <KpiCard title="Total Revenue (30 Days)" value={stats.totalRevenue != null ? `¥${Number(stats.totalRevenue).toLocaleString()}` : '¥124,500'} delta={stats.revenueGrowth ?? '+12.5%'} />
        <KpiCard title="Orders Fulfilled" value={stats.totalOrders ?? '1,240'} delta={stats.ordersGrowth ?? '+8.2%'} />
        <KpiCard title="Conversion Rate" value={stats.conversionRate != null ? `${stats.conversionRate}%` : '4.8%'} delta={stats.conversionGrowth ?? '-0.4%'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ color: COLORS.navy, margin: 0, fontSize: '16px', fontWeight: '600' }}>Weekly Sales Trend</h3>
            <div style={{ fontSize: '12px', color: COLORS.textSecondary, padding: '6px 12px', backgroundColor: COLORS.cream, borderRadius: '20px' }}>This Week</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '220px', paddingBottom: '20px', borderBottom: `1px solid ${COLORS.border}` }}>
            {trend.map((d, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '10px', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '60%', backgroundColor: d.amount === maxSales ? COLORS.coral : COLORS.cream, borderRadius: '6px 6px 0 0', height: `${(d.amount / maxSales) * 100}%`, minHeight: '10px', transition: 'height 0.3s ease' }}></div>
                <div style={{ fontSize: '12px', color: COLORS.textMuted }}>{d.day}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 style={{ color: COLORS.navy, margin: '0 0 20px 0', fontSize: '16px', fontWeight: '600' }}>Top Products</h3>
          {top.map((p, idx) => (
            <div key={idx} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: idx < top.length - 1 ? `1px solid ${COLORS.border}` : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: '600', color: COLORS.textPrimary, fontSize: '14px' }}>{p.name}</span>
                <span style={{ fontWeight: '700', color: COLORS.coral, fontSize: '14px' }}>{typeof p.revenue === 'number' ? `¥${p.revenue.toLocaleString()}` : p.revenue}</span>
              </div>
              <div style={{ fontSize: '12px', color: COLORS.textSecondary }}>{p.sold ?? p.soldCount ?? 0} units sold</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
