// ─── Bestiez Design System v2 ────────────────────────────────────────────
// Premium campus-commerce language extracted from the approved design pack:
// warm ivory canvas · deep navy ink · vibrant orange CTAs · antique gold
// highlights · hairline borders · soft low shadows · 12–24px radii.
export const COLORS = {
  // Brand
  navy: '#0E2A47',
  navySoft: '#16334F',
  orange: '#F2633A',
  orangeDark: '#D9532B',
  orangeSoft: '#FDE9E2',
  gold: '#C09A3E',
  goldSoft: '#F5EAD3',

  // Canvas
  background: '#F6F1E8',
  surface: '#FFFFFF',
  surfaceSoft: '#FBF9F4',
  imageBg: '#EFE8DC',
  chipBg: '#ECEAE4',

  // Text
  textDark: '#10243E',
  textLight: '#6E7683',
  textMuted: '#9AA1AC',
  white: '#FFFFFF',

  // Status
  success: '#2E9E63',
  successSoft: '#DCEFDF',
  error: '#D64545',
  errorSoft: '#FBE7E7',
  warning: '#C09A3E',

  // Borders & shadows
  border: '#E8E1D5',
  borderLight: '#F0EBE1',
  shadow: 'rgba(16,36,62,0.08)',
  shadowLight: 'rgba(16,36,62,0.04)',

  // Legacy aliases — keeps not-yet-redesigned screens functional & on-brand
  primary: '#F2633A',
  primaryDark: '#D9532B',
  primaryLight: '#F58B6C',
  accent: '#2E9E63',
  accentDark: '#25824F',
  highlight: '#C09A3E',
  highlightDark: '#A98634',
  cardBg: '#FFFFFF',
  info: '#0E2A47',
};

export const RADIUS = { sm: 10, md: 12, lg: 16, xl: 20, sheet: 24, pill: 999 };

export const SHADOW = {
  card: { shadowColor: '#10243E', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  bar: { shadowColor: '#10243E', shadowOpacity: 0.07, shadowRadius: 14, shadowOffset: { width: 0, height: -2 }, elevation: 8 },
  glowOrange: { shadowColor: '#F2633A', shadowOpacity: 0.25, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  glowGold: { shadowColor: '#C09A3E', shadowOpacity: 0.45, shadowRadius: 10, shadowOffset: { width: 0, height: 0 }, elevation: 4 },
};

// Reusable card surface (white, hairline border, soft shadow)
export const CARD = {
  backgroundColor: COLORS.surface,
  borderRadius: RADIUS.lg,
  borderWidth: 1,
  borderColor: COLORS.borderLight,
  ...SHADOW.card,
};

export const GRADIENTS = {
  primary: ['#0E2A47', '#16334F'],
  warm: ['#F2633A', '#C09A3E'],
};
