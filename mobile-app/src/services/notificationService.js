// Core Push Notification Service using Expo Notifications.
// Handles permissions, token generation, and foreground/background listeners.
// Requires: npx expo install expo-notifications

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure how notifications behave when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false, // We handle badges manually if needed
  }),
});

// Register for push notifications and get the Expo Push Token
export const registerForPushNotificationsAsync = async () => {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF6B35', // Bestiez Orange
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.warn('Failed to get push token for push notification!');
    return null;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
};

// Listen for notifications received while the app is in the foreground
export const addNotificationReceivedListener = (callback) => {
  return Notifications.addNotificationReceivedListener(notification => {
    callback(notification);
  });
};

// Listen for when a user TAPS on a notification (Background/Closed state)
export const addNotificationResponseReceivedListener = (callback) => {
  return Notifications.addNotificationResponseReceivedListener(response => {
    callback(response);
  });
};

// Clear all delivered notifications from the tray
export const clearAllNotifications = async () => {
  await Notifications.dismissAllNotificationsAsync();
};
