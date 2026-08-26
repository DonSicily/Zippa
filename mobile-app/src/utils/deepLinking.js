// Deep Linking Configuration for React Navigation.
// Maps incoming URLs (from WhatsApp, Instagram, SMS) to specific app screens.

const linking = {
  // Define the URL schemes your app responds to
  prefixes: [
    'bestiez://', 
    'https://bestiez.com', 
    'https://www.bestiez.com',
    'exp://192.168.1.100:8081' // Expo Dev client
  ],
  
  // Map URL paths to Navigation routes
  config: {
    screens: {
      Home: '',
      Search: 'search',
      Drops: 'drops',
      Cart: 'cart',
      Profile: 'profile',
      
      // Nested routes
      ProductDetail: {
        path: 'product/:id',
        parse: { id: (id) => `${id}` },
      },
      ProductList: 'category/:category',
      OrderTracking: 'order/:orderId',
      Ambassador: 'ambassador/:referralCode',
      CampusSelector: 'campus/select',
    },
  },
};

export default linking;

/* 
  HOW TO USE:
  1. Share a product on WhatsApp: "Check this out! https://bestiez.com/product/64f8a9b2c1d4e5f6a7b8c9d0"
  2. When the student clicks the link, the OS opens the Bestiez app.
  3. React Navigation automatically routes them to the ProductDetail screen with the correct ID.
*/
