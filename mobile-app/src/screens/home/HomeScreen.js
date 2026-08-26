import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../utils/colors';

const DROPS = [
  { id: '1', title: 'Campus Drops', subtitle: 'Naira ()', color: '#E0D4FC', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400' },
  { id: '2', title: 'Chill Vibes', subtitle: 'Droon ()', color: '#D4FCEF', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400' },
  { id: '3', title: 'Street Heat', subtitle: 'Doran (🔥)', color: '#FCF4D4', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
];

const HomeScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>What's good, {user?.firstName || 'Bestie'}? </Text>
            <Text style={styles.logoText}>Bestiez</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('Profile')}>
            <Image source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' }} style={styles.avatar} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchContainer} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={22} color={COLORS.textLight} style={{ marginRight: 10 }} />
          <Text style={styles.searchText}>Find your next drip...</Text>
          <Ionicons name="sliders-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>

        {/* Campus Drops */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}> Campus Drops</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>See all</Text></TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dropScroll}>
          {DROPS.map((item) => (
            <TouchableOpacity key={item.id} style={[styles.dropCard, { backgroundColor: item.color }]}>
              <Image source={{ uri: item.image }} style={styles.dropImage} />
              <View style={styles.dropInfo}>
                <Text style={styles.dropTitle}>{item.title}</Text>
                <Text style={styles.dropSubtitle}>{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Trending Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>✨ Trending on Campus</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>See all</Text></TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {[1, 2, 3, 4].map((item) => (
            <TouchableOpacity key={item} style={styles.productCard} onPress={() => navigation.navigate('ProductDetail', { id: item })}>
              <View style={styles.imagePlaceholder}>
                <Ionicons name="shirt-outline" size={40} color={COLORS.primary} />
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productName}>Oversized Hoodie</Text>
                <Text style={styles.productPrice}>₦12,500</Text>
              </View>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={20} color="#FFF" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
  greeting: { fontSize: 16, color: COLORS.textLight, fontWeight: '600' },
  logoText: { fontSize: 28, fontWeight: '900', color: COLORS.primary, letterSpacing: -1 },
  profileBtn: { width: 45, height: 45, borderRadius: 22.5, overflow: 'hidden', borderWidth: 2, borderColor: COLORS.accent },
  avatar: { width: '100%', height: '100%' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', marginHorizontal: 20, marginTop: 20, padding: 15, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  searchText: { flex: 1, color: COLORS.textLight, fontSize: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 30, marginBottom: 15 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textDark },
  seeAllText: { color: COLORS.primary, fontWeight: '600' },
  dropScroll: { paddingLeft: 20, marginBottom: 10 },
  dropCard: { width: 220, height: 280, borderRadius: 30, marginRight: 15, padding: 15, justifyContent: 'flex-end', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 15, elevation: 5 },
  dropImage: { position: 'absolute', top: 20, left: 20, right: 20, height: 180, borderRadius: 20 },
  dropInfo: { zIndex: 2 },
  dropTitle: { fontSize: 22, fontWeight: '900', color: COLORS.textDark },
  dropSubtitle: { fontSize: 14, color: COLORS.textDark, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
  productCard: { width: '48%', backgroundColor: '#FFF', borderRadius: 25, padding: 15, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  imagePlaceholder: { height: 120, backgroundColor: '#F0F0F0', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  productDetails: { flex: 1 },
  productName: { fontSize: 15, fontWeight: '700', color: COLORS.textDark, marginBottom: 5 },
  productPrice: { fontSize: 16, fontWeight: '800', color: COLORS.primary },
  addButton: { position: 'absolute', bottom: 15, right: 15, backgroundColor: COLORS.accent, width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
});

export default HomeScreen;
