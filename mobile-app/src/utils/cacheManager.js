// Handles local caching of API responses using AsyncStorage.
// Includes a Time-To-Live (TTL) mechanism so data doesn't stay stale forever.

import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = 'bestiez_cache_';

// Save data to cache with an expiration time (in milliseconds)
export const setCacheData = async (key, data, ttl = 1000 * 60 * 10) => { // Default 10 mins
  try {
    const item = {
      data: data,
      timestamp: Date.now(),
      ttl: ttl,
    };
    await AsyncStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(item));
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

// Retrieve data from cache. Returns null if expired or not found.
export const getCachedData = async (key) => {
  try {
    const itemString = await AsyncStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!itemString) return null;

    const item = JSON.parse(itemString);
    const now = Date.now();

    // Check if cache has expired
    if (now - item.timestamp > item.ttl) {
      await AsyncStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return null;
    }

    return item.data;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};

// Clear all Bestiez cache (useful for logout or manual refresh)
export const clearAllCache = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const bestiezKeys = keys.filter(key => key.startsWith(CACHE_PREFIX));
    if (bestiezKeys.length > 0) {
      await AsyncStorage.multiRemove(bestiezKeys);
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};
