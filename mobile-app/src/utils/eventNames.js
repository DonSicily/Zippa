// Standardized Event Schema.
// Prevents typos in event names and ensures the data team gets clean, consistent data.

export const EVENT_NAMES = {
  // App Engagement
  APP_OPEN: 'app_open',
  APP_BACKGROUND: 'app_background',
  
  // Browsing & Discovery
  CAMPUS_DROP_VIEW: 'campus_drop_view',
  PRODUCT_DETAIL_VIEW: 'product_detail_view',
  SEARCH_QUERY: 'search_query',
  CATEGORY_FILTER: 'category_filter',
  
  // Cart & Checkout Funnel
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  VIEW_CART: 'view_cart',
  CHECKOUT_STARTED: 'checkout_started',
  PAYMENT_METHOD_SELECTED: 'payment_method_selected',
  
  // Conversion & Revenue
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',
  ORDER_CANCELLED: 'order_cancelled',
  
  // Ambassador & Social
  AMBASSADOR_CODE_COPIED: 'ambassador_code_copied',
  AMBASSADOR_SHARE_CLICKED: 'ambassador_share_clicked',
  REFERRAL_SIGNUP: 'referral_signup',
};

// Standard Event Properties Schema
export const EVENT_PROPERTIES = {
  product_id: 'string',
  product_name: 'string',
  category: 'string',
  price: 'number',
  campus_name: 'string',
  payment_method: 'string',
  order_value: 'number',
  referral_code: 'string',
};
