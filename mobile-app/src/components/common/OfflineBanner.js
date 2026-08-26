// A sleek, non-intrusive banner that slides down when the user loses internet.
// Uses the Gen-Z color palette but with a warning tone.

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { COLORS } from '../../utils/colors';

const OfflineBanner = () => {
  const { isConnected } = useNetworkStatus();

  if (isConnected) return null;

  return (
    <View style={styles.container}>
      <Ionicons name="wifi-outline" size={18} color="#FFF" />
      <Text style={styles.text}>You're offline. Changes will sync automatically.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50, // Below the status bar
    left: 20,
    right: 20,
    backgroundColor: COLORS.textDark, // Dark slate for high contrast
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  text: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default OfflineBanner;
