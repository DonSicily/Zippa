// A custom, playful in-app banner for foreground notifications.
// Replaces the default, boring OS notification when the user is actively using the app.

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../utils/colors';

const NotificationBanner = ({ notification, onClose }) => {
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    if (notification) {
      // Slide down
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start();

      // Auto dismiss after 4 seconds
      const timer = setTimeout(() => {
        hideBanner();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const hideBanner = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onClose) onClose();
    });
  };

  if (!notification) return null;

  const title = notification.request.content.title || 'Bestiez Update';
  const body = notification.request.content.body || 'You have a new notification.';

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
      <View style={styles.iconContainer}>
        <Ionicons name="notifications" size={24} color="#FFF" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.body} numberOfLines={2}>{body}</Text>
      </View>
      <TouchableOpacity onPress={hideBanner} style={styles.closeBtn}>
        <Ionicons name="close" size={20} color="#FFF" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: COLORS.textDark, // Dark slate
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    zIndex: 10000,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.accent, // Vibrant Mint
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textContainer: { flex: 1, marginRight: 10 },
  title: { color: '#FFF', fontSize: 15, fontWeight: '800', marginBottom: 4 },
  body: { color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 18 },
  closeBtn: { padding: 4 },
});

export default NotificationBanner;
