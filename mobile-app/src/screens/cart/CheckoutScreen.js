import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../utils/colors';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('card');

  const addresses = [
    { id: 1, title: 'UNILAG Campus Hub', desc: 'Faculty of Engineering, Near Main Gate' },
    { id: 2, title: 'Home Address', desc: '12 Adeola Odeku, Victoria Island' },
  ];

  const payments = [
    { id: 'card', title: 'Debit/Credit Card', icon: 'card-outline' },
    { id: 'transfer', title: 'Bank Transfer', icon: 'business-outline' },
    { id: 'ussd', title: 'USSD Code', icon: 'phone-portrait-outline' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={COLORS.textDark} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Point 📍</Text>
          {addresses.map((addr) => (
            <TouchableOpacity 
              key={addr.id} 
              style={[styles.optionCard, selectedAddress === addr.id && styles.selectedCard]}
              onPress={() => setSelectedAddress(addr.id)}
            >
              <View style={styles.radioOuter}>
                {selectedAddress === addr.id && <View style={styles.radioInner} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.optionTitle}>{addr.title}</Text>
                <Text style={styles.optionDesc}>{addr.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method 💳</Text>
          {payments.map((pay) => (
            <TouchableOpacity 
              key={pay.id} 
              style={[styles.optionCard, selectedPayment === pay.id && styles.selectedCard]}
              onPress={() => setSelectedPayment(pay.id)}
            >
              <Ionicons name={pay.icon} size={24} color={selectedPayment === pay.id ? COLORS.primary : COLORS.textLight} />
              <Text style={[styles.optionTitle, { marginLeft: 15, flex: 1 }]}>{pay.title}</Text>
              <View style={styles.radioOuter}>
                {selectedPayment === pay.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomAction}>
        <TouchableOpacity style={styles.payBtn} onPress={() => navigation.navigate('Payment')}>
          <Text style={styles.payText}>Pay ₦14,000</Text>
          <Ionicons name="lock-closed" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textDark },
  section: { paddingHorizontal: 20, marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textDark, marginBottom: 15 },
  optionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 18, borderRadius: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  selectedCard: { borderWidth: 2, borderColor: COLORS.primary },
  radioOuter: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.textLight, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary },
  optionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  optionDesc: { fontSize: 14, color: COLORS.textLight, marginTop: 4 },
  bottomAction: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 15, elevation: 10 },
  payBtn: { flexDirection: 'row', backgroundColor: COLORS.primary, paddingVertical: 18, borderRadius: 20, justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  payText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginRight: 10 },
});

export default CheckoutScreen;
