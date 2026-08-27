import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';
import { COLORS, CARD, RADIUS } from '../../utils/colors';
import Button from '../../components/common/Button';

const CartScreen = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigation = useNavigation();

  const shippingFee = 1500;
  const serviceFee = Math.round(cartTotal * 0.02);
  const grandTotal = cartTotal + shippingFee + serviceFee;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart is empty', 'Add some fresh drops first!');
      return;
    }
    navigation.navigate('Checkout');
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <Ionicons name="bag-handle-outline" size={40} color={COLORS.navy} />
        </View>
        <Text style={styles.emptyTitle}>Your cart is feeling lonely</Text>
        <Text style={styles.emptySub}>Go add some heat to your stash!</Text>
        <Button title="Start Shopping" onPress={() => navigation.navigate('Home')} style={{ marginTop: 10 }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Stash</Text>
        <Text style={styles.itemCount}>{cartItems.length} items</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        {cartItems.map((item) => (
          <View key={item.product._id || item.product.id} style={styles.cartItem}>
            <View style={styles.itemImage}>
              <Ionicons name="shirt-outline" size={28} color={COLORS.navy} />
            </View>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName} numberOfLines={1}>{item.product.name}</Text>
              <Text style={styles.itemPrice}>₦{item.product.price.toLocaleString()}</Text>
              <View style={styles.qtyControls}>
                <TouchableOpacity onPress={() => updateQuantity(item.product._id || item.product.id, item.quantity - 1)} style={styles.qtyBtn}>
                  <Ionicons name="remove" size={14} color={COLORS.navy} />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.product._id || item.product.id, item.quantity + 1)} style={styles.qtyBtn}>
                  <Ionicons name="add" size={14} color={COLORS.navy} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.product._id || item.product.id)} style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={20} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.summaryValue}>₦{cartTotal.toLocaleString()}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Shipping</Text><Text style={styles.summaryValue}>₦{shippingFee.toLocaleString()}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Service Fee</Text><Text style={styles.summaryValue}>₦{serviceFee.toLocaleString()}</Text></View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₦{grandTotal.toLocaleString()}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.barLabel}>Total</Text>
          <Text style={styles.barTotal}>₦{grandTotal.toLocaleString()}</Text>
        </View>
        <Button title={`Checkout`} onPress={handleCheckout} style={styles.checkoutBtn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 55 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background, paddingHorizontal: 40 },
  emptyIcon: { width: 88, height: 88, borderRadius: 44, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.borderLight, justifyContent: 'center', alignItems: 'center', marginBottom: 18 },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: COLORS.navy, textAlign: 'center' },
  emptySub: { fontSize: 14, color: COLORS.textLight, textAlign: 'center', marginBottom: 24 },
  header: { paddingHorizontal: 20, marginBottom: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 26, fontWeight: '800', color: COLORS.navy },
  itemCount: { fontSize: 13, color: COLORS.textLight, fontWeight: '600' },
  cartItem: { ...CARD, flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 12, padding: 14 },
  itemImage: { width: 68, height: 68, backgroundColor: COLORS.imageBg, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 15, fontWeight: '700', color: COLORS.navy, marginBottom: 4 },
  itemPrice: { fontSize: 15, fontWeight: '800', color: COLORS.navy, marginBottom: 8 },
  qtyControls: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.chipBg, justifyContent: 'center', alignItems: 'center' },
  qtyText: { fontSize: 14, fontWeight: '700', color: COLORS.navy, marginHorizontal: 12 },
  deleteBtn: { padding: 8 },
  summaryCard: { ...CARD, margin: 20, padding: 18 },
  summaryTitle: { fontSize: 16, fontWeight: '800', color: COLORS.navy, marginBottom: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 14, color: COLORS.textLight },
  summaryValue: { fontSize: 14, fontWeight: '600', color: COLORS.textDark },
  totalRow: { borderTopWidth: 1, borderTopColor: COLORS.borderLight, paddingTop: 12, marginTop: 4, marginBottom: 0 },
  totalLabel: { fontSize: 16, fontWeight: '800', color: COLORS.navy },
  totalValue: { fontSize: 18, fontWeight: '900', color: COLORS.navy },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: COLORS.borderLight, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 30 },
  barLabel: { fontSize: 12, color: COLORS.textLight },
  barTotal: { fontSize: 20, fontWeight: '900', color: COLORS.navy },
  checkoutBtn: { minWidth: 180 },
});

export default CartScreen;
