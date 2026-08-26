import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getRecentTransactions } from '../../services/walletService';
import { COLORS } from '../../utils/colors';

const TransactionHistoryScreen = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState('all'); // all, credit, debit
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, [filter]);

  const fetchTransactions = async () => {
    try {
      const res = await getRecentTransactions(50, filter);
      setTransactions(res.data || []);
    } catch (error) { console.error(error); }
  };

  const formatCurrency = (amount) => `₦${amount.toLocaleString()}`;

  const renderItem = ({ item }) => (
    <View style={styles.txnCard}>
      <View style={[styles.txnIcon, { backgroundColor: item.type === 'credit' ? '#D4FCEF' : '#FFE5E5' }]}>
        <Ionicons name={item.type === 'credit' ? 'arrow-down' : 'arrow-up'} size={20} color={item.type === 'credit' ? COLORS.accent : COLORS.error} />
      </View>
      <View style={styles.txnDetails}>
        <Text style={styles.txnTitle}>{item.description}</Text>
        <Text style={styles.txnDate}>{new Date(item.createdAt).toLocaleString()}</Text>
      </View>
      <Text style={[styles.txnAmount, { color: item.type === 'credit' ? COLORS.accent : COLORS.textDark }]}>
        {item.type === 'credit' ? '+' : '-'}{formatCurrency(item.amount)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Filter Chips */}
      <View style={styles.filterContainer}>
        {['all', 'credit', 'debit'].map((f) => (
          <TouchableOpacity 
            key={f} 
            style={[styles.chip, filter === f && styles.activeChip]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.chipText, filter === f && styles.activeChipText]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No {filter === 'all' ? '' : filter} transactions found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textDark },
  filterContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 },
  chip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: '#FFF', marginRight: 10, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  activeChip: { backgroundColor: COLORS.primary },
  chipText: { color: COLORS.textDark, fontWeight: '600' },
  activeChipText: { color: '#FFF' },
  listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  emptyState: { alignItems: 'center', padding: 40 },
  emptyText: { color: COLORS.textLight },
  txnCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', marginBottom: 12, padding: 16, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.03, elevation: 2 },
  txnIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  txnDetails: { flex: 1 },
  txnTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textDark, marginBottom: 4 },
  txnDate: { fontSize: 12, color: COLORS.textLight },
  txnAmount: { fontSize: 16, fontWeight: '800' },
});

export default TransactionHistoryScreen;
