import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { getWalletBalance, getRecentTransactions } from '../../services/walletService';
import { COLORS } from '../../utils/colors';

const WalletScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [balRes, transRes] = await Promise.all([
        getWalletBalance(),
        getRecentTransactions(5)
      ]);
      setBalance(balRes.data.balance || 0);
      setTransactions(transRes.data || []);
    } catch (error) {
      console.error('Wallet fetch error:', error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const formatCurrency = (amount) => `₦${amount.toLocaleString()}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wallet</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      >
        {/* Balance Hero Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Available Balance</Text>
          <Text style={styles.heroBalance}>{formatCurrency(balance)}</Text>
          <Text style={styles.heroSub}>Earn 5% cashback on every Bestiez order!</Text>
          
          <View style={styles.heroActions}>
            <TouchableOpacity 
              style={styles.heroBtn} 
              onPress={() => navigation.navigate('FundWallet')}
            >
              <Ionicons name="add-circle" size={20} color="#FFF" />
              <Text style={styles.heroBtnText}>Add Funds</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.heroBtn, styles.secondaryHeroBtn]}>
              <Ionicons name="paper-plane" size={20} color={COLORS.primary} />
              <Text style={[styles.heroBtnText, { color: COLORS.primary }]}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions Grid */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Ambassador')}>
            <View style={[styles.actionIcon, { backgroundColor: '#E0D4FC' }]}>
              <Ionicons name="star" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.actionText}>Ambassador Earnings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('TransactionHistory')}>
            <View style={[styles.actionIcon, { backgroundColor: '#D4FCEF' }]}>
              <Ionicons name="receipt" size={24} color={COLORS.accent} />
            </View>
            <Text style={styles.actionText}>Full History</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {transactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="wallet-outline" size={48} color={COLORS.textLight} />
            <Text style={styles.emptyText}>No transactions yet. Add funds to get started!</Text>
          </View>
        ) : (
          transactions.map((txn) => (
            <View key={txn._id} style={styles.txnCard}>
              <View style={[styles.txnIcon, { backgroundColor: txn.type === 'credit' ? '#D4FCEF' : '#FFE5E5' }]}>
                <Ionicons 
                  name={txn.type === 'credit' ? 'arrow-down' : 'arrow-up'} 
                  size={20} 
                  color={txn.type === 'credit' ? COLORS.accent : COLORS.error} 
                />
              </View>
              <View style={styles.txnDetails}>
                <Text style={styles.txnTitle}>{txn.description}</Text>
                <Text style={styles.txnDate}>{new Date(txn.createdAt).toLocaleDateString()}</Text>
              </View>
              <Text style={[styles.txnAmount, { color: txn.type === 'credit' ? COLORS.accent : COLORS.textDark }]}>
                {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textDark },
  heroCard: { backgroundColor: COLORS.primary, margin: 20, padding: 24, borderRadius: 30, shadowColor: COLORS.primary, shadowOpacity: 0.2, shadowRadius: 15, elevation: 5 },
  heroLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '600' },
  heroBalance: { color: '#FFF', fontSize: 42, fontWeight: '900', marginVertical: 10, letterSpacing: -1 },
  heroSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 24 },
  heroActions: { flexDirection: 'row', gap: 12 },
  heroBtn: { flex: 1, flexDirection: 'row', backgroundColor: COLORS.accent, paddingVertical: 14, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  secondaryHeroBtn: { backgroundColor: '#FFF' },
  heroBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 15, marginLeft: 8 },
  quickActions: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 30 },
  actionCard: { flex: 1, backgroundColor: '#FFF', padding: 16, borderRadius: 20, marginHorizontal: 5, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  actionIcon: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  actionText: { fontSize: 13, fontWeight: '700', color: COLORS.textDark, textAlign: 'center' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textDark },
  seeAllText: { color: COLORS.primary, fontWeight: '600' },
  emptyState: { alignItems: 'center', padding: 40 },
  emptyText: { color: COLORS.textLight, marginTop: 10, textAlign: 'center' },
  txnCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', marginHorizontal: 20, marginBottom: 12, padding: 16, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.03, elevation: 2 },
  txnIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  txnDetails: { flex: 1 },
  txnTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textDark, marginBottom: 4 },
  txnDate: { fontSize: 12, color: COLORS.textLight },
  txnAmount: { fontSize: 16, fontWeight: '800' },
});

export default WalletScreen;
