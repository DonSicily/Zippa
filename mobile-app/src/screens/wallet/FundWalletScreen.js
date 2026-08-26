import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import PaystackWebView from '../../components/payment/PaystackWebView';
import { fundWallet } from '../../services/walletService';
import { COLORS } from '../../utils/colors';

const FundWalletScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [showPaystack, setShowPaystack] = useState(false);
  const [reference, setReference] = useState('');

  const quickAmounts = [500, 1000, 2000, 5000];

  const handleFund = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount < 100) {
      Alert.alert('Invalid Amount', 'Please enter at least 100');
      return;
    }

    const ref = `BSTZ-WALLET-${Date.now()}`;
    setReference(ref);
    setShowPaystack(true);
  };

  const handlePaymentSuccess = async (res) => {
    setShowPaystack(false);
    try {
      await fundWallet({ amount: parseFloat(amount), reference: res.reference });
      Alert.alert('Success!', 'Your wallet has been funded successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Payment successful but wallet update failed. Contact support.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Funds</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Enter Amount</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.nairaSign}>₦</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor={COLORS.textLight}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.label}>Quick Select</Text>
        <View style={styles.quickGrid}>
          {quickAmounts.map((val) => (
            <TouchableOpacity 
              key={val} 
              style={[styles.quickBtn, amount === val.toString() && styles.activeQuickBtn]}
              onPress={() => setAmount(val.toString())}
            >
              <Text style={[styles.quickText, amount === val.toString() && styles.activeQuickText]}>
                ₦{val.toLocaleString()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.fundBtn} onPress={handleFund}>
          <Text style={styles.fundText}>Fund Wallet with Paystack</Text>
          <Ionicons name="lock-closed" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>

      <PaystackWebView
        visible={showPaystack}
        amount={parseFloat(amount)}
        email={user?.email}
        reference={reference}
        onSuccess={handlePaymentSuccess}
        onClose={() => setShowPaystack(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textDark },
  content: { padding: 20 },
  label: { fontSize: 14, fontWeight: '700', color: COLORS.textDark, marginBottom: 10, marginTop: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 20, paddingHorizontal: 20, height: 70, shadowColor: '#000', shadowOpacity: 0.05, elevation: 3 },
  nairaSign: { fontSize: 32, fontWeight: '900', color: COLORS.textDark, marginRight: 10 },
  input: { flex: 1, fontSize: 32, fontWeight: '900', color: COLORS.textDark },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  quickBtn: { flex: 1, minWidth: '45%', backgroundColor: '#FFF', paddingVertical: 16, borderRadius: 16, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  activeQuickBtn: { backgroundColor: COLORS.primary, shadowColor: COLORS.primary, shadowOpacity: 0.2 },
  quickText: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  activeQuickText: { color: '#FFF' },
  fundBtn: { flexDirection: 'row', backgroundColor: COLORS.primary, paddingVertical: 18, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 40, shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  fundText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginRight: 10 },
});

export default FundWalletScreen;
