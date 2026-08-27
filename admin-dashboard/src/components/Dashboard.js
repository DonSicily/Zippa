import React from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { COLORS } from '../utils/colors';

const Dashboard = () => {
  const kpis = [
    { label: 'Total GMV', value: '$284,500', trend: '+18%', icon: <TrendingUp size={16} color={COLORS.success} />, bg: COLORS.successBg },
    { label: 'Active Vendors', value: '24', trend: '+18%', icon: <TrendingUp size={16} color={COLORS.success} />, bg: COLORS.successBg },
    { label: 'Pending QC', value: '12', trend: null, icon: <AlertTriangle size={16} color={COLORS.warning} />, bg: COLORS.warningBg },
    { label: 'Active Campuses', value: '4', trend: '+18%', icon: <TrendingUp size={16} color={COLORS.success} />, bg: COLORS.successBg },
  ];

  const campusData = [
    { name: 'UNILAG', percent: 35, color: COLORS.navy },
    { name: 'OAU', percent: 25, color: COLORS.navy },
    { name: 'UI', percent: 20, color: COLORS.navy },
    { name: 'UNN', percent: 20, color: COLORS.navy },
  ];

  return (
    <div>
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        {kpis.map((kpi, i) => (
          <div key={i} style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: SHADOWS.card }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{ color: COLORS.textMuted, fontSize: '14px' }}>{kpi.label}</span>
              <div style={{ backgroundColor: kpi.bg, padding: '6px', borderRadius: '50%' }}>{kpi.icon}</div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: COLORS.navy, marginBottom: '8px' }}>{kpi.value}</div>
            {kpi.trend && <span style={{ backgroundColor: COLORS.successBg, color: COLORS.success, padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>{kpi.trend}</span>}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* GMV Chart Placeholder */}
        <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: SHADOWS.card }}>
          <h3 style={{ margin: '0 0 20px 0', color: COLORS.navy, fontSize: '16px' }}>GMV · Last 30 days</h3>
          <div style={{ height: '250px', backgroundColor: '#F8FAFC', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.textMuted }}>
            [Area Chart Visualization - Integrate Recharts Here]
          </div>
        </div>

        {/* Campus Performance */}
        <div style={{ backgroundColor: COLORS.white, padding: '24px', borderRadius: '12px', boxShadow: SHADOWS.card }}>
          <h3 style={{ margin: '0 0 20px 0', color: COLORS.navy, fontSize: '16px' }}>Campus performance</h3>
          {campusData.map((c, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ fontWeight: '600', color: COLORS.textMain }}>{c.name}</span>
                <span style={{ color: COLORS.textMuted }}>{c.percent}% of total orders</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${c.percent}%`, height: '100%', backgroundColor: c.color, borderRadius: '4px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
