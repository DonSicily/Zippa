import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../utils/colors';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState('processing'); // processing, success, failed

  useEffect(() => {
    // Mock payment processing delay
    const timer = setTimeout(() => {
      setStatus('success');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (status === 'processing') {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.processingText}>Processing your payment...</Text>
      </View>
    );
  }

  if (status === 'success') {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.successCircle}>
          <Ionicons name="checkmark" size={50} color="#FFF" />
        </View>
        <Text style={styles.successTitle}>Payment Successful! 🎉</Text>
        <Text style={styles.successSub}>Your drip is on the way. Check your orders for tracking.</Text>
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}>
            <Text style={styles.secondaryText}>Back to Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Orders')}>
            <Text style={styles.primaryText}>Track Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  centerContainer: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  processingText: { marginTop: 20, fontSize: 18, fontWeight: '600', color: COLORS.textLight },
  successCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.accent, justifyContent: 'center', alignItems: 'center', marginBottom: 25, shadowColor: COLORS.accent, shadowOpacity: 0.4, shadowRadius: 15, elevation: 8 },
  successTitle: { fontSize: 26, fontWeight: '900', color: COLORS.textDark, textAlign: 'center', marginBottom: 10 },
  successSub: { fontSize: 16, color: COLORS.textLight, textAlign: 'center', lineHeight: 24, marginBottom: 40 },
  btnRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
  secondaryBtn: { flex: 1, backgroundColor: '#FFF', paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginRight: 10, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  secondaryText: { color: COLORS.textDark, fontWeight: 'bold', fontSize: 16 },
  primaryBtn: { flex: 1, backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginLeft: 10, shadowColor: COLORS.primary, shadowOpacity: 0.3, elevation: 5 },
  primaryText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});

export default PaymentScreen;
