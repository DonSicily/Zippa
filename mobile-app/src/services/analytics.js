// Centralized Analytics Service.
// Wraps Firebase Analytics (or Mixpanel/Amplitude) to ensure consistent tracking across the app.
// Requires: npm install @react-native-firebase/analytics

import analytics from '@react-native-firebase/analytics';

class AnalyticsService {
  constructor() {
    this.isEnabled = true; // Can be toggled off for GDPR/privacy compliance
  }

  // Track when a user views a specific screen
  async logScreenView(screenName, screenClass) {
    if (!this.isEnabled) return;
    try {
      await analytics().logScreenView({
        screen_name: screenName,
        screen_class: screenClass,
      });
    } catch (error) {
      console.error('Analytics ScreenView Error:', error);
    }
  }

  // Track custom user events (e.g., Add to Cart, Share Referral)
  async logEvent(eventName, params = {}) {
    if (!this.isEnabled) return;
    try {
      // Firebase has strict limits on parameter types (strings, numbers, booleans)
      const sanitizedParams = {};
      for (const [key, value] of Object.entries(params)) {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          sanitizedParams[key] = value;
        }
      }
      await analytics().logEvent(eventName, sanitizedParams);
    } catch (error) {
      console.error('Analytics Event Error:', error);
    }
  }

  // Set user properties for segmentation (e.g., Campus, Ambassador Tier)
  async setUserProperty(name, value) {
    if (!this.isEnabled) return;
    try {
      await analytics().setUserProperty(name, value);
    } catch (error) {
      console.error('Analytics UserProperty Error:', error);
    }
  }

  // Track E-commerce specific events (Standardized)
  async logAddToCart(product) {
    await this.logEvent('add_to_cart', {
      item_id: product._id,
      item_name: product.name,
      item_category: product.category,
      price: product.price.discountPrice || product.price.retailPrice,
      currency: 'NGN',
    });
  }

  async logPurchase(order) {
    await this.logEvent('purchase', {
      transaction_id: order.orderNumber,
      value: order.pricing.total,
      currency: 'NGN',
      tax: order.pricing.serviceFee,
      shipping: order.pricing.shippingFee,
    });
  }
}

export default new AnalyticsService();
