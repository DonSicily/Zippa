// FIX: models/Review.js existed (with a post-save hook that recalculates
// product ratings) but had no controller or routes, so it was completely
// unreachable from the API. mobile-app/src/screens/product/ReviewsScreen.js
// renders MOCK_REVIEWS as a result. This wires it up for real.

const Review = require('../models/Review');
const Order = require('../models/Order');

// @desc    Get approved reviews for a product
// @route   GET /api/products/:productId/reviews
// @access  Public
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId, status: 'approved' })
      .populate('user', 'firstName lastName avatar')
      .sort('-createdAt');

    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    console.error('Get product reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a review for a product the user has purchased & received
// @route   POST /api/products/:productId/reviews
// @access  Private
exports.createReview = async (req, res) => {
  try {
    const { orderId, rating, title, comment } = req.body;
    const productId = req.params.productId;

    // Verify the user actually ordered & received this product (verified purchase)
    const order = await Order.findOne({
      _id: orderId,
      user: req.user.id,
      'items.product': productId,
    });

    if (!order) {
      return res.status(403).json({ message: 'You can only review products from your own delivered orders' });
    }

    const review = await Review.create({
      product: productId,
      user: req.user.id,
      order: orderId,
      rating,
      title,
      comment,
    });

    res.status(201).json({ success: true, message: 'Review submitted', data: review });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error creating review' });
  }
};
