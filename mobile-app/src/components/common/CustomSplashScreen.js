// v2 Splash — ivory canvas, navy monogram, gold halo circles, orange loader.
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { COLORS } from '../../utils/colors';

const { width } = Dimensions.get('window');

const CustomSplashScreen = ({ onFinish }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 40, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => {
        if (onFinish) onFinish();
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
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
  container: { ...StyleSheet.absoluteFillObject, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', zIndex: 99999, overflow: 'hidden' },
  bgCircle1: { position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: 150, backgroundColor: COLORS.goldSoft, opacity: 0.7 },
  bgCircle2: { position: 'absolute', bottom: -150, left: -100, width: 400, height: 400, borderRadius: 200, backgroundColor: COLORS.orangeSoft, opacity: 0.6 },
  logoContainer: { alignItems: 'center', zIndex: 2 },
  logoBox: { width: 96, height: 96, borderRadius: 28, backgroundColor: COLORS.navy, justifyContent: 'center', alignItems: 'center', marginBottom: 20, shadowColor: COLORS.navy, shadowOpacity: 0.25, shadowRadius: 20, elevation: 10 },
  logoText: { fontSize: 48, fontWeight: '900', color: '#FFF' },
  brandName: { fontSize: 34, fontWeight: '900', color: COLORS.navy, letterSpacing: 2, marginBottom: 8 },
  tagline: { fontSize: 14, color: COLORS.textLight, fontWeight: '600' },
  loaderContainer: { position: 'absolute', bottom: 100, width: width * 0.6, height: 4, backgroundColor: COLORS.borderLight, borderRadius: 2, overflow: 'hidden' },
  loaderBar: { height: '100%', backgroundColor: COLORS.orange, borderRadius: 2 },
});

export default CustomSplashScreen;
