// Custom hook to monitor network connectivity and trigger offline queue processing.
// Requires: npm install @react-native-community/netinfo

import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { processQueue } from '../services/offlineQueue';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [networkType, setNetworkType] = useState('wifi');

  useEffect(() => {
    // Handle initial state
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected && state.isInternetReachable !== false;
      setIsConnected(connected);
      setNetworkType(state.type);

      // If we just reconnected, process the offline queue
      if (connected) {
        processQueue();
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { isConnected, networkType };
};
