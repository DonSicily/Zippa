import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../utils/colors';
import Header from '../../components/layout/Header';
import Button from '../../components/common/Button';

const OTPScreen = () => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};

  const handleVerify = () => {
    if (otp.length < 4) {
      Alert.alert('Invalid OTP', 'Please enter the complete code.');
      return;
    }
    // In production, call API to verify OTP
    Alert.alert('Success!', 'Account verified. Welcome to Bestiez!', [
      { text: 'OK', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Home' }] }) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="" />
      <View style={styles.iconCircle}>
        <Ionicons name="mail-unread-outline" size={36} color={COLORS.orange} />
      </View>
      <Text style={styles.title}>Verify your email</Text>
      <Text style={styles.subtitle}>We sent a 6-digit code to {email || 'your email'}</Text>

      <TextInput
        style={styles.otpInput}
        placeholder="– – – – – –"
        placeholderTextColor={COLORS.textMuted}
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        textAlign="center"
      />

      <Button fullWidth title="Verify Code" onPress={handleVerify} />

      <TouchableOpacity style={styles.resendBtn}>
        <Text style={styles.resendText}>Didn't get it? Resend code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 24, alignItems: 'center' },
  iconCircle: { width: 84, height: 84, borderRadius: 42, backgroundColor: COLORS.orangeSoft, justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 20 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.navy, marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 14, color: COLORS.textLight, textAlign: 'center', marginBottom: 36, paddingHorizontal: 20 },
  otpInput: { width: '100%', height: 60, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, fontSize: 24, fontWeight: '800', color: COLORS.navy, letterSpacing: 10, marginBottom: 24 },
  resendBtn: { marginTop: 22 },
  resendText: { color: COLORS.orange, fontWeight: '700', fontSize: 14 },
});

export default OTPScreen;
