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
import { COLORS } from './src/utils/colors';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashFinish = useCallback(() => setShowSplash(false), []);

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
              <StatusBar style="dark" backgroundColor={COLORS.background} />
              <OfflineBanner />
              <AppNavigator />
            </CartProvider>
          </AuthProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
