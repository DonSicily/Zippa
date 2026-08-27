import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SHADOW } from '../../utils/colors';
import Button from '../../components/common/Button';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState('processing'); // processing | success | failed

  useEffect(() => {
    const timer = setTimeout(() => setStatus('success'), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (status === 'processing') {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.navy} />
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
          <Button variant="outline" title="Back to Home" style={styles.btn} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })} />
          <Button title="Track Order" style={styles.btn} onPress={() => navigation.navigate('Orders')} />
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  centerContainer: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  processingText: { marginTop: 20, fontSize: 16, fontWeight: '600', color: COLORS.textLight },
  successCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.success, justifyContent: 'center', alignItems: 'center', marginBottom: 25, shadowColor: COLORS.success, shadowOpacity: 0.35, shadowRadius: 15, elevation: 8 },
  successTitle: { fontSize: 24, fontWeight: '800', color: COLORS.navy, textAlign: 'center', marginBottom: 10 },
  successSub: { fontSize: 15, color: COLORS.textLight, textAlign: 'center', lineHeight: 22, marginBottom: 40 },
  btnRow: { flexDirection: 'row', width: '100%' },
  btn: { flex: 1, marginHorizontal: 6 },
});

export default PaymentScreen;
