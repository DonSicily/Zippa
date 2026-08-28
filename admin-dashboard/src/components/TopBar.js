import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { COLORS, SHADOWS } from '../utils/colors';

const RANGES = [
  { id: '7d', label: 'Last 7 days' },
  { id: '30d', label: 'Last 30 days' },
  { id: '90d', label: 'Last 90 days' },
];

const TopBar = () => {
  const [rangeOpen, setRangeOpen] = useState(false);
  const dateRange = useAdminStore((s) => s.dateRange);
  const setDateRange = useAdminStore((s) => s.setDateRange);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const today = new Date().toLocaleDateString('en-NG', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const activeRange = RANGES.find((r) => r.id === dateRange) || RANGES[1];

  return (
    <div style={{ padding: '24px 32px 16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <h1 style={{ color: COLORS.navy, margin: 0, fontSize: '28px', fontWeight: '700' }}>{greeting}, Daniel</h1>
        <p style={{ color: COLORS.textMuted, margin: '4px 0 0 0', fontSize: '14px' }}>{today} · Lagos</p>
      </div>

      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setRangeOpen(!rangeOpen)}
          style={{ backgroundColor: COLORS.navy, color: COLORS.white, border: 'none', padding: '10px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
        >
          <Calendar size={16} /> {activeRange.label} <ChevronDown size={14} />
        </button>
        {rangeOpen && (
          <div style={{ position: 'absolute', right: 0, top: '44px', backgroundColor: COLORS.white, borderRadius: '8px', boxShadow: SHADOWS.modal, border: `1px solid ${COLORS.border}`, overflow: 'hidden', zIndex: 50, minWidth: '150px' }}>
            {RANGES.map((r) => (
              <div
                key={r.id}
                onClick={() => { setDateRange(r.id); setRangeOpen(false); }}
                style={{ padding: '10px 16px', fontSize: '13px', cursor: 'pointer', backgroundColor: r.id === dateRange ? COLORS.cream : COLORS.white, color: COLORS.textMain, fontWeight: r.id === dateRange ? '600' : '400' }}
              >
                {r.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
