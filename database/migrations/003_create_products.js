// Creates critical text-search and filtering indexes for the student app.
require('dotenv').config({ path: '../../backend/.env' });
const mongoose = require('mongoose');

const ProductSchema = require('../../backend/src/models/Product');

const runMigration = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for Product Migration');

    const Product = mongoose.model('Product', ProductSchema);

    // Text Index for Search Bar (Name & Description)
    await Product.collection.createIndex({ name: 'text', description: 'text' });
    
    // Compound Indexes for Fast Filtering (Category + Status)
    await Product.collection.createIndex({ category: 1, status: 1 });
    await Product.collection.createIndex({ vendor: 1, status: 1 });
    
    // Sorting Indexes
    await Product.collection.createIndex({ 'price.retailPrice': 1 });
    await Product.collection.createIndex({ createdAt: -1 });
    await Product.collection.createIndex({ 'stats.purchases': -1 }); // For trending
    
    console.log('🔍 Product search and filter indexes created successfully.');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

runMigration();
