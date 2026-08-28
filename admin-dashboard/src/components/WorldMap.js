import React from 'react';
import { COLORS } from '../utils/colors';

// Stylized China → Lagos shipment route visualization with legend.
const WorldMap = ({ height = 280 }) => (
  <div style={{ position: 'relative', height, backgroundColor: '#F8FAFC', borderRadius: '8px', overflow: 'hidden' }}>
    <svg viewBox="0 0 600 280" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
      {/* Route arcs */}
      <path d="M465 115 Q 330 30 165 105" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="5 5" />
      <path d="M465 115 Q 380 200 300 165" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="5 5" />
      <path d="M300 165 Q 230 120 165 105" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="5 5" />
      {/* In-transit nodes */}
      <circle cx="165" cy="105" r="5" fill="#CBD5E1" />
      <circle cx="330" cy="80" r="4" fill="#CBD5E1" />
      {/* Hubs */}
      <circle cx="465" cy="115" r="7" fill={COLORS.navy} />
      <circle cx="300" cy="165" r="7" fill={COLORS.gold} />
    </svg>

    {/* Legend */}
    <div style={{ position: 'absolute', right: '12px', bottom: '12px', backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: '8px', padding: '10px 12px', fontSize: '12px', color: COLORS.textMain }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS.navy }} /> China Hub
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS.gold }} /> Lagos Hub
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#CBD5E1' }} /> In Transit
      </div>
    </div>
  </div>
);

export default WorldMap;
