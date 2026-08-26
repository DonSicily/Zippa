// Automated quality check flags for the Admin Dashboard
exports.runQualityCheck = (productData) => {
  const flags = [];

  if (!productData.images || productData.images.length < 3) {
    flags.push('Product requires at least 3 high-quality images.');
  }

  if (productData.description && productData.description.length < 50) {
    flags.push('Product description is too short. Minimum 50 characters.');
  }

  if (productData.price && productData.price.retailPrice > 100000) {
    flags.push('High-value item: Requires manual admin verification.');
  }

  if (!productData.dimensions || !productData.dimensions.weight) {
    flags.push('Missing weight/dimensions. Required for accurate shipping calculation.');
  }

  return {
    passed: flags.length === 0,
    flags,
  };
};
