import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, CARD, RADIUS } from '../../utils/colors';
import ProductCard from '../../components/product/ProductCard';

const FILTER_CHIPS = ['Price', 'Color', 'Brand', 'Rating 4+', 'Free Shipping'];
const TRENDING_TAGS = ['#CampusCore', '#TechDeals', '#StudyEssentials', '#DormVibes'];
const SUGGESTED = [
  { id: 1, name: 'Premium Noise-Canceling Earbuds', price: { discountPrice: 32000, retailPrice: 60000 }, rating: 4.8, reviews: 240, images: [{ url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400' }] },
  { id: 2, name: 'Unisex Campus Hoodie', price: { discountPrice: 32000, retailPrice: 45000 }, rating: 4.7, reviews: 120, images: [{ url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400' }] },
  { id: 3, name: 'Smart LED Study Lamp', price: { discountPrice: 24000, retailPrice: 40000 }, rating: 4.9, reviews: 95, images: [{ url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400' }] },
  { id: 4, name: 'Eco-Friendly Dorm Essentials Set', price: { discountPrice: 28000, retailPrice: 42000 }, rating: 4.6, reviews: 88, images: [{ url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400' }] },
];

const SearchScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState(['wireless earbuds', 'oversized hoodie', 'study desk lamp']);

  const results = SUGGESTED.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  const submit = (text) => {
    if (text && !recent.includes(text)) setRecent([text, ...recent].slice(0, 5));
  };

  return (
    <View style={styles.container}>
      {/* Search row */}
      <View style={styles.topRow}>
        <View style={styles.inputWrap}>
          <Ionicons name="search-outline" size={20} color={COLORS.textMuted} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Search products, brands..."
            placeholderTextColor={COLORS.textMuted}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={(e) => submit(e.nativeEvent.text)}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.textMuted} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Filter chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll} contentContainerStyle={styles.chipRow}>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterChipText}>Filters</Text>
          <Ionicons name="chevron-down" size={14} color={COLORS.orange} />
        </TouchableOpacity>
        {FILTER_CHIPS.map((c) => (
          <TouchableOpacity key={c} style={styles.chip}>
            <Text style={styles.chipText}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {!query && (
          <>
            {/* Recent searches */}
            <Text style={styles.sectionTitle}>Recent searches</Text>
            {recent.map((r, i) => (
              <TouchableOpacity key={r} style={[styles.recentRow, i === recent.length - 1 && { borderBottomWidth: 0 }]} onPress={() => setQuery(r)}>
                <Ionicons name="time-outline" size={18} color={COLORS.textMuted} />
                <Text style={styles.recentText}>{r}</Text>
                <TouchableOpacity onPress={() => setRecent(recent.filter((x) => x !== r))}>
                  <Ionicons name="close" size={18} color={COLORS.textMuted} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}

            {/* Trending tags */}
            <Text style={[styles.sectionTitle, { marginTop: 26 }]}>Trending now</Text>
            <View style={styles.tagGrid}>
              {TRENDING_TAGS.map((t) => (
                <TouchableOpacity key={t} style={styles.tag} onPress={() => setQuery(t.replace('#', ''))}>
                  <Text style={styles.tagText}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <Text style={[styles.sectionTitle, { marginTop: 26 }]}>Suggested for you</Text>
        <View style={styles.grid}>
          {results.map((p) => (
            <ProductCard key={p.id} product={p} onPress={() => navigation.navigate('ProductDetail', { id: p.id })} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingTop: 55 },
  topRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  inputWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, height: 48, paddingHorizontal: 12, marginRight: 12 },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.textDark },
  cancelText: { fontSize: 14, fontWeight: '700', color: COLORS.navy },
  chipScroll: { marginTop: 14 },
  chipRow: { paddingHorizontal: 20 },
  filterChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: RADIUS.pill, borderWidth: 1.5, borderColor: COLORS.orange, backgroundColor: COLORS.orangeSoft, marginRight: 8 },
  filterChipText: { fontSize: 13, fontWeight: '700', color: COLORS.orange, marginRight: 4 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: RADIUS.pill, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, marginRight: 8 },
  chipText: { fontSize: 13, fontWeight: '600', color: COLORS.navy },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: COLORS.navy, paddingHorizontal: 20, marginBottom: 12 },
  recentRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
  recentText: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.textDark, marginLeft: 10 },
  tagGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20 },
  tag: { width: '48%', backgroundColor: COLORS.chipBg, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 10, marginRight: '2%' },
  tagText: { fontSize: 13, fontWeight: '600', color: COLORS.textDark },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
});

export default SearchScreen;
