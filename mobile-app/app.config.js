// Dynamic Expo configuration to handle environment variables securely.
// Replaces the static app.json file.

export default {
  name: 'Bestiez',
  slug: 'bestiez',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './src/assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './src/assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#6C63FF' // Playful Purple
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.bestiez.app'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src/assets/adaptive-icon.png',
      backgroundColor: '#6C63FF'
    },
    package: 'com.bestiez.app'
  },
  web: {
    favicon: './src/assets/favicon.png'
  },
  extra: {
    apiUrl: process.env.API_URL || 'http://localhost:5000/api',
    paystackKey: process.env.PAYSTACK_PUBLIC_KEY || 'pk_test_xxx',
    eas: {
      projectId: "your-eas-project-id" // Get this from eas init
    }
  }
};
