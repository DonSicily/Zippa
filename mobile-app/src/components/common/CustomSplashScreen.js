// A custom, animated splash screen that plays while the app loads initial data.
// Replaces the default static Expo splash with a branded, Gen-Z experience.

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { COLORS } from '../../utils/colors';

const { width, height } = Dimensions.get('window');

const CustomSplashScreen = ({ onFinish }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    // Run entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 40, useNativeDriver: true }),
    ]).start();

    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        if (onFinish) onFinish();
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Background Gradient Simulation */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      <Animated.View style={[styles.logoContainer, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>B</Text>
        </View>
        <Text style={styles.brandName}>BESTIEZ</Text>
        <Text style={styles.tagline}>Factory Direct. Campus Ready.</Text>
      </Animated.View>

      <View style={styles.loaderContainer}>
        <Animated.View style={[styles.loaderBar, { width: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
    overflow: 'hidden',
  },
  bgCircle1: { position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: 150, backgroundColor: COLORS.accent, opacity: 0.2 },
  bgCircle2: { position: 'absolute', bottom: -150, left: -100, width: 400, height: 400, borderRadius: 200, backgroundColor: '#FFF', opacity: 0.1 },
  logoContainer: { alignItems: 'center', zIndex: 2 },
  logoBox: { width: 100, height: 100, borderRadius: 30, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 20, elevation: 10 },
  logoText: { fontSize: 50, fontWeight: '900', color: COLORS.primary },
  brandName: { fontSize: 36, fontWeight: '900', color: '#FFF', letterSpacing: 2, marginBottom: 8 },
  tagline: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: '600' },
  loaderContainer: { position: 'absolute', bottom: 100, width: width * 0.6, height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2, overflow: 'hidden' },
  loaderBar: { height: '100%', backgroundColor: COLORS.accent, borderRadius: 2 },
});

export default CustomSplashScreen;
