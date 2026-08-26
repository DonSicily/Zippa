import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../utils/colors';

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
      { text: 'OK', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Home' }] }) }
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
      </TouchableOpacity>

      <View style={styles.iconCircle}>
        <Ionicons name="chatbubble-ellipses-outline" size={40} color={COLORS.primary} />
      </View>

      <Text style={styles.title}>Verify your email</Text>
      <Text style={styles.subtitle}>We sent a 6-digit code to {email || 'your email'}</Text>

      <TextInput
        style={styles.otpInput}
        placeholder="- - - - - -"
        placeholderTextColor={COLORS.textLight}
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        textAlign="center"
      />

      <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify}>
        <Text style={styles.verifyBtnText}>Verify Code</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resendBtn}>
        <Text style={styles.resendText}>Didn't get it? Resend code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 25, paddingTop: 60, alignItems: 'center' },
  backBtn: { position: 'absolute', top: 60, left: 25, width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E0D4FC', justifyContent: 'center', alignItems: 'center', marginTop: 40, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '900', color: COLORS.textDark, marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: COLORS.textLight, textAlign: 'center', marginBottom: 40, paddingHorizontal: 20 },
  otpInput: { width: '100%', height: 60, backgroundColor: '#FFF', borderRadius: 16, fontSize: 24, fontWeight: 'bold', color: COLORS.textDark, letterSpacing: 10, shadowColor: '#000', shadowOpacity: 0.05, elevation: 3, marginBottom: 30 },
  verifyBtn: { width: '100%', height: 55, backgroundColor: COLORS.primary, borderRadius: 16, justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  verifyBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  resendBtn: { marginTop: 20 },
  resendText: { color: COLORS.primary, fontWeight: '600' },
});

export default OTPScreen;
