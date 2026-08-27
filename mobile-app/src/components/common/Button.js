import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, RADIUS, SHADOW } from '../../utils/colors';

// v2 Button — primary: solid orange · navy: solid navy · outline: navy line · text: orange link
const Button = ({
  title, onPress, variant = 'primary', loading = false,
  disabled = false, fullWidth = false, small = false, style,
}) => {
  const btn = [styles.base, small && styles.small];
  const txt = [styles.text];

  if (variant === 'navy') btn.push(styles.navy);
  if (variant === 'outline') { btn.push(styles.outline); txt.push(styles.outlineText); }
  if (variant === 'text') { btn.push(styles.textBtn); txt.push(styles.textBtnLabel); }
  if (fullWidth) btn.push(styles.fullWidth);
  if (disabled || loading) btn.push(styles.disabled);

  return (
    <TouchableOpacity
      style={[btn, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator size="small" color={(variant === 'outline' || variant === 'text') ? COLORS.navy : '#FFF'} />
      ) : (
        <Text style={txt}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.orange,
    paddingVertical: 16, paddingHorizontal: 24,
    borderRadius: RADIUS.md + 2,
    alignItems: 'center', justifyContent: 'center',
    ...SHADOW.glowOrange,
  },
  small: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: RADIUS.pill },
  navy: { backgroundColor: COLORS.navy, shadowColor: COLORS.navy, shadowOpacity: 0.2 },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: COLORS.navy, shadowOpacity: 0, elevation: 0 },
  textBtn: { backgroundColor: 'transparent', shadowOpacity: 0, elevation: 0, paddingVertical: 4, paddingHorizontal: 0 },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.55, shadowOpacity: 0, elevation: 0 },
  text: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  outlineText: { color: COLORS.navy },
  textBtnLabel: { color: COLORS.orange, fontSize: 14, fontWeight: '700' },
});

export default Button;
