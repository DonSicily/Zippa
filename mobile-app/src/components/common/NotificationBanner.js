import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOW } from '../../utils/colors';

const NotificationBanner = ({ notification, onClose }) => {
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    if (notification) {
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, friction: 8, tension: 40 }).start();
      const timer = setTimeout(() => hideBanner(), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const hideBanner = () => {
    Animated.timing(slideAnim, { toValue: -100, duration: 300, useNativeDriver: true }).start(() => {
      if (onClose) onClose();
    });
  };

  if (!notification) return null;
  const title = notification.request?.content?.title || 'Bestiez Update';
  const body = notification.request?.content?.body || 'You have a new notification.';

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
      <View style={styles.iconContainer}>
        <Ionicons name="notifications" size={20} color="#FFF" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.body} numberOfLines={2}>{body}</Text>
      </View>
      <TouchableOpacity onPress={hideBanner} style={styles.closeBtn}>
        <Ionicons name="close" size={18} color={COLORS.textMuted} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', top: 50, left: 20, right: 20,
    backgroundColor: COLORS.surface, flexDirection: 'row', alignItems: 'center',
    padding: 14, borderRadius: RADIUS.lg, zIndex: 10000,
    borderWidth: 1, borderColor: COLORS.borderLight, ...SHADOW.bar,
  },
  iconContainer: { width: 38, height: 38, borderRadius: 12, backgroundColor: COLORS.navy, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  textContainer: { flex: 1, marginRight: 10 },
  title: { color: COLORS.navy, fontSize: 14, fontWeight: '800', marginBottom: 2 },
  body: { color: COLORS.textLight, fontSize: 12, lineHeight: 16 },
  closeBtn: { padding: 4 },
});

export default NotificationBanner;
