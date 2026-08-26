// Calculate shipping cost based on weight and destination
exports.calculateShipping = (weightInKg, destinationState) => {
  const baseRate = 1500; // Base fee in NGN
  const ratePerKg = 500; // Additional fee per kg
  
  // Adjust for remote states (simplified logic)
  const remoteStates = ['Sokoto', 'Borno', 'Yobe', 'Taraba', 'Bauchi'];
  const multiplier = remoteStates.includes(destinationState) ? 1.5 : 1;

  const cost = (baseRate + (weightInKg * ratePerKg)) * multiplier;
  return Math.ceil(cost);
};

// Calculate volumetric weight for bulky items
exports.calculateVolumetricWeight = (length, width, height) => {
  // (L x W x H) / 5000 for air freight
  return (length * width * height) / 5000;
};
