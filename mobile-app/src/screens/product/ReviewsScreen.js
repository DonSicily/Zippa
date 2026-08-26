import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/colors';

const MOCK_REVIEWS = [
  { id: 1, user: 'Chinedu O.', avatar: 'https://i.pravatar.cc/100?img=1', rating: 5, date: '2 days ago', comment: 'The quality is insane for the price! Delivery to UNILAG hub was super fast. Highly recommend.' },
  { id: 2, user: 'Aisha M.', avatar: 'https://i.pravatar.cc/100?img=5', rating: 4, date: '1 week ago', comment: 'Love the oversized fit. The material is a bit thin but perfect for Lagos weather.' },
  { id: 3, user: 'Tunde B.', avatar: 'https://i.pravatar.cc/100?img=3', rating: 5, date: '2 weeks ago', comment: 'Bestiez never misses. This is my 3rd order and I am never disappointed.' },
];

const ReviewsScreen = () => {
  const navigation = useNavigation();

  const renderStars = (rating) => {
    return (
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons 
            key={star} 
            name={star <= rating ? 'star' : 'star-outline'} 
            size={16} 
            color={COLORS.highlightDark} 
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews (124)</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Rating Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.bigRating}>4.8</Text>
          {renderStars(5)}
          <Text style={styles.summaryText}>Based on 124 verified purchases</Text>
        </View>

        {/* Review List */}
        <View style={styles.reviewsList}>
          {MOCK_REVIEWS.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image source={{ uri: review.avatar }} style={styles.avatar} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.userName}>{review.user}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                {renderStars(review.rating)}
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sticky Write Review Button */}
      <View style={styles.bottomAction}>
        <TouchableOpacity style={styles.writeBtn}>
          <Ionicons name="pencil" size={20} color="#FFF" />
          <Text style={styles.writeText}>Write a Review</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textDark },
  summaryCard: { backgroundColor: '#FFF', margin: 20, padding: 24, borderRadius: 24, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, elevation: 3 },
  bigRating: { fontSize: 48, fontWeight: '900', color: COLORS.textDark, lineHeight: 50 },
  starsRow: { flexDirection: 'row', marginVertical: 8 },
  summaryText: { fontSize: 14, color: COLORS.textLight },
  reviewsList: { paddingHorizontal: 20 },
  reviewCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 20, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.03, elevation: 2 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  userName: { fontSize: 15, fontWeight: '700', color: COLORS.textDark },
  reviewDate: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },
  reviewComment: { fontSize: 14, color: COLORS.textDark, lineHeight: 22 },
  bottomAction: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 15, elevation: 10 },
  writeBtn: { flexDirection: 'row', backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 20, justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  writeText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
});

export default ReviewsScreen;
