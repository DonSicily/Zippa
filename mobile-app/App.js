// FIX: this file did not exist anywhere in the extracted codebase.
// package.json's "main" is "node_modules/expo/AppEntry.js", which loads
// App.js from the project root by convention — without it, Expo has
// nothing to boot and `expo start` fails immediately.
//
// This wires together everything that WAS built but never connected:
// AuthProvider/CartProvider (context), the custom animated splash screen,
// the offline banner, the global error boundary, and the navigator.

import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ErrorBoundary from './src/components/common/ErrorBoundary';
import CustomSplashScreen from './src/components/common/CustomSplashScreen';
import OfflineBanner from './src/components/common/OfflineBanner';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (showSplash) {
    return (
      <ErrorBoundary>
        <CustomSplashScreen onFinish={handleSplashFinish} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <AuthProvider>
            <CartProvider>
              <StatusBar style="dark" />
              <OfflineBanner />
              <AppNavigator />
            </CartProvider>
          </AuthProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
