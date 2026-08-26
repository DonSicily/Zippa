import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../utils/colors';

import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

const AppNavigator = () => {
  const { user, token, loading } = useAuth();

  // Show a simple loading screen while checking auth state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* If user is logged in, show Main App. If not, show Auth Flow. */}
      {user && token ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
