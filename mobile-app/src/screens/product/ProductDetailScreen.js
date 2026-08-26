import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';
import { COLORS } from '../../utils/colors';

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Mock product data (In production, fetch using route.params.id)
  const product = {
    name: 'Oversized Campus Hoodie',
    price: 12500,
    oldPrice: 25000,
    description: 'The ultimate cozy fit for late-night study sessions or campus hangs. Premium cotton blend, oversized fit, and factory-direct pricing.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600',
    rating: 4.8,
    reviews: 124,
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    Alert.alert('Secured! 🔒', 'Added to your cart. Go secure the drip!');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Image Header */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favBtn}>
            <Ionicons name="heart-outline" size={24} color={COLORS.textDark} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{product.name}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color={COLORS.highlightDark} />
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₦{product.price.toLocaleString()}</Text>
            <Text style={styles.oldPrice}>₦{product.oldPrice.toLocaleString()}</Text>
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>50% OFF</Text>
            </View>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          {/* Size Selector (Mock) */}
          <Text style={styles.sectionLabel}>Select Size</Text>
          <View style={styles.sizeRow}>
            {['S', 'M', 'L', 'XL'].map((size) => (
              <TouchableOpacity key={size} style={[styles.sizeBtn, size === 'L' && styles.activeSizeBtn]}>
                <Text style={[styles.sizeText, size === 'L' && styles.activeSizeText]}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quantity */}
          <Text style={styles.sectionLabel}>Quantity</Text>
          <View style={styles.quantityRow}>
            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.qtyBtn}>
              <Ionicons name="remove" size={20} color={COLORS.textDark} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.qtyBtn}>
              <Ionicons name="add" size={20} color={COLORS.textDark} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Action */}
      <View style={styles.bottomAction}>
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Ionicons name="bag-add-outline" size={24} color="#FFF" />
          <Text style={styles.addToCartText}>Add to Cart - ₦{(product.price * quantity).toLocaleString()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  imageContainer: { height: 380, backgroundColor: '#F0F0F0', position: 'relative' },
  productImage: { width: '100%', height: '100%' },
  backBtn: { position: 'absolute', top: 50, left: 20, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.8)', justifyContent: 'center', alignItems: 'center' },
  favBtn: { position: 'absolute', top: 50, right: 20, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.8)', justifyContent: 'center', alignItems: 'center' },
  content: { padding: 25, marginTop: -30, backgroundColor: COLORS.background, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  title: { flex: 1, fontSize: 24, fontWeight: '900', color: COLORS.textDark, marginRight: 10 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.highlight, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15 },
  ratingText: { fontSize: 14, fontWeight: 'bold', color: COLORS.textDark, marginLeft: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  price: { fontSize: 28, fontWeight: '900', color: COLORS.primary },
  oldPrice: { fontSize: 16, color: COLORS.textLight, textDecorationLine: 'line-through', marginLeft: 10 },
  discountTag: { backgroundColor: COLORS.accent, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, marginLeft: 10 },
  discountText: { fontSize: 12, fontWeight: 'bold', color: COLORS.textDark },
  description: { fontSize: 15, color: COLORS.textLight, lineHeight: 22, marginBottom: 25 },
  sectionLabel: { fontSize: 16, fontWeight: '800', color: COLORS.textDark, marginBottom: 10 },
  sizeRow: { flexDirection: 'row', marginBottom: 20 },
  sizeBtn: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginRight: 10, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  activeSizeBtn: { backgroundColor: COLORS.primary },
  sizeText: { fontSize: 16, fontWeight: 'bold', color: COLORS.textDark },
  activeSizeText: { color: '#FFF' },
  quantityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  qtyBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  qtyText: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark, marginHorizontal: 20 },
  bottomAction: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 15, elevation: 10 },
  addToCartBtn: { flexDirection: 'row', backgroundColor: COLORS.primary, paddingVertical: 18, borderRadius: 20, justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  addToCartText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
});

export default ProductDetailScreen;
