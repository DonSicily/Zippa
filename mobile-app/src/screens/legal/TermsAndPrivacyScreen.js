// Legal compliance screen. Required by Apple App Store and Google Play Store.
// Uses a clean, readable layout with the Gen-Z aesthetic.

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/colors';

const TermsAndPrivacyScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('terms'); // 'terms' or 'privacy'

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Legal</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'terms' && styles.activeTab]} 
          onPress={() => setActiveTab('terms')}
        >
          <Text style={[styles.tabText, activeTab === 'terms' && styles.activeTabText]}>Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'privacy' && styles.activeTab]} 
          onPress={() => setActiveTab('privacy')}
        >
          <Text style={[styles.tabText, activeTab === 'privacy' && styles.activeTabText]}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {activeTab === 'terms' ? (
          <>
            <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
            <Text style={styles.bodyText}>By downloading and using the Bestiez app, you agree to be bound by these Terms of Service. If you do not agree, please do not use the app.</Text>
            
            <Text style={styles.sectionTitle}>2. Eligibility</Text>
            <Text style={styles.bodyText}>You must be at least 16 years old and a registered student at a participating Nigerian university or polytechnic to use Bestiez.</Text>
            
            <Text style={styles.sectionTitle}>3. Purchases & Payments</Text>
            <Text style={styles.bodyText}>All prices are in Nigerian Naira (NGN). Payments are processed securely via Paystack. Due to the factory-direct nature of our goods, delivery times may vary from 7 to 14 days.</Text>

            <Text style={styles.sectionTitle}>4. Returns & Refunds</Text>
            <Text style={styles.bodyText}>We offer a 7-day return policy for damaged or defective items. Please contact our support team within 24 hours of receiving your order to initiate a return.</Text>
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>1. Information We Collect</Text>
            <Text style={styles.bodyText}>We collect your name, email, phone number, campus location, and delivery address to process your orders. We also collect device information to improve app performance.</Text>
            
            <Text style={styles.sectionTitle}>2. How We Use Your Data</Text>
            <Text style={styles.bodyText}>Your data is used to fulfill orders, send push notifications about "Campus Drops", and calculate Ambassador commissions. We do not sell your data to third parties.</Text>
            
            <Text style={styles.sectionTitle}>3. Data Security</Text>
            <Text style={styles.bodyText}>We use industry-standard encryption (AES-256) to protect your personal and financial information.</Text>
          </>
        )}

        <Text style={styles.footerText}>Last updated: August 3, 2026</Text>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:support@bestiez.com')}>
          <Text style={styles.contactLink}>Contact Support</Text>
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
  tabContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: COLORS.primary },
  tabText: { fontSize: 15, fontWeight: '600', color: COLORS.textLight },
  activeTabText: { color: COLORS.primary, fontWeight: '800' },
  content: { paddingHorizontal: 20, paddingBottom: 50 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textDark, marginTop: 20, marginBottom: 10 },
  bodyText: { fontSize: 15, color: COLORS.textLight, lineHeight: 24, marginBottom: 10 },
  footerText: { fontSize: 12, color: COLORS.textMuted, textAlign: 'center', marginTop: 40, marginBottom: 10 },
  contactLink: { fontSize: 15, color: COLORS.primary, fontWeight: '700', textAlign: 'center' },
});

export default TermsAndPrivacyScreen;
