// Custom hook bridging the Zustand store with the Login UI and API.
// Handles the actual authentication flow, token storage, and error management.

import { useState } from 'react';
import { useVendorStore } from '../store/vendorStore';
import api from '../services/api';

export const useVendorAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setAuth, logout } = useVendorStore();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Call the backend login endpoint
      const response = await api.post('/vendors/login', { email, password });
      const { token, vendor } = response.data.data;

      // Save to localStorage for Axios interceptors
      localStorage.setItem('bestiez_vendor_token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Save to Zustand store
      setAuth(token, vendor);
      
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Invalid credentials or account not approved.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    delete api.defaults.headers.common['Authorization'];
    logout();
  };

  return { login, handleLogout, loading, error };
};
