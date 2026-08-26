module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Add any specific plugins here if needed later (e.g., Reanimated)
      'react-native-reanimated/plugin', 
    ],
  };
};
