const express = require('express');
const router = express.Router();
const { 
  getProducts, getProductById, createProduct, 
  updateProduct, deleteProduct, getTrendingProducts, getCampusDrops 
} = require('../controllers/productController');
// FIX: reviewController existed nowhere in the routing layer — wired up
// here since reviews are naturally nested under a product.
const { getProductReviews, createReview } = require('../controllers/reviewController');
const { protect, vendorProtect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// Public routes
router.get('/', getProducts);
router.get('/trending', getTrendingProducts);
router.get('/drops', getCampusDrops);
router.get('/:id', getProductById);
router.get('/:productId/reviews', getProductReviews); // FIX: was missing
router.post('/:productId/reviews', protect, createReview); // FIX: was missing

// Vendor routes
router.post('/', protect, vendorProtect, upload.array('images', 5), createProduct);
router.put('/:id', protect, vendorProtect, upload.array('images', 5), updateProduct);
router.delete('/:id', protect, vendorProtect, deleteProduct);

module.exports = router;
