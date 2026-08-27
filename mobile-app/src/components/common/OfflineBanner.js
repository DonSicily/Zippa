import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { COLORS, RADIUS } from '../../utils/colors';

const OfflineBanner = () => {
  const { isConnected } = useNetworkStatus();
  if (isConnected) return null;

  return (
    <View style={styles.container}>
      <Ionicons name="wifi-outline" size={16} color={COLORS.gold} />
      <Text style={styles.text}>You're offline. Changes will sync automatically.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', top: 50, left: 20, right: 20,
    backgroundColor: COLORS.navy, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 16,
    borderRadius: RADIUS.pill, zIndex: 9999,
  },
  text: { color: '#FFF', fontSize: 12, fontWeight: '700', marginLeft: 8 },
});

export default OfflineBanner;
