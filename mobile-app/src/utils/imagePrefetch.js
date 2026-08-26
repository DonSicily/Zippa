// Prefetches images from the API response to ensure smooth scrolling in the Product Grid.
// Prevents the "blank image" flicker when a student scrolls down the Home or Search screen.

import { Image } from 'react-native';

// Prefetch an array of image URLs
export const prefetchImages = async (imageUrls = []) => {
  const validUrls = imageUrls.filter(url => typeof url === 'string' && url.startsWith('http'));
  
  const prefetchPromises = validUrls.map(url => 
    Image.prefetch(url).catch(() => {
      // Silently fail if a specific image prefetch fails
      // console.warn(`Failed to prefetch: ${url}`);
    })
  );

  await Promise.all(prefetchPromises);
};

// Extract image URLs from a list of products and prefetch them
export const prefetchProductImages = (products = []) => {
  const imageUrls = [];
  
  products.forEach(product => {
    if (product.images && Array.isArray(product.images)) {
      product.images.forEach(img => {
        if (img.url) imageUrls.push(img.url);
      });
    }
    // Also prefetch the first image if it's directly on the product object
    if (product.image) imageUrls.push(product.image);
  });

  // Only prefetch unique URLs to save bandwidth
  const uniqueUrls = [...new Set(imageUrls)];
  prefetchImages(uniqueUrls);
};
