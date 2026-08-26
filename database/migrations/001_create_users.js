// Creates indexes for fast user lookups and seeds the default Super Admin account.
require('dotenv').config({ path: '../../backend/.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = require('../../backend/src/models/User');

const runMigration = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for User Migration');

    const User = mongoose.model('User', UserSchema);

    // 1. Create Indexes
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ phone: 1 }, { unique: true, sparse: true });
    console.log('🔍 User indexes created.');

    // 2. Seed Default Super Admin
    const adminExists = await User.findOne({ email: 'founder@bestiez.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('Admin@Bestiez2026', 10);
      await User.create({
        firstName: 'Super',
        lastName: 'Admin',
        email: 'founder@bestiez.com',
        phone: '+2348000000000',
        password: hashedPassword,
        role: 'admin',
        isVerified: true,
      });
      console.log('👑 Default Super Admin created (founder@bestiez.com / Admin@Bestiez2026)');
    } else {
      console.log('️ Super Admin already exists.');
    }

    await mongoose.disconnect();
    console.log(' Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

runMigration();
