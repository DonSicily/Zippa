// Creates indexes for vendor performance tracking and location filtering.
require('dotenv').config({ path: '../../backend/.env' });
const mongoose = require('mongoose');

const VendorSchema = require('../../backend/src/models/Vendor');

const runMigration = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for Vendor Migration');

    const Vendor = mongoose.model('Vendor', VendorSchema);

    // Create Indexes for Vendor Dashboard & Filtering
    await Vendor.collection.createIndex({ email: 1 }, { unique: true });
    await Vendor.collection.createIndex({ status: 1 });
    await Vendor.collection.createIndex({ 'location.city': 1 });
    await Vendor.collection.createIndex({ 'performance.averageRating': -1 });
    
    console.log('🔍 Vendor indexes created successfully.');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

runMigration();
