require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Campus = require('../src/models/Campus');

const MONGO_URI = process.env.MONGO_URI;

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding...');

    // 1. Seed Campuses (Used by Campus Hub & Logistics)
    await Campus.deleteMany({});
    const campuses = await Campus.insertMany([
      { name: 'UNILAG', type: 'University', location: { city: 'Lagos', state: 'Lagos' }, isActive: true },
      { name: 'OAU', type: 'University', location: { city: 'Ile-Ife', state: 'Osun' }, isActive: true },
      { name: 'UI', type: 'University', location: { city: 'Ibadan', state: 'Oyo' }, isActive: true },
      { name: 'UNN', type: 'University', location: { city: 'Nsukka', state: 'Enugu' }, isActive: true },
    ]);
    console.log(`✅ Seeded ${campuses.length} campuses.`);

    // 2. Seed Super Admin (For the redesigned Login screen)
    await User.deleteMany({ role: 'admin' });
    const adminPassword = 'Admin@123'; // ⚠️ Change this in production!
    
    const admin = await User.create({
      firstName: 'Daniel',
      lastName: 'Adeniyi',
      name: 'Daniel Adeniyi',
      email: 'founder@bestiez.com',
      password: adminPassword, // Automatically hashed by User.js pre-save hook
      role: 'admin',
      isVerified: true,
    });
    console.log(`✅ Seeded Super Admin: ${admin.email}`);
    console.log(`   Password: ${adminPassword}`);

    console.log('\n🎉 Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
