import React from 'react';
import { COLORS } from '../utils/colors';

// Circular progress indicator for Quality Gate scores.
// 90+ = green, 70–89 = amber, <70 = red.
const QualityScoreRing = ({ score, size = 40, strokeWidth = 3 }) => {
  const center = size / 2;
  const radius = center - strokeWidth - 1;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  const color = score >= 90 ? COLORS.success : score >= 70 ? COLORS.warning : COLORS.danger;

  return (
    <svg width={size} height={size}>
      <circle cx={center} cy={center} r={radius} fill="none" stroke="#F1F5F9" strokeWidth={strokeWidth} />
      <circle
        cx={center} cy={center} r={radius} fill="none"
        stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
      />
      <text x={center} y={center} fill={color} fontSize={size * 0.28} fontWeight="700" textAnchor="middle" dy=".3em">
        {score}
      </text>
    </svg>
  );
};

export default QualityScoreRing;
