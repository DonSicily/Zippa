import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';
import { useCart } from '../context/CartContext';
import { usePushNotifications } from '../hooks/usePushNotifications';

import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/home/SearchScreen';
import CampusDropsScreen from '../screens/home/CampusDropsScreen';
import CartScreen from '../screens/cart/CartScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

// v2 Tab Bar — flat white bar, labeled tabs, navy active + dot, orange cart badge
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { cartCount } = useCart();

  return (
    <View style={styles.barWrap}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
          };

          const icon = { Home: 'home', Search: 'search', Drops: 'bag-handle', Cart: 'cart', Profile: 'person' }[route.name] || 'ellipse';

          return (
            <TouchableOpacity key={route.key} onPress={onPress} style={styles.tab} activeOpacity={0.7}>
              <View style={styles.iconWrap}>
                <Ionicons
                  name={isFocused ? icon : `${icon}-outline`}
                  size={22}
                  color={isFocused ? COLORS.navy : COLORS.textMuted}
                />
                {route.name === 'Cart' && cartCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartCount > 9 ? '9+' : cartCount}</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.label, isFocused && styles.labelActive]}>{route.name}</Text>
              <View style={[styles.dot, isFocused && styles.dotActive]} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const TabNavigator = () => {
  usePushNotifications();
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Drops" component={CampusDropsScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  barWrap: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1, borderTopColor: COLORS.borderLight,
    paddingTop: 10, paddingBottom: 26,
  },
  bar: { flexDirection: 'row' },
  tab: { flex: 1, alignItems: 'center' },
  iconWrap: { position: 'relative' },
  badge: {
    position: 'absolute', top: -7, right: -12,
    backgroundColor: COLORS.orange, borderRadius: 9,
    minWidth: 18, height: 18, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4,
  },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  label: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted, marginTop: 4 },
  labelActive: { color: COLORS.navy, fontWeight: '700' },
  dot: { width: 4, height: 4, borderRadius: 2, marginTop: 4, backgroundColor: 'transparent' },
  dotActive: { backgroundColor: COLORS.navy },
});

export default TabNavigator;
