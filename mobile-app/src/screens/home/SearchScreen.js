import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/colors';

const CATEGORIES = ['All', 'Fashion', 'Tech', 'Beauty', 'Home', 'Bags'];

const MOCK_PRODUCTS = [
  { id: '1', name: 'Wireless Earbuds', price: '₦15,000' },
  { id: '2', name: 'Canvas Backpack', price: '₦9,500' },
  { id: '3', name: 'Smart Watch', price: '₦22,000' },
  { id: '4', name: 'LED Desk Lamp', price: '₦16,000' },
];

const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <View style={styles.imagePlaceholder}>
        <Ionicons name="cube-outline" size={40} color={COLORS.primary} />
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={22} color={COLORS.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for anything..."
            placeholderTextColor={COLORS.textLight}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={22} color={COLORS.textLight} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.categoryScroll}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity 
            key={cat} 
            style={[styles.chip, activeCategory === cat && styles.activeChip]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text style={[styles.chipText, activeCategory === cat && styles.activeChipText]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={MOCK_PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.grid}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: 20, paddingTop: 10 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  searchInput: { flex: 1, marginHorizontal: 10, fontSize: 16, color: COLORS.textDark },
  categoryScroll: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 20, marginBottom: 10 },
  chip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: '#FFF', marginRight: 10, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  activeChip: { backgroundColor: COLORS.primary },
  chipText: { color: COLORS.textDark, fontWeight: '600' },
  activeChipText: { color: '#FFF' },
  grid: { justifyContent: 'space-between' },
  productCard: { width: '48%', backgroundColor: '#FFF', borderRadius: 25, padding: 15, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, elevation: 3 },
  imagePlaceholder: { height: 120, backgroundColor: '#F0F0F0', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  productName: { fontSize: 15, fontWeight: '700', color: COLORS.textDark, marginBottom: 5 },
  productPrice: { fontSize: 16, fontWeight: '800', color: COLORS.primary },
});

export default SearchScreen;
