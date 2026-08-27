import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SHADOW } from '../../utils/colors';

// v2 Drop Card — navy canvas, gold subtitle, framed image
const DropCard = ({ drop, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
    {drop.image && <Image source={{ uri: drop.image }} style={styles.image} />}
    <View style={styles.content}>
      <Text style={styles.title}>{drop.title}</Text>
      <Text style={styles.subtitle}>{drop.subtitle}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: 200, height: 240, borderRadius: RADIUS.xl,
    backgroundColor: COLORS.navy, marginRight: 12, padding: 12,
    justifyContent: 'flex-end', overflow: 'hidden', ...SHADOW.card,
  },
  image: { position: 'absolute', top: 12, left: 12, right: 12, height: 150, borderRadius: 14 },
  content: { zIndex: 2 },
  title: { fontSize: 18, fontWeight: '800', color: '#FFF', marginBottom: 2 },
  subtitle: { fontSize: 12, fontWeight: '700', color: COLORS.gold },
});

export default DropCard;
