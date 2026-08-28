import React, { useEffect } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { COLORS, SHADOWS } from '../utils/colors';

// Fallbacks mirror the approved mockup until the new backend endpoints ship.
const FALLBACK_METRICS = { totalGMV: 284500, gmvTrend: 18, activeVendors: 24, vendorTrend: 18, pendingQC: 12, activeCampuses: 4, campusTrend: 18 };
const FALLBACK_GMV = Array.from({ length: 30 }, (_, i) => ({
  day: `Aug ${String(i + 1).padStart(2, '0')}`,
  gmv: Math.round(50000 + i * 11500 + Math.sin(i / 2.5) * 22000 + (i % 4) * 9000),
}));
const FALLBACK_CAMPUS = [
  { name: 'UNILAG', percent: 35 },
  { name: 'OAU', percent: 25 },
  { name: 'UI', percent: 20 },
  { name: 'UNN', percent: 20 },
];
const FALLBACK_LIVE = [
  { color: COLORS.success, text: 'Order #1024 shipped to UNILAG', time: '5 mins ago' },
  { color: COLORS.gold, text: 'New vendor application: vendorX', time: '1 hour ago' },
  { color: COLORS.warning, text: 'Quality check failed for Order #1018', time: '2 hours ago' },
  { color: COLORS.info, text: 'New campus ambassador onboarded: UI', time: '4 hours ago' },
];

const Dashboard = () => {
  const { overviewMetrics, gmvHistory, campusPerformance, liveOperations, loadingOverview, fetchAllOverview } = useAdminStore();

  useEffect(() => { fetchAllOverview(); }, [fetchAllOverview]);

  const m = overviewMetrics.totalGMV ? overviewMetrics : FALLBACK_METRICS;
  const chartData = gmvHistory.length ? gmvHistory : FALLBACK_GMV;
  const campus = campusPerformance.length ? campusPerformance : FALLBACK_CAMPUS;
  const live = liveOperations.length ? liveOperations : FALLBACK_LIVE;

  const kpis = [
    { label: 'Total GMV', value: `$${Number(m.totalGMV).toLocaleString()}`, trend: m.gmvTrend, icon: <TrendingUp size={16} color={COLORS.success} />, bg: COLORS.successBg },
    { label: 'Active Vendors', value: m.activeVendors, trend: m.vendorTrend, icon: <TrendingUp size={16} color={COLORS.success} />, bg: COLORS.successBg },
    { label: 'Pending QC', value: m.pendingQC, trend: null, icon: <AlertTriangle size={16} color={COLORS.warning} />, bg: COLORS.warningBg },
    { label: 'Active Campuses', value: m.activeCampuses, trend: m.campusTrend, icon: <TrendingUp size={16} color={COLORS.success} />, bg: COLORS.successBg },
  ];

  return (
    <div style={{ opacity: loadingOverview ? 0.7 : 1, transition: 'opacity 0.2s' }}>
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '24px' }}>
        {kpis.map((kpi, i) => (
          <div key={i} style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: SHADOWS.card }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <span style={{ color: COLORS.textMuted, fontSize: '14px' }}>{kpi.label}</span>
              <div style={{ backgroundColor: kpi.bg, padding: '6px', borderRadius: '50%' }}>{kpi.icon}</div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: COLORS.navy, marginBottom: '10px' }}>{kpi.value}</div>
            {kpi.trend != null && (
              <span style={{ backgroundColor: COLORS.successBg, color: COLORS.success, padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>+{kpi.trend}%</span>
            )}
            {kpi.trend == null && (
              <span style={{ backgroundColor: COLORS.warningBg, color: '#92400E', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>Needs review</span>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* GMV Area Chart */}
        <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: SHADOWS.card, borderTop: `3px solid ${COLORS.gold}` }}>
          <h3 style={{ margin: '0 0 20px 0', color: COLORS.navy, fontSize: '16px', fontWeight: '700' }}>GMV · Last 30 days</h3>
          <div style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gmvFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={COLORS.navy} stopOpacity={0.95} />
                    <stop offset="100%" stopColor={COLORS.navy} stopOpacity={0.15} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F7" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: COLORS.textMuted }} interval={4} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: COLORS.textMuted }} tickFormatter={(v) => `${Math.round(v / 1000)}K`} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, 'GMV']} labelStyle={{ color: COLORS.navy, fontWeight: '700' }} />
                <Area type="monotone" dataKey="gmv" stroke={COLORS.gold} strokeWidth={2} fill="url(#gmvFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right column: Campus performance + Live operations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: SHADOWS.card }}>
            <h3 style={{ margin: '0 0 20px 0', color: COLORS.navy, fontSize: '16px', fontWeight: '700' }}>Campus performance</h3>
            {campus.map((c, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: '600', color: COLORS.textMain }}>{c.name}</span>
                  <span style={{ color: COLORS.textMuted }}>{c.percent}% of total orders</span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${c.percent}%`, height: '100%', backgroundColor: COLORS.navy, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: SHADOWS.card, flex: 1 }}>
            <h3 style={{ margin: '0 0 16px 0', color: COLORS.navy, fontSize: '16px', fontWeight: '700' }}>Live operations</h3>
            {live.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 0' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, marginTop: '5px', flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: '13px', color: COLORS.textMain }}>{item.text}</div>
                <div style={{ fontSize: '12px', color: COLORS.textMuted, whiteSpace: 'nowrap' }}>{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
