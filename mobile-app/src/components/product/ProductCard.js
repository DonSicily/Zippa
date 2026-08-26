import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/colors';

const ProductCard = ({ product, onPress }) => {
  const price = product.price?.discountPrice || product.price?.retailPrice || 0;
  const oldPrice = product.price?.retailPrice || 0;
  const discount = oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        {product.images && product.images[0] ? (
          <Image source={{ uri: product.images[0].url }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="cube-outline" size={40} color={COLORS.primary} />
          </View>
        )}
        {discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
        )}
      </View>
      
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₦{price.toLocaleString()}</Text>
          {discount > 0 && <Text style={styles.oldPrice}>₦{oldPrice.toLocaleString()}</Text>}
        </View>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={20} color="#FFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  imageContainer: { position: 'relative', marginBottom: 12 },
  image: { width: '100%', height: 120, borderRadius: 20 },
  placeholder: { width: '100%', height: 120, backgroundColor: '#F0F0F0', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  discountBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: COLORS.highlight, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  discountText: { fontSize: 10, fontWeight: 'bold', color: COLORS.textDark },
  details: { flex: 1 },
  name: { fontSize: 14, fontWeight: '700', color: COLORS.textDark, marginBottom: 6, lineHeight: 20 },
  priceRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  price: { fontSize: 15, fontWeight: '800', color: COLORS.primary },
  oldPrice: { fontSize: 12, color: COLORS.textLight, textDecorationLine: 'line-through', marginLeft: 6 },
  addButton: {
    position: 'absolute', bottom: 12, right: 12,
    backgroundColor: COLORS.accent, width: 32, height: 32,
    borderRadius: 16, justifyContent: 'center', alignItems: 'center',
    shadowColor: COLORS.accent, shadowOpacity: 0.3, shadowRadius: 5, elevation: 3,
  },
});

export default ProductCard;
