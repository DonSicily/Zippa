import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/product/ProductCard';
import { ProductSkeleton } from '../../components/common/Loading';
import { COLORS } from '../../utils/colors';

const ProductListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params || { category: 'All' };

  // Fetch products filtered by category
  const { products, loading, loadMore, hasMore } = useProducts(
    category !== 'All' ? { category } : {}
  );

  const renderItem = ({ item }) => (
    <ProductCard 
      product={item} 
      onPress={() => navigation.navigate('ProductDetail', { id: item._id })} 
    />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ProductSkeleton />
        <ProductSkeleton />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category} Drops</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id || item.id}
        numColumns={2}
        columnWrapperStyle={styles.grid}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={60} color={COLORS.textLight} />
              <Text style={styles.emptyText}>No items found in this category yet.</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textDark },
  grid: { justifyContent: 'space-between', paddingHorizontal: 20 },
  listContent: { paddingBottom: 120 },
  footerLoader: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 100, paddingHorizontal: 40 },
  emptyText: { fontSize: 16, color: COLORS.textLight, textAlign: 'center', marginTop: 20 },
});

export default ProductListScreen;
