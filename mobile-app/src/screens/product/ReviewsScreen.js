import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CARD } from '../../utils/colors';
import Header from '../../components/layout/Header';

const MOCK_REVIEWS = [
  { id: 1, user: 'Chinedu O.', avatar: 'https://i.pravatar.cc/100?img=1', rating: 5, date: '2 days ago', comment: 'The quality is insane for the price! Delivery to UNILAG hub was super fast. Highly recommend.' },
  { id: 2, user: 'Aisha M.', avatar: 'https://i.pravatar.cc/100?img=5', rating: 4, date: '1 week ago', comment: 'Love the oversized fit. The material is a bit thin but perfect for Lagos weather.' },
  { id: 3, user: 'Tunde B.', avatar: 'https://i.pravatar.cc/100?img=3', rating: 5, date: '2 weeks ago', comment: 'Bestiez never misses. This is my 3rd order and I am never disappointed.' },
];

const Stars = ({ rating }) => (
  <View style={styles.starsRow}>
    {[1, 2, 3, 4, 5].map((s) => (
      <Ionicons key={s} name={s <= rating ? 'star' : 'star-outline'} size={14} color={COLORS.gold} />
    ))}
  </View>
);

const ReviewsScreen = () => (
  <View style={styles.container}>
    <Header title="Reviews (124)" />

    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
      {/* Rating summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.bigRating}>4.8</Text>
        <View style={styles.starsRowBig}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Ionicons key={s} name="star" size={18} color={COLORS.gold} />
          ))}
        </View>
        <Text style={styles.summaryText}>Based on 124 verified purchases</Text>
      </View>

      {MOCK_REVIEWS.map((review) => (
        <View key={review.id} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Image source={{ uri: review.avatar }} style={styles.avatar} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.userName}>{review.user}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
            <Stars rating={review.rating} />
          </View>
          <Text style={styles.reviewComment}>{review.comment}</Text>
        </View>
      ))}
    </ScrollView>

    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.writeBtn}>
        <Ionicons name="pencil" size={16} color="#FFF" />
        <Text style={styles.writeText}>Write a Review</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  starsRow: { flexDirection: 'row' },
  starsRowBig: { flexDirection: 'row', marginVertical: 8 },
  summaryCard: { ...CARD, margin: 20, padding: 24, alignItems: 'center' },
  bigRating: { fontSize: 46, fontWeight: '900', color: COLORS.navy, lineHeight: 50 },
  summaryText: { fontSize: 13, color: COLORS.textLight, marginTop: 4 },
  reviewCard: { ...CARD, marginHorizontal: 20, marginBottom: 14, padding: 18 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  userName: { fontSize: 15, fontWeight: '700', color: COLORS.navy },
  reviewDate: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  reviewComment: { fontSize: 14, color: COLORS.textDark, lineHeight: 22 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: COLORS.borderLight, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 30 },
  writeBtn: { flexDirection: 'row', backgroundColor: COLORS.orange, paddingVertical: 16, borderRadius: 14, justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.orange, shadowOpacity: 0.25, shadowRadius: 10, elevation: 4 },
  writeText: { color: '#FFF', fontSize: 15, fontWeight: '700', marginLeft: 8 },
});

export default ReviewsScreen;
