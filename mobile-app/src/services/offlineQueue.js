// Queues API requests when the user is offline and retries them when connection is restored.
// Crucial for actions like "Add to Cart" or "Submit Review" in dead zones.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api'; // Your main axios instance

const QUEUE_KEY = 'bestiez_offline_queue';

// Add a failed request to the queue
export const addToQueue = async (requestConfig) => {
  try {
    const queueString = await AsyncStorage.getItem(QUEUE_KEY);
    const queue = queueString ? JSON.parse(queueString) : [];
    
    queue.push({
      ...requestConfig,
      queuedAt: Date.now(),
    });
    
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    console.log(`📥 Request queued: ${requestConfig.url}`);
  } catch (error) {
    console.error('Error adding to offline queue:', error);
  }
};

// Process the queue when the user comes back online
export const processQueue = async () => {
  try {
    const queueString = await AsyncStorage.getItem(QUEUE_KEY);
    if (!queueString) return;

    const queue = JSON.parse(queueString);
    if (queue.length === 0) return;

    console.log(`📤 Processing ${queue.length} queued requests...`);
    const newQueue = [];

    for (const request of queue) {
      try {
        // Remove queuedAt before sending
        const { queuedAt, ...config } = request;
        await api(config);
        console.log(`✅ Queued request successful: ${config.url}`);
      } catch (error) {
        // If it fails again, keep it in the queue
        newQueue.push(request);
        console.warn(`❌ Queued request failed again: ${config.url}`);
      }
    }

    // Save the remaining failed requests back to storage
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(newQueue));
  } catch (error) {
    console.error('Error processing offline queue:', error);
  }
};

// Get current queue length (for UI badges)
export const getQueueLength = async () => {
  const queueString = await AsyncStorage.getItem(QUEUE_KEY);
  return queueString ? JSON.parse(queueString).length : 0;
};
