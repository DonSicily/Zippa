import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Share, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/colors';

const AmbassadorScreen = () => {
  const navigation = useNavigation();
  const referralCode = 'BESTIEZ-CHINEDU';
  const stats = { referrals: 24, earnings: 12500, tier: 'Gold' };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Hey! Use my code ${referralCode} on the Bestiez app to get 10% off your first factory-direct order. Download it here: bestiez.com`,
      });
    } catch (error) {
      Alert.alert('Error sharing');
    }
  };

  const handleCopy = () => {
    // In a real app, use Clipboard.setString(referralCode)
    Alert.alert('Copied!', 'Referral code copied to clipboard.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ambassador Hub</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.badge}>
            <Ionicons name="star" size={14} color="#FFF" />
            <Text style={styles.badgeText}>{stats.tier} Ambassador</Text>
          </View>
          <Text style={styles.heroTitle}>Share the drip, earn the cash. 💸</Text>
          <Text style={styles.heroSub}>Earn 5% commission on every order your friends make.</Text>
          
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>{referralCode}</Text>
            <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
              <Ionicons name="copy-outline" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Ionicons name="share-social" size={20} color="#FFF" />
            <Text style={styles.shareText}>Invite Friends</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="people-outline" size={28} color={COLORS.primary} />
            <Text style={styles.statValue}>{stats.referrals}</Text>
            <Text style={styles.statLabel}>Total Referrals</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="wallet-outline" size={28} color={COLORS.accent} />
            <Text style={styles.statValue}>₦{stats.earnings.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Earnings</Text>
          </View>
        </View>

        {/* Withdraw Button */}
        <TouchableOpacity style={styles.withdrawBtn}>
          <Text style={styles.withdrawText}>Withdraw Earnings to Bank</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFF" />
        </TouchableOpacity>
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
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.accent, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, alignSelf: 'flex-start', marginBottom: 16 },
  badgeText: { color: '#FFF', fontWeight: 'bold', fontSize: 12, marginLeft: 4 },
  heroTitle: { fontSize: 24, fontWeight: '900', color: '#FFF', marginBottom: 8, lineHeight: 30 },
  heroSub: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 24, lineHeight: 20 },
  codeContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 16 },
  codeText: { flex: 1, fontSize: 20, fontWeight: '900', color: COLORS.textDark, letterSpacing: 2 },
  copyBtn: { padding: 8 },
  shareBtn: { flexDirection: 'row', backgroundColor: COLORS.accent, paddingVertical: 14, borderRadius: 16, justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.accent, shadowOpacity: 0.3, shadowRadius: 10, elevation: 4 },
  shareText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  statsGrid: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: '#FFF', padding: 20, borderRadius: 20, marginHorizontal: 5, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, elevation: 3 },
  statValue: { fontSize: 22, fontWeight: '900', color: COLORS.textDark, marginTop: 12, marginBottom: 4 },
  statLabel: { fontSize: 12, color: COLORS.textLight, textAlign: 'center' },
  withdrawBtn: { flexDirection: 'row', backgroundColor: COLORS.textDark, marginHorizontal: 20, paddingVertical: 18, borderRadius: 20, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  withdrawText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginRight: 8 },
});

export default AmbassadorScreen;
