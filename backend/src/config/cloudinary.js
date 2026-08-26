const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload options for product images
const uploadOptions = {
  folder: 'bestiez/products',
  transformation: [
    { width: 800, height: 800, crop: 'fill', quality: 'auto' },
    { fetch_format: 'auto' }
  ],
  allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  max_file_size: 5000000, // 5MB
};

// Upload multiple images
const uploadMultiple = async (files) => {
  const uploadPromises = files.map(file => 
    cloudinary.uploader.upload(file.path, uploadOptions)
  );
  return await Promise.all(uploadPromises);
};

// Delete images
const deleteImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

module.exports = {
  cloudinary,
  uploadOptions,
  uploadMultiple,
  deleteImage,
};
