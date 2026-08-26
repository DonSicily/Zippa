// Custom hook to initialize notifications on app launch and sync the token with the backend.

import { useEffect, useRef } from 'react';
import { registerForPushNotificationsAsync, addNotificationReceivedListener, addNotificationResponseReceivedListener } from '../services/notificationService';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export const usePushNotifications = () => {
  const navigation = useNavigation();
  const { user, token } = useAuth();
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (!user || !token) return;

    // 1. Get Token and send to backend
    const setupNotifications = async () => {
      const expoPushToken = await registerForPushNotificationsAsync();
      
      if (expoPushToken) {
        try {
          // Save the token to the user's profile on the backend
          await api.put('/auth/push-token', { pushToken: expoPushToken });
        } catch (error) {
          console.error('Failed to save push token to backend:', error);
        }
      }
    };

    setupNotifications();

    // 2. Foreground Listener (Triggers our custom in-app banner)
    notificationListener.current = addNotificationReceivedListener(notification => {
      // We can trigger a custom UI state here to show our Gen-Z banner
      console.log('Foreground notification received:', notification);
    });

    // 3. Background/Closed Tap Listener (Handles Deep Linking navigation)
    responseListener.current = addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      
      if (data?.screen === 'ProductDetail') {
        navigation.navigate('ProductDetail', { id: data.productId });
      } else if (data?.screen === 'CampusDrops') {
        navigation.navigate('Drops');
      } else if (data?.screen === 'OrderTracking') {
        navigation.navigate('Orders');
      }
    });

    // Cleanup listeners on unmount
    return () => {
      if (notificationListener.current) Notifications.removeNotificationSubscription(notificationListener.current);
      if (responseListener.current) Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [user, token]);
};
