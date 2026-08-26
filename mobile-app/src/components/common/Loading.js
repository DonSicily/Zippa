import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../utils/colors';

// Full screen loading overlay
export const FullScreenLoader = () => (
  <View style={styles.overlay}>
    <ActivityIndicator size="large" color={COLORS.primary} />
  </View>
);

// Skeleton loader for product grids
export const ProductSkeleton = () => (
  <View style={styles.skeletonCard}>
    <View style={styles.skeletonImage} />
    <View style={styles.skeletonTextShort} />
    <View style={styles.skeletonTextLong} />
  </View>
);

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // Matches the 48% width in grids

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  skeletonCard: {
    width: cardWidth,
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    elevation: 3,
  },
  skeletonImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    marginBottom: 15,
  },
  skeletonTextShort: {
    width: '60%',
    height: 14,
    backgroundColor: '#E0E0E0',
    borderRadius: 7,
    marginBottom: 10,
  },
  skeletonTextLong: {
    width: '40%',
    height: 18,
    backgroundColor: '#E0E0E0',
    borderRadius: 9,
  },
});
