import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/colors';

const Input = ({ 
  label, placeholder, value, onChangeText, icon, secureTextEntry = false, error, keyboardType = 'default' 
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.errorBorder]}>
        {icon && <Ionicons name={icon} size={20} color={COLORS.textLight} style={styles.icon} />}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textLight}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '700', color: COLORS.textDark, marginBottom: 8 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    borderRadius: 16, paddingHorizontal: 15, height: 55,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10, elevation: 2,
    borderWidth: 1, borderColor: 'transparent',
  },
  errorBorder: { borderColor: COLORS.error },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: COLORS.textDark, paddingVertical: 10 },
  errorText: { color: COLORS.error, fontSize: 12, marginTop: 4, marginLeft: 4 },
});

export default Input;
