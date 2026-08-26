const Product = require('../models/Product');
const Vendor = require('../models/Vendor');
const { uploadMultiple, deleteImage } = require('../config/cloudinary');

// @desc    Get all approved products (with filtering/pagination)
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const { 
      category, subcategory, minPrice, maxPrice, 
      search, sortBy = '-createdAt', page = 1, limit = 20 
    } = req.query;

    const filter = { status: 'approved' };

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (minPrice || maxPrice) {
      filter['price.retailPrice'] = {};
      if (minPrice) filter['price.retailPrice'].$gte = Number(minPrice);
      if (maxPrice) filter['price.retailPrice'].$lte = Number(maxPrice);
    }
    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('vendor', 'companyName location')
        .sort(sortBy)
        .skip(skip)
        .limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: Number(limit),
      },
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error fetching products' });
  }
};

// @desc    Get single product details
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('vendor', 'companyName location contactPerson')
      .populate('approvedBy', 'firstName lastName');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Increment view count
    await product.incrementViews();

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Get product by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create product (Vendor only)
// @route   POST /api/products
// @access  Private/Vendor
exports.createProduct = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.user.id);
    if (!vendor || vendor.status !== 'approved') {
      return res.status(403).json({ message: 'Only approved vendors can create products' });
    }

    // Handle image uploads if files exist
    let images = [];
    if (req.files && req.files.length > 0) {
      const uploadedImages = await uploadMultiple(req.files);
      images = uploadedImages.map(img => ({
        url: img.secure_url,
        publicId: img.public_id,
      }));
    }

    const productData = {
      ...req.body,
      vendor: req.user.id,
      images,
      price: JSON.parse(req.body.price || '{}'),
      inventory: JSON.parse(req.body.inventory || '{}'),
      dimensions: JSON.parse(req.body.dimensions || '{}'),
      shipping: JSON.parse(req.body.shipping || '{}'),
      quality: JSON.parse(req.body.quality || '{}'),
      specifications: JSON.parse(req.body.specifications || '{}'),
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created and pending approval',
      data: product,
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error creating product' });
  }
};

// @desc    Update product (Vendor only)
// @route   PUT /api/products/:id
// @access  Private/Vendor
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check ownership
    if (product.vendor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      // Delete old images from Cloudinary
      for (const img of product.images) {
        if (img.publicId) await deleteImage(img.publicId);
      }

      const uploadedImages = await uploadMultiple(req.files);
      req.body.images = uploadedImages.map(img => ({
        url: img.secure_url,
        publicId: img.public_id,
      }));
    }

    // Parse nested objects if sent as strings
    if (req.body.price) req.body.price = JSON.parse(req.body.price);
    if (req.body.inventory) req.body.inventory = JSON.parse(req.body.inventory);
    if (req.body.dimensions) req.body.dimensions = JSON.parse(req.body.dimensions);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error updating product' });
  }
};

// @desc    Delete product (Vendor only)
// @route   DELETE /api/products/:id
// @access  Private/Vendor
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.vendor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    // Delete images from Cloudinary
    for (const img of product.images) {
      if (img.publicId) await deleteImage(img.publicId);
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error deleting product' });
  }
};

// @desc    Get trending products
// @route   GET /api/products/trending
// @access  Public
exports.getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ 
      status: 'approved', 
      isTrending: true 
    })
      .populate('vendor', 'companyName')
      .sort({ 'stats.purchases': -1 })
      .limit(10);

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Get trending products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get featured/campus drops
// @route   GET /api/products/drops
// @access  Public
exports.getCampusDrops = async (req, res) => {
  try {
    const drops = await Product.find({ 
      status: 'approved', 
      isFeatured: true 
    })
      .populate('vendor', 'companyName')
      .sort({ createdAt: -1 })
      .limit(12);

    res.json({
      success: true,
      data: drops,
    });
  } catch (error) {
    console.error('Get campus drops error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
