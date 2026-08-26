// Centralized configuration for the mobile app.
// Change API_URL based on your deployment environment (Local vs Railway Production).

export const API_URL = __DEV__ 
  ? 'http://192.168.1.100:5000/api' // Replace with your local machine's IP for Expo Go
  : 'https://bestiez-api.railway.app/api'; // Your Railway deployed backend URL

export const PAYSTACK_PUBLIC_KEY = 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Replace with your Paystack Public Key

export const APP_CONFIG = {
  appName: 'Bestiez',
  defaultPageSize: 20,
  currency: 'NGN',
  shippingBaseFee: 1500,
  serviceFeePercentage: 0.02,
};

export const CATEGORIES = [
  { id: 'Electronics', name: 'Tech & Gadgets', icon: 'phone-portrait-outline' },
  { id: 'Fashion', name: 'Fashion & Apparel', icon: 'shirt-outline' },
  { id: 'Beauty', name: 'Beauty & Care', icon: 'sparkles-outline' },
  { id: 'Home', name: 'Home & Living', icon: 'home-outline' },
  { id: 'Bags', name: 'Bags & Stationery', icon: 'briefcase-outline' },
];
