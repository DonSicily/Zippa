import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CARD } from '../../utils/colors';

// v2 Product Card — beige image well, navy price, strike-through old price, gold star rating
const ProductCard = ({ product, onPress }) => {
  const price = product.price?.discountPrice || product.price?.retailPrice || 0;
  const oldPrice = product.price?.retailPrice || 0;
  const discount = oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const rating = product.rating?.average ?? product.rating ?? 4.8;
  const reviews = product.rating?.count ?? product.reviews ?? 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        {product.images && product.images[0] ? (
          <Image source={{ uri: product.images[0].url }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="cube-outline" size={36} color={COLORS.textMuted} />
          </View>
        )}
        {discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
        )}
      </View>

      <Text style={styles.name} numberOfLines={2}>{product.name}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>₦{price.toLocaleString()}</Text>
        {discount > 0 && <Text style={styles.oldPrice}>₦{oldPrice.toLocaleString()}</Text>}
      </View>

      <View style={styles.ratingRow}>
        <Ionicons name="star" size={12} color={COLORS.gold} />
        <Text style={styles.ratingText}>{rating} ({reviews})</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { ...CARD, width: '48%', padding: 10, marginBottom: 16 },
  imageContainer: { position: 'relative', height: 130, borderRadius: 12, backgroundColor: COLORS.imageBg, overflow: 'hidden', marginBottom: 10 },
  image: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, resizeMode: 'cover' },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  discountBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: COLORS.orangeSoft, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  discountText: { fontSize: 10, fontWeight: '700', color: COLORS.orange },
  name: { fontSize: 13, fontWeight: '600', color: COLORS.navy, lineHeight: 18, minHeight: 36 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, flexWrap: 'wrap' },
  price: { fontSize: 15, fontWeight: '800', color: COLORS.navy },
  oldPrice: { fontSize: 11, color: COLORS.textMuted, textDecorationLine: 'line-through', marginLeft: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  ratingText: { fontSize: 11, color: COLORS.textLight, marginLeft: 4 },
});

export default ProductCard;
