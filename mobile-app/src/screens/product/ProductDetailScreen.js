import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../../context/CartContext';
import { COLORS, CARD, RADIUS, SHADOW } from '../../utils/colors';
import Button from '../../components/common/Button';

const MOCK = {
  name: 'Aero Pro Wireless Earbuds',
  vendor: 'Shenzhen Tech Co.',
  rating: 4.8, reviews: 1240, sold: '2.3k',
  price: 58000, oldPrice: 120000,
  image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
  colors: ['#12263F', '#EDEDED', '#C99C86'],
  options: ['ANC On', 'ANC Off'],
  highlights: ['Hybrid Active Noise Cancellation', '36h Battery Life', 'IPX5 Water Resistance'],
};

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { addToCart } = useCart();
  const [color, setColor] = useState(0);
  const [option, setOption] = useState(0);
  const [liked, setLiked] = useState(false);
  const p = route.params?.product || MOCK;

  const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

  const add = () => addToCart?.({ id: route.params?.id || 1, name: p.name, price: p.price, quantity: 1 });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Hero */}
        <View style={styles.hero}>
          <Image source={{ uri: p.image }} style={styles.heroImage} />
          <View style={styles.heroActions}>
            <TouchableOpacity style={styles.floatBtn} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={22} color={COLORS.navy} />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.floatBtn} onPress={() => setLiked(!liked)}>
              <Ionicons name={liked ? 'heart' : 'heart-outline'} size={20} color={liked ? COLORS.orange : COLORS.navy} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.floatBtn, { marginLeft: 10 }]}>
              <Ionicons name="share-outline" size={20} color={COLORS.navy} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom sheet */}
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.vendorChip}><Text style={styles.vendorChipText}>{p.vendor}</Text></View>
          <Text style={styles.title}>{p.name}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={13} color={COLORS.navy} />
            <Text style={styles.ratingText}>{p.rating} · {p.reviews.toLocaleString()} reviews · {p.sold} sold</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₦{p.price.toLocaleString()}</Text>
            {discount > 0 && <Text style={styles.oldPrice}>₦{p.oldPrice.toLocaleString()}</Text>}
            {discount > 0 && <View style={styles.flashBadge}><Text style={styles.flashText}>-{discount}% Flash</Text></View>}
          </View>

          <Text style={styles.label}>Color</Text>
          <View style={styles.swatchRow}>
            {p.colors.map((c, i) => (
              <TouchableOpacity key={c} style={[styles.swatchRing, color === i && styles.swatchRingActive]} onPress={() => setColor(i)}>
                <View style={[styles.swatch, { backgroundColor: c }]} />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Option</Text>
          <View style={styles.optionRow}>
            {p.options.map((o, i) => (
              <TouchableOpacity key={o} style={[styles.optionPill, option === i && styles.optionPillActive]} onPress={() => setOption(i)}>
                <Text style={[styles.optionText, option === i && styles.optionTextActive]}>{o}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Highlights</Text>
          {p.highlights.map((h) => (
            <View key={h} style={styles.bulletRow}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>{h}</Text>
            </View>
          ))}

          <View style={styles.pickupBox}>
            <View style={styles.pickupRow}>
              <View style={styles.greenDot} />
              <Text style={styles.pickupTitle}>Campus Pickup · UNILAG</Text>
            </View>
            <Text style={styles.pickupSub}>Free shipping from China hub in 5–7 days</Text>
          </View>

          <TouchableOpacity style={styles.reviewsRow} onPress={() => navigation.navigate('Reviews', { id: route.params?.id })}>
            <Text style={styles.reviewsText}>View all {p.reviews.toLocaleString()} reviews</Text>
            <Ionicons name="arrow-forward" size={14} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom action bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.heartBtn} onPress={() => setLiked(!liked)}>
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={20} color={liked ? COLORS.orange : COLORS.navy} />
        </TouchableOpacity>
        <Button variant="outline" title="Add to Cart" onPress={add} style={styles.barBtn} />
        <Button title="Buy Now" onPress={() => { add(); navigation.navigate('Checkout'); }} style={styles.barBtn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  hero: { height: 400, backgroundColor: COLORS.imageBg, position: 'relative' },
  heroImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, resizeMode: 'cover' },
  heroActions: { flexDirection: 'row', paddingTop: 55, paddingHorizontal: 20 },
  floatBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', ...SHADOW.card },
  sheet: { backgroundColor: COLORS.surface, borderTopLeftRadius: RADIUS.sheet, borderTopRightRadius: RADIUS.sheet, marginTop: -18, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 20 },
  handle: { width: 44, height: 4, borderRadius: 2, backgroundColor: COLORS.border, alignSelf: 'center', marginBottom: 16 },
  vendorChip: { alignSelf: 'flex-start', backgroundColor: COLORS.chipBg, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5, marginBottom: 10 },
  vendorChipText: { fontSize: 12, fontWeight: '600', color: COLORS.textLight },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.navy, marginBottom: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  ratingText: { fontSize: 13, color: COLORS.textLight, marginLeft: 5 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' },
  price: { fontSize: 30, fontWeight: '900', color: COLORS.navy },
  oldPrice: { fontSize: 15, color: COLORS.textMuted, textDecorationLine: 'line-through', marginLeft: 10 },
  flashBadge: { backgroundColor: COLORS.orangeSoft, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5, marginLeft: 10 },
  flashText: { fontSize: 12, fontWeight: '700', color: COLORS.orange },
  label: { fontSize: 14, fontWeight: '700', color: COLORS.navy, marginBottom: 10 },
  swatchRow: { flexDirection: 'row', marginBottom: 20 },
  swatchRing: { padding: 3, borderRadius: 22, borderWidth: 2, borderColor: 'transparent', marginRight: 10 },
  swatchRingActive: { borderColor: COLORS.gold },
  swatch: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border },
  optionRow: { flexDirection: 'row', marginBottom: 20 },
  optionPill: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: RADIUS.pill, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surface, marginRight: 10 },
  optionPillActive: { backgroundColor: COLORS.navy, borderColor: COLORS.navy },
  optionText: { fontSize: 13, fontWeight: '700', color: COLORS.navy },
  optionTextActive: { color: '#FFF' },
  bulletRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  bullet: { width: 5, height: 5, borderRadius: 3, backgroundColor: COLORS.textLight, marginRight: 10 },
  bulletText: { fontSize: 14, color: COLORS.textLight, lineHeight: 20 },
  pickupBox: { borderTopWidth: 1, borderTopColor: COLORS.borderLight, marginTop: 14, paddingTop: 16 },
  pickupRow: { flexDirection: 'row', alignItems: 'center' },
  greenDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.success, marginRight: 8 },
  pickupTitle: { fontSize: 14, fontWeight: '700', color: COLORS.navy },
  pickupSub: { fontSize: 13, color: COLORS.textLight, marginTop: 4, marginLeft: 16 },
  reviewsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 16 },
  reviewsText: { fontSize: 13, color: COLORS.textLight, marginRight: 6 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: COLORS.borderLight, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 30 },
  heartBtn: { width: 46, height: 46, borderRadius: 23, borderWidth: 1.5, borderColor: COLORS.navy, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  barBtn: { flex: 1, marginLeft: 6 },
});

export default ProductDetailScreen;
