// Backend service to send Push Notifications via Expo's Push API.
// Requires: npm install expo-server-sdk

const { Expo } = require('expo-server-sdk');
const User = require('../models/User');

// Create a new Expo SDK client
const expo = new Expo();

/**
 * Send a push notification to a specific user
 */
exports.sendNotificationToUser = async (userId, title, body, data = {}) => {
  try {
    const user = await User.findById(userId);
    if (!user || !user.pushToken) return;

    const message = {
      to: user.pushToken,
      sound: 'default',
      title,
      body,
      data, // Pass deep linking data (e.g., { screen: 'ProductDetail', productId: '123' })
    };

    // Validate token
    if (!Expo.isExpoPushToken(user.pushToken)) {
      console.error(`Push token ${user.pushToken} is not a valid Expo push token`);
      return;
    }

    const chunks = expo.chunkPushNotifications([message]);
    const tickets = [];
    
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error('Error sending push notification chunk:', error);
      }
    }
    
    return tickets;
  } catch (error) {
    console.error('Failed to send user notification:', error);
  }
};

/**
 * Broadcast a notification to multiple users (e.g., all students in a specific campus)
 */
exports.sendBroadcastNotification = async (userIds, title, body, data = {}) => {
  try {
    const users = await User.find({ _id: { $in: userIds }, pushToken: { $exists: true, $ne: null } });
    
    const messages = users.map(user => ({
      to: user.pushToken,
      sound: 'default',
      title,
      body,
      data,
    }));

    const chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error('Error sending broadcast chunk:', error);
      }
    }
    
    console.log(` Broadcast sent to ${users.length} users.`);
    return tickets;
  } catch (error) {
    console.error('Failed to send broadcast notification:', error);
  }
};

/**
 * Trigger a Flash Drop notification for a specific campus
 */
exports.sendCampusFlashDrop = async (campusId, dropTitle, dropMessage) => {
  // Find all students in this campus
  const students = await User.find({ campus: campusId, role: 'student' }).select('_id');
  const studentIds = students.map(s => s._id);
  
  return this.sendBroadcastNotification(studentIds, `🔥 ${dropTitle}`, dropMessage, { screen: 'CampusDrops' });
};
