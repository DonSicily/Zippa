import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../../utils/colors';

const Button = ({ 
  title, onPress, variant = 'primary', loading = false, disabled = false, fullWidth = false, style 
}) => {
  const getButtonStyle = () => {
    let baseStyle = styles.button;
    if (variant === 'secondary') baseStyle = [baseStyle, styles.secondaryButton];
    if (variant === 'outline') baseStyle = [baseStyle, styles.outlineButton];
    if (fullWidth) baseStyle = [baseStyle, styles.fullWidth];
    if (disabled || loading) baseStyle = [baseStyle, styles.disabledButton];
    return baseStyle;
  };

  const getTextStyle = () => {
    let baseStyle = styles.buttonText;
    if (variant === 'secondary') baseStyle = styles.secondaryText;
    if (variant === 'outline') baseStyle = styles.outlineText;
    if (disabled || loading) baseStyle = [baseStyle, styles.disabledText];
    return baseStyle;
  };

  return (
    <TouchableOpacity 
      style={[getButtonStyle(), style]} 
      onPress={onPress} 
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'outline' ? COLORS.primary : '#FFF'} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: COLORS.accent,
    shadowColor: COLORS.accent,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  fullWidth: { width: '100%' },
  disabledButton: { opacity: 0.6, shadowOpacity: 0, elevation: 0 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  secondaryText: { color: COLORS.textDark },
  outlineText: { color: COLORS.primary },
  disabledText: { color: '#FFF' },
});

export default Button;
