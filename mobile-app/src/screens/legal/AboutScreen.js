// About screen displaying app version, team info, and social links.

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/colors';
import Constants from 'expo-constants';

const AboutScreen = () => {
  const navigation = useNavigation();
  const appVersion = Constants.expoConfig?.version || '1.0.0';

  const socialLinks = [
    { name: 'Instagram', icon: 'logo-instagram', url: 'https://instagram.com/bestiez.ng' },
    { name: 'TikTok', icon: 'logo-tiktok', url: 'https://tiktok.com/@bestiez.official' },
    { name: 'Twitter', icon: 'logo-twitter', url: 'https://twitter.com/bestiez_ng' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Bestiez</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Logo & Tagline */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>B</Text>
          </View>
          <Text style={styles.appName}>Bestiez</Text>
          <Text style={styles.tagline}>Your Gateway to China's Best.</Text>
          <Text style={styles.version}>Version {appVersion}</Text>
        </View>

        {/* Mission */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Our Mission</Text>
          <Text style={styles.cardText}>
            To empower Nigerian youths with affordable access to global quality products by bridging the gap between top Chinese factories and university campuses.
          </Text>
        </View>

        {/* Socials */}
        <Text style={styles.sectionLabel}>Follow the Drip</Text>
        <View style={styles.socialContainer}>
          {socialLinks.map((social) => (
            <TouchableOpacity 
              key={social.name} 
              style={styles.socialBtn}
              onPress={() => Linking.openURL(social.url)}
            >
              <Ionicons name={social.icon} size={24} color={COLORS.primary} />
              <Text style={styles.socialText}>{social.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.copyright}>© 2026 Bestiez Technologies Ltd.</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textDark },
  content: { paddingHorizontal: 20, paddingBottom: 50, alignItems: 'center' },
  logoContainer: { alignItems: 'center', marginTop: 20, marginBottom: 30 },
  logoBox: { width: 80, height: 80, borderRadius: 24, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 16, shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 15, elevation: 8 },
  logoText: { fontSize: 40, fontWeight: '900', color: '#FFF' },
  appName: { fontSize: 28, fontWeight: '900', color: COLORS.textDark, letterSpacing: -1 },
  tagline: { fontSize: 15, color: COLORS.textLight, marginTop: 4 },
  version: { fontSize: 12, color: COLORS.textMuted, marginTop: 8, backgroundColor: '#F0F0F0', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  card: { width: '100%', backgroundColor: '#FFF', padding: 24, borderRadius: 24, shadowColor: '#000', shadowOpacity: 0.05, elevation: 3, marginBottom: 30 },
  cardTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textDark, marginBottom: 12 },
  cardText: { fontSize: 15, color: COLORS.textLight, lineHeight: 24 },
  sectionLabel: { fontSize: 14, fontWeight: '700', color: COLORS.textLight, alignSelf: 'flex-start', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  socialContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  socialBtn: { flex: 1, backgroundColor: '#FFF', paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginHorizontal: 4, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  socialText: { fontSize: 12, fontWeight: '700', color: COLORS.textDark, marginTop: 8 },
  copyright: { fontSize: 12, color: COLORS.textMuted },
});

export default AboutScreen;
