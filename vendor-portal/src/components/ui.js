// vendor-portal/src/components/ui.js
import React, { useState } from 'react';
import { COLORS } from '../utils/colors';

// 1. Base Card Wrapper
export const Card = ({ children, style }) => (
  <div style={{
    backgroundColor: COLORS.white,
    borderRadius: '16px',
    padding: '24px',
    boxShadow: COLORS.shadow,
    border: `1px solid ${COLORS.border}`,
    ...style
  }}>
    {children}
  </div>
);

// 2. Status Pill (Auto-maps status strings to design tokens)
export const StatusPill = ({ status }) => {
  const map = {
    'Approved':       { label: 'Live',         bg: COLORS.successBg, text: COLORS.success },
    'Live':           { label: 'Live',         bg: COLORS.successBg, text: COLORS.success },
    'Pending Review': { label: 'Pending QC',   bg: COLORS.warningBg, text: COLORS.warning },
    'Pending':        { label: 'Pending',      bg: COLORS.warningBg, text: COLORS.warning },
    'Out of Stock':   { label: 'Out of Stock', bg: COLORS.dangerBg,  text: COLORS.danger },
    'Shipped to Hub': { label: 'Shipped to Hub', bg: COLORS.infoBg,  text: COLORS.info },
    'Completed':      { label: 'Completed',    bg: COLORS.successBg, text: COLORS.success },
    'Resolved':       { label: 'Resolved',     bg: COLORS.successBg, text: COLORS.success },
  };
  const s = map[status] || { label: status, bg: COLORS.cream, text: COLORS.textSecondary };
  return (
    <span style={{
      padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: '700',
      backgroundColor: s.bg, color: s.text, whiteSpace: 'nowrap'
    }}>
      {s.label}
    </span>
  );
};

// 3. KPI Stat Card (For Dashboard / Analytics)
export const KpiCard = ({ title, value, subtext, delta, icon }) => (
  <Card style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ color: COLORS.textSecondary, fontSize: '13px', fontWeight: 500 }}>{title}</div>
      {icon && <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: COLORS.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{icon}</div>}
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
      <div style={{ color: COLORS.navy, fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>{value}</div>
      {delta && (
        <div style={{
          fontSize: '12px', fontWeight: '600',
          color: delta.startsWith('+') ? COLORS.success : COLORS.danger,
          backgroundColor: delta.startsWith('+') ? COLORS.successBg : COLORS.dangerBg,
          padding: '2px 8px', borderRadius: '12px'
        }}>
          {delta}
        </div>
      )}
    </div>
    {subtext && <div style={{ color: COLORS.textMuted, fontSize: '12px' }}>{subtext}</div>}
  </Card>
);

// 4. Tab Bar with Gold Underline
export const TabBar = ({ tabs, activeTab, onChange }) => (
  <div style={{ display: 'flex', gap: '28px', borderBottom: `1px solid ${COLORS.border}`, marginBottom: '8px' }}>
    {tabs.map((tab) => {
      const isActive = activeTab === tab.key;
      return (
        <div key={tab.key} onClick={() => onChange(tab.key)} style={{
          padding: '12px 2px', cursor: 'pointer', fontSize: '14px',
          fontWeight: isActive ? '700' : '500',
          color: isActive ? COLORS.navy : COLORS.textSecondary,
          borderBottom: isActive ? `3px solid ${COLORS.gold}` : '3px solid transparent',
          marginBottom: '-1px', transition: 'all 0.2s ease',
        }}>
          {tab.label} {tab.count !== undefined && `(${tab.count})`}
        </div>
      );
    })}
  </div>
);

// 5. Progress Bar (For Store Performance)
export const ProgressBar = ({ label, value, color = COLORS.success }) => (
  <div style={{ marginBottom: '20px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <span style={{ fontSize: '13px', color: COLORS.textSecondary }}>{label}</span>
      <span style={{ fontSize: '13px', fontWeight: '600', color: COLORS.navy }}>{value}</span>
    </div>
    <div style={{ height: '6px', backgroundColor: COLORS.cream, borderRadius: '3px', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: value, backgroundColor: color, borderRadius: '3px', transition: 'width 0.5s ease' }}></div>
    </div>
  </div>
);

// 6. Buttons
export const Button = ({ children, variant = 'primary', onClick, style, ...props }) => {
  const base = {
    border: 'none', padding: '12px 24px', borderRadius: '12px',
    fontWeight: '600', fontSize: '14px', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    transition: 'all 0.2s ease'
  };
  const variants = {
    primary: { backgroundColor: COLORS.coral, color: COLORS.white, boxShadow: '0 4px 12px rgba(241, 96, 46, 0.25)' },
    secondary: { backgroundColor: COLORS.navy, color: COLORS.white },
    ghost: { backgroundColor: 'transparent', color: COLORS.textSecondary, border: `1px solid ${COLORS.border}` }
  };
  return <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }} {...props}>{children}</button>;
};

// 7. Inputs with Gold Focus Rings
export const Input = ({ label, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: COLORS.textSecondary, fontSize: '13px' }}>{label}</label>}
      <input
        {...props}
        onFocus={(e) => { setFocused(true); props.onFocus && props.onFocus(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur && props.onBlur(e); }}
        style={{
          width: '100%', padding: '12px 16px', borderRadius: '10px',
          border: `1px solid ${focused ? COLORS.gold : COLORS.border}`,
          fontSize: '14px', boxSizing: 'border-box', outline: 'none',
          backgroundColor: COLORS.white, transition: 'border-color 0.2s ease',
          fontFamily: 'inherit', color: COLORS.textPrimary,
          ...props.style
        }}
      />
    </div>
  );
};

// 8. Section Header with Accent Bar
export const SectionHeader = ({ color = COLORS.coral, children }) => (
  <h3 style={{ color: COLORS.navy, margin: '0 0 20px 0', fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
    <span style={{ width: '4px', height: '18px', backgroundColor: color, borderRadius: '2px' }}></span>
    {children}
  </h3>
);
