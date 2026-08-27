import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, CARD } from '../../utils/colors';
import Header from '../../components/layout/Header';

const MOCK_ORDERS = [
  { id: 'BSTZ-8X92A', date: 'Aug 01, 2026', status: 'In Transit', statusColor: COLORS.orange, items: 2, total: 27000 },
  { id: 'BSTZ-7Y81B', date: 'Jul 25, 2026', status: 'Delivered', statusColor: COLORS.success, items: 1, total: 12500 },
  { id: 'BSTZ-6W70C', date: 'Jul 10, 2026', status: 'Delivered', statusColor: COLORS.success, items: 3, total: 45000 },
];

const OrdersScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title="My Orders" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120, paddingTop: 10 }}>
        {MOCK_ORDERS.map((order) => (
          <TouchableOpacity 
            key={order.id} 
            style={styles.orderCard}
            // 👇 THIS IS THE BRIDGE: Navigates to the new Tracking Screen
            onPress={() => navigation.navigate('OrderTracking', { orderId: order.id })}
            activeOpacity={0.9}
          >
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>#{order.id}</Text>
              <View style={[styles.statusBadge, { backgroundColor: order.statusColor + '1A' }]}>
                <View style={[styles.statusDot, { backgroundColor: order.statusColor }]} />
                <Text style={[styles.statusText, { color: order.statusColor }]}>{order.status}</Text>
              </View>
            </View>
            
            <View style={styles.orderDetails}>
              <Text style={styles.orderDate}>{order.date}</Text>
              <Text style={styles.orderItems}>{order.items} items</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.orderFooter}>
              <Text style={styles.orderTotal}>₦{order.total.toLocaleString()}</Text>
              <View style={styles.trackBtn}>
                <Text style={styles.trackText}>{order.status === 'Delivered' ? 'Reorder' : 'Track'}</Text>
                <Ionicons name="arrow-forward" size={16} color={COLORS.orange} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  orderCard: { ...CARD, padding: 18, marginBottom: 14 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  orderId: { fontSize: 15, fontWeight: '800', color: COLORS.navy },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  statusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  statusText: { fontSize: 12, fontWeight: '700' },
  orderDetails: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  orderDate: { fontSize: 13, color: COLORS.textLight, fontWeight: '600' },
  orderItems: { fontSize: 13, color: COLORS.textLight, fontWeight: '600' },
  divider: { height: 1, backgroundColor: COLORS.borderLight, marginBottom: 16 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderTotal: { fontSize: 18, fontWeight: '900', color: COLORS.navy },
  trackBtn: { flexDirection: 'row', alignItems: 'center' },
  trackText: { fontSize: 14, fontWeight: '700', color: COLORS.orange, marginRight: 4 },
});

export default OrdersScreen;
