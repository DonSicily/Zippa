import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';
import { COLORS } from '../../utils/colors';

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
        <Ionicons name="cart-outline" size={80} color={COLORS.textLight} />
        <Text style={styles.emptyTitle}>Your cart is feeling lonely</Text>
        <Text style={styles.emptySub}>Go add some heat to your stash!</Text>
        <TouchableOpacity style={styles.browseBtn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.browseText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Stash </Text>
        <Text style={styles.itemCount}>{cartItems.length} items</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 250 }}>
        {cartItems.map((item) => (
          <View key={item.product._id || item.product.id} style={styles.cartItem}>
            <View style={styles.itemImage}>
              <Ionicons name="shirt-outline" size={30} color={COLORS.primary} />
            </View>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.product.name}</Text>
              <Text style={styles.itemPrice}>₦{item.product.price.toLocaleString()}</Text>
              <View style={styles.qtyControls}>
                <TouchableOpacity onPress={() => updateQuantity(item.product._id || item.product.id, item.quantity - 1)} style={styles.qtyBtn}>
                  <Ionicons name="remove" size={16} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.product._id || item.product.id, item.quantity + 1)} style={styles.qtyBtn}>
                  <Ionicons name="add" size={16} color={COLORS.textDark} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.product._id || item.product.id)} style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={20} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.summaryValue}>{cartTotal.toLocaleString()}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Shipping</Text><Text style={styles.summaryValue}>₦{shippingFee.toLocaleString()}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Service Fee</Text><Text style={styles.summaryValue}>₦{serviceFee.toLocaleString()}</Text></View>
          <View style={[styles.summaryRow, styles.totalRow]}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>₦{grandTotal.toLocaleString()}</Text></View>
        </View>
      </ScrollView>

      {/* Sticky Checkout Button */}
      <View style={styles.bottomAction}>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Checkout • ₦{grandTotal.toLocaleString()}</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 50 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background, paddingHorizontal: 40 },
  emptyTitle: { fontSize: 22, fontWeight: '900', color: COLORS.textDark, marginTop: 20, textAlign: 'center' },
  emptySub: { fontSize: 16, color: COLORS.textLight, textAlign: 'center', marginBottom: 30 },
  browseBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 20 },
  browseText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  header: { paddingHorizontal: 20, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '900', color: COLORS.textDark },
  itemCount: { fontSize: 14, color: COLORS.textLight, fontWeight: '600' },
  cartItem: { flexDirection: 'row', backgroundColor: '#FFF', marginHorizontal: 20, marginBottom: 15, padding: 15, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2, alignItems: 'center' },
  itemImage: { width: 70, height: 70, backgroundColor: '#F0F0F0', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: '700', color: COLORS.textDark, marginBottom: 5 },
  itemPrice: { fontSize: 15, fontWeight: '800', color: COLORS.primary, marginBottom: 10 },
  qtyControls: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 28, height: 28, borderRadius: 8, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' },
  qtyText: { fontSize: 14, fontWeight: 'bold', color: COLORS.textDark, marginHorizontal: 12 },
  deleteBtn: { padding: 10 },
  summaryCard: { backgroundColor: '#FFF', margin: 20, padding: 20, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  summaryTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textDark, marginBottom: 15 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { fontSize: 15, color: COLORS.textLight },
  summaryValue: { fontSize: 15, fontWeight: '600', color: COLORS.textDark },
  totalRow: { borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 15, marginTop: 5 },
  totalLabel: { fontSize: 18, fontWeight: '900', color: COLORS.textDark },
  totalValue: { fontSize: 20, fontWeight: '900', color: COLORS.primary },
  bottomAction: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 15, elevation: 10 },
  checkoutBtn: { flexDirection: 'row', backgroundColor: COLORS.primary, paddingVertical: 18, borderRadius: 20, justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  checkoutText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginRight: 10 },
});

export default CartScreen;
