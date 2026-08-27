import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, CARD, SHADOW } from '../../utils/colors';
import Header from '../../components/layout/Header';
import { getWalletBalance, getRecentTransactions } from '../../services/walletService';

const CREDIT_TYPES = ['credit', 'fund', 'refund', 'payout_reversal'];

const WalletScreen = () => {
  const navigation = useNavigation();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const [bal, txns] = await Promise.all([
        getWalletBalance().catch(() => null),
        getRecentTransactions(10).catch(() => null),
      ]);
      setBalance(bal?.data?.balance ?? bal?.balance ?? 0);
      setTransactions(txns?.data?.transactions ?? txns?.transactions ?? []);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <View style={styles.container}>
      <Header title="Campus Wallet" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} tintColor={COLORS.navy} />}
      >
        {/* Balance card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.gold} style={{ marginVertical: 10 }} />
          ) : (
            <Text style={styles.balanceValue}>₦{Number(balance).toLocaleString()}</Text>
          )}
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.fundBtn} onPress={() => navigation.navigate('FundWallet')}>
              <Ionicons name="add" size={16} color="#FFF" />
              <Text style={styles.fundBtnText}>Fund Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.withdrawBtn}>
              <Text style={styles.withdrawBtnText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transactions */}
        <View style={styles.txHeader}>
          <Text style={styles.txTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {transactions.length === 0 && !loading ? (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons name="wallet-outline" size={32} color={COLORS.navy} />
            </View>
            <Text style={styles.emptyTitle}>No transactions yet</Text>
            <Text style={styles.emptySub}>Fund your wallet to start shopping.</Text>
          </View>
        ) : (
          transactions.map((t, i) => {
            const isCredit = CREDIT_TYPES.includes(t.type);
            return (
              <View key={t._id || i} style={styles.txRow}>
                <View style={[styles.txIcon, { backgroundColor: isCredit ? COLORS.successSoft : COLORS.orangeSoft }]}>
                  <Ionicons name={isCredit ? 'arrow-down' : 'arrow-up'} size={16} color={isCredit ? COLORS.success : COLORS.orange} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.txTitleText} numberOfLines={1}>{t.description || (isCredit ? 'Wallet top-up' : 'Payment')}</Text>
                  <Text style={styles.txDate}>{t.createdAt ? new Date(t.createdAt).toLocaleDateString() : ''}</Text>
                </View>
                <Text style={[styles.txAmount, { color: isCredit ? COLORS.success : COLORS.navy }]}>
                  {isCredit ? '+' : '-'}₦{Number(t.amount || 0).toLocaleString()}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  balanceCard: { marginHorizontal: 20, borderRadius: 20, padding: 22, backgroundColor: COLORS.navy, ...SHADOW.card },
  balanceLabel: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.7)', marginBottom: 6 },
  balanceValue: { fontSize: 34, fontWeight: '900', color: '#FFF', marginBottom: 18 },
  balanceActions: { flexDirection: 'row' },
  fundBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.orange, borderRadius: 12, paddingHorizontal: 18, paddingVertical: 12, marginRight: 10 },
  fundBtnText: { color: '#FFF', fontWeight: '700', fontSize: 14, marginLeft: 6 },
  withdrawBtn: { borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.5)', borderRadius: 12, paddingHorizontal: 18, paddingVertical: 12 },
  withdrawBtnText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  txHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 26, marginBottom: 12 },
  txTitle: { fontSize: 17, fontWeight: '800', color: COLORS.navy },
  seeAll: { color: COLORS.gold, fontWeight: '700', fontSize: 13 },
  empty: { alignItems: 'center', paddingTop: 30 },
  emptyIcon: { width: 72, height: 72, borderRadius: 36, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.borderLight, justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: COLORS.navy },
  emptySub: { fontSize: 13, color: COLORS.textLight, marginTop: 4 },
  txRow: { ...CARD, flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 12, padding: 14 },
  txIcon: { width: 38, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  txTitleText: { fontSize: 14, fontWeight: '700', color: COLORS.navy },
  txDate: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  txAmount: { fontSize: 14, fontWeight: '800' },
});

export default WalletScreen;
