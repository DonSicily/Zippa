import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../utils/colors';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

import ProductDetailScreen from '../screens/product/ProductDetailScreen';
import CheckoutScreen from '../screens/cart/CheckoutScreen';
import PaymentScreen from '../screens/cart/PaymentScreen';
import OrderTrackingScreen from '../screens/profile/OrderTrackingScreen';
import ReviewsScreen from '../screens/product/ReviewsScreen';
import AddressScreen from '../screens/profile/AddressScreen';
import AmbassadorScreen from '../screens/profile/AmbassadorScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.orange} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user && token ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="Orders" component={OrderTrackingScreen} />
          <Stack.Screen name="Reviews" component={ReviewsScreen} />
          <Stack.Screen name="Addresses" component={AddressScreen} />
          <Stack.Screen name="Ambassador" component={AmbassadorScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
