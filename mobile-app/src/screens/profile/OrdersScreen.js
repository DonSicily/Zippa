import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../utils/colors';

const MOCK_ORDERS = [
  { id: 'BSTZ-8X92A', date: 'Aug 01, 2026', status: 'In Transit', statusColor: COLORS.primary, items: 2, total: 27000 },
  { id: 'BSTZ-7Y81B', date: 'Jul 25, 2026', status: 'Delivered', statusColor: COLORS.success, items: 1, total: 12500 },
  { id: 'BSTZ-6W70C', date: 'Jul 10, 2026', status: 'Delivered', statusColor: COLORS.success, items: 3, total: 45000 },
];

const OrdersScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={COLORS.textDark} /></TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 50 }}>
        {MOCK_ORDERS.map((order) => (
          <TouchableOpacity key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{order.id}</Text>
              <View style={[styles.statusBadge, { backgroundColor: order.statusColor + '20' }]}>
                <Text style={[styles.statusText, { color: order.statusColor }]}>{order.status}</Text>
              </View>
            </View>
            <View style={styles.orderDetails}>
              <Text style={styles.orderDate}>{order.date}</Text>
              <Text style={styles.orderItems}>{order.items} items</Text>
            </View>
            <View style={styles.orderFooter}>
              <Text style={styles.orderTotal}>₦{order.total.toLocaleString()}</Text>
              <TouchableOpacity style={styles.trackBtn}>
                <Text style={styles.trackText}>{order.status === 'Delivered' ? 'Reorder' : 'Track'}</Text>
                <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textDark },
  orderCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  orderId: { fontSize: 16, fontWeight: '800', color: COLORS.textDark },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: 'bold' },
  orderDetails: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  orderDate: { fontSize: 14, color: COLORS.textLight },
  orderItems: { fontSize: 14, color: COLORS.textLight },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderTotal: { fontSize: 18, fontWeight: '900', color: COLORS.primary },
  trackBtn: { flexDirection: 'row', alignItems: 'center' },
  trackText: { fontSize: 14, fontWeight: '700', color: COLORS.primary, marginRight: 5 },
});

export default OrdersScreen;
