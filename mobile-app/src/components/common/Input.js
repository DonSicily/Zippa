import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../../utils/colors';

// v2 Input — white field, hairline border, 12px radius, muted left icon
const Input = ({ icon, placeholder, value, onChangeText, secure = false, keyboard = 'default', rightSlot, style }) => (
  <View style={[styles.wrap, style]}>
    {icon ? <Ionicons name={icon} size={20} color={COLORS.textMuted} style={styles.icon} /> : null}
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={COLORS.textMuted}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secure}
      keyboardType={keyboard}
      autoCapitalize="none"
    />
    {rightSlot}
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1, borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    height: 54, paddingHorizontal: 14,
    marginBottom: 14,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, fontWeight: '600', color: COLORS.textDark },
});

export default Input;
