import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../utils/colors';

// Navigators
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

// Stack Screens: Product
import ProductListScreen from '../screens/product/ProductListScreen';
import ProductDetailScreen from '../screens/product/ProductDetailScreen';
import ReviewsScreen from '../screens/product/ReviewsScreen';

// Stack Screens: Cart & Checkout
import CheckoutScreen from '../screens/cart/CheckoutScreen';
import PaymentScreen from '../screens/cart/PaymentScreen';

// Stack Screens: Profile & Settings
import OrdersScreen from '../screens/profile/OrdersScreen';
import OrderTrackingScreen from '../screens/profile/OrderTrackingScreen';
import AddressScreen from '../screens/profile/AddressScreen';
import AmbassadorScreen from '../screens/profile/AmbassadorScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import CampusSelectorScreen from '../screens/campus/CampusSelectorScreen';

// Stack Screens: Wallet (NEW)
import WalletScreen from '../screens/wallet/WalletScreen';
import FundWalletScreen from '../screens/wallet/FundWalletScreen';
import TransactionHistoryScreen from '../screens/wallet/TransactionHistoryScreen';

// Stack Screens: Legal
import AboutScreen from '../screens/legal/AboutScreen';
import TermsAndPrivacyScreen from '../screens/legal/TermsAndPrivacyScreen';

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
          {/* Main Tab Navigator */}
          <Stack.Screen name="Main" component={TabNavigator} />
          
          {/* Product Flow */}
          <Stack.Screen name="ProductList" component={ProductListScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="Reviews" component={ReviewsScreen} />
          
          {/* Checkout Flow */}
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          
          {/* Profile & Account Management */}
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
          <Stack.Screen name="Addresses" component={AddressScreen} />
          <Stack.Screen name="Ambassador" component={AmbassadorScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="CampusSelector" component={CampusSelectorScreen} />
          
          {/* 💰 Wallet Flow */}
          <Stack.Screen name="Wallet" component={WalletScreen} />
          <Stack.Screen name="FundWallet" component={FundWalletScreen} />
          <Stack.Screen name="Transactions" component={TransactionHistoryScreen} />
          
          {/* Legal & Info */}
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Terms" component={TermsAndPrivacyScreen} />
        </Stack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
