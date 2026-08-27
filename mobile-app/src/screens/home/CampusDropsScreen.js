import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CARD, RADIUS } from '../../utils/colors';
import Button from '../../components/common/Button';

const FLASH_DROPS = [
  { id: '1', title: 'Streetwear Essentials', time: '02:14:30', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600' },
  { id: '2', title: 'Tech Gadgets', time: '05:00:00', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600' },
];

const CampusDropsScreen = () => (
  <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Exclusive Drops 🔥</Text>
        <Text style={styles.subtitle}>Fresh from the factory, straight to your campus.</Text>
      </View>

      {FLASH_DROPS.map((drop) => (
        <TouchableOpacity key={drop.id} style={styles.flashCard} activeOpacity={0.92}>
          <Image source={{ uri: drop.image }} style={styles.flashImage} />
          <View style={styles.flashOverlay}>
            <View style={{ flex: 1 }}>
              <Text style={styles.flashTitle}>{drop.title}</Text>
              <View style={styles.timerRow}>
                <Ionicons name="time-outline" size={15} color={COLORS.gold} />
                <Text style={styles.timerText}>Ends in {drop.time}</Text>
              </View>
            </View>
            <Button small title="Shop Now" onPress={() => {}} />
          </View>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Upcoming Drops</Text>
      <View style={styles.upcomingGrid}>
        {[1, 2].map((item) => (
          <View key={item} style={styles.upcomingCard}>
            <View style={styles.upcomingImage}>
              <Ionicons name="shirt-outline" size={36} color={COLORS.navy} />
            </View>
            <Text style={styles.upcomingTitle}>Summer Collection</Text>
            <Text style={styles.upcomingDate}>Drops Friday</Text>
            <TouchableOpacity style={styles.notifyBtn}>
              <Ionicons name="notifications-outline" size={14} color={COLORS.gold} />
              <Text style={styles.notifyText}>Notify Me</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20 },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.navy },
  subtitle: { fontSize: 14, color: COLORS.textLight, marginTop: 4 },
  flashCard: { marginHorizontal: 20, height: 230, borderRadius: RADIUS.xl, marginBottom: 18, overflow: 'hidden', backgroundColor: COLORS.navy },
  flashImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, resizeMode: 'cover', opacity: 0.85 },
  flashOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 18, backgroundColor: 'rgba(14,42,71,0.72)', flexDirection: 'row', alignItems: 'flex-end' },
  flashTitle: { fontSize: 20, fontWeight: '800', color: '#FFF', marginBottom: 6 },
  timerRow: { flexDirection: 'row', alignItems: 'center' },
  timerText: { color: COLORS.gold, fontWeight: '700', fontSize: 13, marginLeft: 5 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.navy, paddingHorizontal: 20, marginBottom: 14 },
  upcomingGrid: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  upcomingCard: { ...CARD, width: '48%', padding: 14 },
  upcomingImage: { height: 120, backgroundColor: COLORS.imageBg, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  upcomingTitle: { fontSize: 15, fontWeight: '700', color: COLORS.navy },
  upcomingDate: { fontSize: 13, color: COLORS.textLight, marginBottom: 14 },
  notifyBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.goldSoft, paddingVertical: 10, borderRadius: 10 },
  notifyText: { color: COLORS.gold, fontWeight: '700', fontSize: 13, marginLeft: 6 },
});

export default CampusDropsScreen;
