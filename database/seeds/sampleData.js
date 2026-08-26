// Full Ecosystem Mock Data: Connects Users, Vendors, Products, and Orders for testing.
require('dotenv').config({ path: '../../backend/.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import Models
const User = require('../../backend/src/models/User');
const Vendor = require('../../backend/src/models/Vendor');
const Product = require('../../backend/src/models/Product');
const Campus = require('../../backend/src/models/Campus');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB. Starting full ecosystem seed...');

    // 1. Get a Campus
    const lagosCampus = await Campus.findOne({ name: 'University of Lagos (UNILAG)' });
    if (!lagosCampus) throw new Error('Campus not found. Run 005_create_campuses.js first.');

    // 2. Create Test Student
    const hashedPassword = await bcrypt.hash('Password123', 10);
    const student = await User.findOneAndUpdate(
      { email: 'student@bestiez.com' },
      {
        firstName: 'Chinedu', lastName: 'Okafor', email: 'student@bestiez.com',
        phone: '+2348012345678', password: hashedPassword, campus: lagosCampus._id,
        role: 'student', isVerified: true
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('👤 Test Student created:', student.email);

    // 3. Create Test Vendors
    const vendor1 = await Vendor.findOneAndUpdate(
      { email: 'shenzhen@bestiez.com' },
      {
        companyName: 'Shenzhen Tech Factory', contactPerson: 'Wei Zhang',
        email: 'shenzhen@bestiez.com', phone: '+8613800000000', password: hashedPassword,
        location: { city: 'Shenzhen', address: 'Futian District' },
        categories: ['Electronics'], status: 'approved', verificationStatus: 'verified',
        paymentInfo: { alipay: 'test@alipay.com' }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const vendor2 = await Vendor.findOneAndUpdate(
      { email: 'guangzhou@bestiez.com' },
      {
        companyName: 'Guangzhou Fashion Hub', contactPerson: 'Li Na',
        email: 'guangzhou@bestiez.com', phone: '+8613900000000', password: hashedPassword,
        location: { city: 'Guangzhou', address: 'Baiyun District' },
        categories: ['Fashion', 'Bags'], status: 'approved', verificationStatus: 'verified',
        paymentInfo: { alipay: 'test2@alipay.com' }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('🏭 2 Test Vendors created/approved.');

    // 4. Create Test Products
    const products = [
      {
        vendor: vendor1._id, name: 'Wireless Earbuds Pro', description: 'High quality noise cancelling earbuds.',
        category: 'Electronics', images: [{ url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400' }],
        price: { factoryPrice: 5250, retailPrice: 15000, discountPrice: 12500 },
        inventory: { quantity: 500, inStock: true },
        shipping: { from: 'Shenzhen', estimatedDays: { min: 7, max: 14 } },
        status: 'approved', isTrending: true
      },
      {
        vendor: vendor2._id, name: 'Oversized Campus Hoodie', description: 'Premium cotton blend, oversized fit.',
        category: 'Fashion', images: [{ url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400' }],
        price: { factoryPrice: 4200, retailPrice: 18000, discountPrice: 12500 },
        inventory: { quantity: 200, inStock: true },
        shipping: { from: 'Guangzhou', estimatedDays: { min: 7, max: 14 } },
        status: 'approved', isFeatured: true
      },
      {
        vendor: vendor1._id, name: 'Smart Fitness Watch', description: 'Track your steps and heart rate.',
        category: 'Electronics', images: [{ url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' }],
        price: { factoryPrice: 6300, retailPrice: 25000, discountPrice: 18000 },
        inventory: { quantity: 150, inStock: true },
        shipping: { from: 'Shenzhen', estimatedDays: { min: 7, max: 14 } },
        status: 'approved'
      }
    ];

    for (const prod of products) {
      await Product.findOneAndUpdate({ name: prod.name }, prod, { upsert: true, new: true });
    }
    console.log('📦 3 Test Products created and approved.');

    console.log(' SEEDING COMPLETE! You can now log in to the app.');
    console.log(' Student: student@bestiez.com / Password123');
    console.log(' Admin: founder@bestiez.com / Admin@Bestiez2026');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
