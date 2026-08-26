import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';
import { useCart } from '../context/CartContext';
// FIX: usePushNotifications() calls useNavigation(), which only works
// inside a component rendered under NavigationContainer. AppNavigator.js
// renders NavigationContainer itself, so the hook can't be called there —
// TabNavigator (only ever rendered for authenticated users) is the right
// place to register the push token.
import { usePushNotifications } from '../hooks/usePushNotifications';

// Import Main Screens (We will build these in Batch 8 & 9)
import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/home/SearchScreen';
import CampusDropsScreen from '../screens/home/CampusDropsScreen';
import CartScreen from '../screens/cart/CartScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

// Custom Floating Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { cartCount } = useCart();

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Center "Drops" Button Logic
          if (route.name === 'Drops') {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.centerButton}
                activeOpacity={0.8}
              >
                <Ionicons name="bag-handle" size={26} color="#FFF" />
              </TouchableOpacity>
            );
          }

          // Standard Icons
          let iconName;
          if (route.name === 'Home') iconName = isFocused ? 'home' : 'home-outline';
          if (route.name === 'Search') iconName = isFocused ? 'search' : 'search-outline';
          if (route.name === 'Cart') iconName = isFocused ? 'cart' : 'cart-outline';
          if (route.name === 'Profile') iconName = isFocused ? 'person' : 'person-outline';

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={iconName} 
                size={26} 
                color={isFocused ? COLORS.primary : COLORS.textLight} 
              />
              {route.name === 'Cart' && cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount > 9 ? '9+' : cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const TabNavigator = () => {
  usePushNotifications(); // registers/refreshes the Expo push token with the backend

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Drops" component={CampusDropsScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerButton: {
    backgroundColor: COLORS.primary,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30, // Floats above the bar
    shadowColor: COLORS.primary,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: 15,
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default TabNavigator;
