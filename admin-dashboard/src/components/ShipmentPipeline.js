import React from 'react';
import { ArrowRight } from 'lucide-react';
import { COLORS, SHADOWS } from '../utils/colors';

// 5-stage horizontal logistics flow:
// Confirmed → China Hub → SPEEDAF Transit → Customs (Lagos) → Campus Pickup
const ShipmentPipeline = ({ pipeline }) => (
  <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
    {pipeline.map((step, idx) => (
      <React.Fragment key={idx}>
        <div style={{ flex: 1, backgroundColor: COLORS.white, padding: '16px', borderRadius: '8px', boxShadow: SHADOWS.card, borderLeft: `4px solid ${step.color}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: step.color }} />
            <span style={{ color: COLORS.textMuted, fontSize: '12px', fontWeight: '600' }}>{step.stage}</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: step.color === COLORS.gold ? '#92400E' : step.color }}>{step.count}</div>
          <div style={{ color: COLORS.textMuted, fontSize: '12px', marginTop: '2px' }}>{step.stage}</div>
        </div>
        {idx < pipeline.length - 1 && <ArrowRight size={18} color={COLORS.textMuted} style={{ flexShrink: 0 }} />}
      </React.Fragment>
    ))}
  </div>
);

export default ShipmentPipeline;
