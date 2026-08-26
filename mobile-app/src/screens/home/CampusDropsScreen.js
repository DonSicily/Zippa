import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/colors';

const FLASH_DROPS = [
  { id: '1', title: 'Streetwear Essentials', time: '02:14:30', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600', color: '#E0D4FC' },
  { id: '2', title: 'Tech Gadgets', time: '05:00:00', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600', color: '#D4FCEF' },
];

const CampusDropsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Exclusive Drops 🔥</Text>
          <Text style={styles.subtitle}>Fresh from the factory, straight to your campus.</Text>
        </View>

        {FLASH_DROPS.map((drop) => (
          <TouchableOpacity key={drop.id} style={[styles.flashCard, { backgroundColor: drop.color }]}>
            <Image source={{ uri: drop.image }} style={styles.flashImage} />
            <View style={styles.flashOverlay}>
              <View>
                <Text style={styles.flashTitle}>{drop.title}</Text>
                <View style={styles.timerContainer}>
                  <Ionicons name="time-outline" size={16} color="#FFF" />
                  <Text style={styles.timerText}>Ends in {drop.time}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.shopBtn}>
                <Text style={styles.shopBtnText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Upcoming Drops</Text>
        <View style={styles.upcomingGrid}>
          {[1, 2].map((item) => (
            <View key={item} style={styles.upcomingCard}>
              <View style={styles.upcomingImage}>
                <Ionicons name="shirt-outline" size={40} color={COLORS.primary} />
              </View>
              <Text style={styles.upcomingTitle}>Summer Collection</Text>
              <Text style={styles.upcomingDate}>Drops Friday</Text>
              <TouchableOpacity style={styles.notifyBtn}>
                <Text style={styles.notifyText}>Notify Me</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20 },
  title: { fontSize: 28, fontWeight: '900', color: COLORS.textDark },
  subtitle: { fontSize: 16, color: COLORS.textLight, marginTop: 5 },
  flashCard: { marginHorizontal: 20, height: 220, borderRadius: 30, marginBottom: 20, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 15, elevation: 5 },
  flashImage: { width: '100%', height: '100%' },
  flashOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-end' },
  flashTitle: { fontSize: 22, fontWeight: '900', color: '#FFF', marginBottom: 5 },
  timerContainer: { flexDirection: 'row', alignItems: 'center' },
  timerText: { color: '#FFF', fontWeight: '600', marginLeft: 5 },
  shopBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  shopBtnText: { color: '#FFF', fontWeight: 'bold' },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textDark, paddingHorizontal: 20, marginBottom: 15 },
  upcomingGrid: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  upcomingCard: { width: '48%', backgroundColor: '#FFF', borderRadius: 25, padding: 15, shadowColor: '#000', shadowOpacity: 0.05, elevation: 3 },
  upcomingImage: { height: 120, backgroundColor: '#F0F0F0', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  upcomingTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
  upcomingDate: { fontSize: 14, color: COLORS.textLight, marginBottom: 15 },
  notifyBtn: { backgroundColor: COLORS.highlight, paddingVertical: 10, borderRadius: 15, alignItems: 'center' },
  notifyText: { color: COLORS.textDark, fontWeight: 'bold' },
});

export default CampusDropsScreen;
