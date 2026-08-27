import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { COLORS, CARD, RADIUS } from '../../utils/colors';
import Header from '../../components/layout/Header';
import Button from '../../components/common/Button';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const { cartItems, cartTotal } = useCart();
  const { user } = useAuth();
  const [shipping, setShipping] = useState('pickup'); // pickup | door
  const [payment, setPayment] = useState('card');     // card | paystack | wallet
  const [promo, setPromo] = useState('');

  const shippingFee = shipping === 'pickup' ? 0 : 1500;
  const serviceFee = Math.round(cartTotal * 0.02);
  const grandTotal = cartTotal + shippingFee + serviceFee;

  const Radio = ({ selected, color }) => (
    <View style={[styles.radio, { borderColor: selected ? color : COLORS.border }]}>
      {selected && <View style={[styles.radioDot, { backgroundColor: color }]} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Checkout" rightIcon="lock-closed-outline" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Delivery */}
        <View style={styles.card}>
          <View style={styles.deliveryRow}>
            <View style={styles.deliveryIcon}>
              <Ionicons name="location-outline" size={20} color={COLORS.navy} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.microLabel}>Delivery to</Text>
              <Text style={styles.deliveryName}>{user?.firstName || 'Tunde'} {user?.lastName || 'Adekunle'}</Text>
              <Text style={styles.deliveryAddress}>Block C, Room 217, UNILAG Main Campus, Lagos</Text>
              <View style={styles.pickupPill}>
                <Ionicons name="checkmark-circle" size={14} color={COLORS.success} />
                <Text style={styles.pickupPillText}>Campus Pickup Available</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Addresses')}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Summary</Text>
          {cartItems.map((item) => (
            <View key={item.product._id || item.product.id} style={styles.lineRow}>
              <View style={styles.lineThumb}>
                <Ionicons name="cube-outline" size={20} color={COLORS.navy} />
              </View>
              <Text style={styles.lineName} numberOfLines={1}>{item.product.name} × {item.quantity}</Text>
              <Text style={styles.linePrice}>₦{(item.product.price * item.quantity).toLocaleString()}</Text>
            </View>
          ))}
        </View>

        {/* Shipping */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Shipping</Text>
          <TouchableOpacity style={styles.radioRow} onPress={() => setShipping('pickup')}>
            <Radio selected={shipping === 'pickup'} color={COLORS.success} />
            <Text style={shipping === 'pickup' ? styles.radioLabelSuccess : styles.radioLabel}>Campus Pickup</Text>
            <Text style={styles.radioSub}> · Free · 5–7 days</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioRow} onPress={() => setShipping('door')}>
            <Radio selected={shipping === 'door'} color={COLORS.success} />
            <Text style={styles.radioLabel}>Door Delivery</Text>
            <Text style={styles.radioSub}> · ₦1,500 · 3–5 days</Text>
          </TouchableOpacity>
        </View>

        {/* Payment method */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Method</Text>
          {[
            { id: 'card', icon: 'card-outline', title: 'Pay with Card', sub: 'Visa ending in 4242' },
            { id: 'paystack', icon: 'layers-outline', title: 'Paystack', sub: 'Mobile Money / Bank Transfer' },
            { id: 'wallet', icon: 'wallet-outline', title: 'Campus Wallet', sub: 'Balance: ₦24,500' },
          ].map((m) => (
            <TouchableOpacity key={m.id} style={[styles.payOption, payment === m.id && styles.payOptionActive]} onPress={() => setPayment(m.id)}>
              <Radio selected={payment === m.id} color={COLORS.navy} />
              <Ionicons name={m.icon} size={22} color={COLORS.navy} style={{ marginRight: 10 }} />
              <View>
                <Text style={styles.payTitle}>{m.title}</Text>
                <Text style={styles.paySub}>{m.sub}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Promo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Promo Code</Text>
          <View style={styles.promoRow}>
            <TextInput style={styles.promoInput} placeholder="Enter promo code" placeholderTextColor={COLORS.textMuted} value={promo} onChangeText={setPromo} autoCapitalize="characters" />
            <Button small title="Apply" style={styles.applyBtn} onPress={() => {}} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.barLabel}>Total</Text>
          <Text style={styles.barTotal}>₦{grandTotal.toLocaleString()}</Text>
        </View>
        <Button title={`Pay ₦${grandTotal.toLocaleString()}`} onPress={() => navigation.navigate('Payment')} style={styles.payBtn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  card: { ...CARD, marginHorizontal: 20, marginBottom: 14, padding: 16 },
  deliveryRow: { flexDirection: 'row' },
  deliveryIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: COLORS.surfaceSoft, borderWidth: 1, borderColor: COLORS.borderLight, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  microLabel: { fontSize: 12, color: COLORS.textLight, marginBottom: 2 },
  deliveryName: { fontSize: 16, fontWeight: '800', color: COLORS.navy },
  deliveryAddress: { fontSize: 13, color: COLORS.textLight, marginTop: 2, marginBottom: 8 },
  pickupPill: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: COLORS.successSoft, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  pickupPillText: { fontSize: 12, fontWeight: '600', color: COLORS.success, marginLeft: 4 },
  changeText: { fontSize: 14, fontWeight: '700', color: COLORS.orange },
  cardTitle: { fontSize: 16, fontWeight: '800', color: COLORS.navy, marginBottom: 12 },
  lineRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  lineThumb: { width: 46, height: 46, borderRadius: 10, backgroundColor: COLORS.imageBg, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  lineName: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.textDark },
  linePrice: { fontSize: 15, fontWeight: '800', color: COLORS.navy },
  radioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
  radioLabel: { fontSize: 14, fontWeight: '700', color: COLORS.navy },
  radioLabelSuccess: { fontSize: 14, fontWeight: '700', color: COLORS.success },
  radioSub: { fontSize: 13, color: COLORS.textLight },
  payOption: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.md, padding: 14, marginBottom: 10, backgroundColor: COLORS.surface },
  payOptionActive: { borderColor: COLORS.navy, backgroundColor: COLORS.surfaceSoft },
  payTitle: { fontSize: 14, fontWeight: '700', color: COLORS.navy },
  paySub: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  promoRow: { flexDirection: 'row', alignItems: 'center' },
  promoInput: { flex: 1, height: 46, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, paddingHorizontal: 12, fontSize: 14, color: COLORS.textDark, marginRight: 10 },
  applyBtn: { backgroundColor: COLORS.gold, shadowOpacity: 0, elevation: 0 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: COLORS.borderLight, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 30 },
  barLabel: { fontSize: 12, color: COLORS.textLight },
  barTotal: { fontSize: 20, fontWeight: '900', color: COLORS.navy },
  payBtn: { minWidth: 180 },
});

export default CheckoutScreen;
