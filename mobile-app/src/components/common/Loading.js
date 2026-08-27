import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { COLORS, RADIUS } from '../../utils/colors';

export const FullScreenLoader = () => (
  <View style={styles.overlay}>
    <ActivityIndicator size="large" color={COLORS.orange} />
  </View>
);

export const ProductSkeleton = () => (
  <View style={styles.skeletonCard}>
    <View style={styles.skeletonImage} />
    <View style={styles.skeletonTextShort} />
    <View style={styles.skeletonTextLong} />
  </View>
);

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(246, 241, 232, 0.85)', justifyContent: 'center', alignItems: 'center', zIndex: 999 },
  skeletonCard: { width: cardWidth, backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: COLORS.borderLight },
  skeletonImage: { width: '100%', height: 120, backgroundColor: COLORS.imageBg, borderRadius: RADIUS.md, marginBottom: 12 },
  skeletonTextShort: { width: '80%', height: 12, backgroundColor: COLORS.chipBg, borderRadius: 6, marginBottom: 8 },
  skeletonTextLong: { width: '50%', height: 14, backgroundColor: COLORS.chipBg, borderRadius: 7 },
});
