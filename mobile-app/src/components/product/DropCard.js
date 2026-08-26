import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/colors';

const DropCard = ({ drop, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: drop.color || '#E0D4FC' }]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      {drop.image && <Image source={{ uri: drop.image }} style={styles.image} />}
      <View style={styles.content}>
        <Text style={styles.title}>{drop.title}</Text>
        <Text style={styles.subtitle}>{drop.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 220,
    height: 280,
    borderRadius: 30,
    marginRight: 15,
    padding: 15,
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute', top: 20, left: 20, right: 20, height: 180,
    borderRadius: 20,
  },
  content: { zIndex: 2 },
  title: { fontSize: 22, fontWeight: '900', color: COLORS.textDark, marginBottom: 4 },
  subtitle: { fontSize: 14, color: COLORS.textDark, fontWeight: '600' },
});

export default DropCard;
