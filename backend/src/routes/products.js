const express = require('express');
const router = express.Router();
const {
  getProducts, getProductById, createProduct,
  updateProduct, deleteProduct, getTrendingProducts, getCampusDrops
} = require('../controllers/productController');
const { getProductReviews, createReview } = require('../controllers/reviewController');
const { protect, vendorProtect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const { trackServerEvent } = require('../middleware/analyticsTracker');

// Public routes
router.get('/', getProducts);
router.get('/trending', getTrendingProducts);
router.get('/drops', getCampusDrops);
router.get('/:id', getProductById);
router.get('/:productId/reviews', getProductReviews); 
router.post('/:productId/reviews', protect, trackServerEvent('REVIEW_CREATED'), createReview); 

// Vendor routes
router.post('/', protect, vendorProtect, upload.array('images', 5), trackServerEvent('PRODUCT_SUBMITTED'), createProduct);
router.put('/:id', protect, vendorProtect, upload.array('images', 5), trackServerEvent('PRODUCT_UPDATED'), updateProduct);
router.delete('/:id', protect, vendorProtect, trackServerEvent('PRODUCT_DELETED'), deleteProduct);

module.exports = router;
