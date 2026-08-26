// Seeds the initial target Nigerian Universities and Polytechnics with pickup points.
require('dotenv').config({ path: '../../backend/.env' });
const mongoose = require('mongoose');

const CampusSchema = require('../../backend/src/models/Campus');

const initialCampuses = [
  {
    name: 'University of Lagos (UNILAG)',
    type: 'University',
    location: { city: 'Lagos', state: 'Lagos', address: 'Akoka, Yaba' },
    pickupPoints: [
      { name: 'Faculty of Engineering Hub', description: 'Near Main Gate', operatingHours: { open: '09:00', close: '18:00' } },
      { name: 'Student Union Building (SUB)', description: 'Ground Floor', operatingHours: { open: '09:00', close: '18:00' } }
    ],
    stats: { totalStudents: 55000 },
    isActive: true
  },
  {
    name: 'Obafemi Awolowo University (OAU)',
    type: 'University',
    location: { city: 'Ile-Ife', state: 'Osun', address: 'Ile-Ife' },
    pickupPoints: [
      { name: 'Central Lecture Theatre', description: 'Opposite Great Ife Bookshop', operatingHours: { open: '09:00', close: '17:00' } }
    ],
    stats: { totalStudents: 35000 },
    isActive: true
  },
  {
    name: 'University of Ibadan (UI)',
    type: 'University',
    location: { city: 'Ibadan', state: 'Oyo', address: 'Ibadan' },
    pickupPoints: [
      { name: 'Amina Hall Lobby', description: 'Main Campus', operatingHours: { open: '09:00', close: '18:00' } }
    ],
    stats: { totalStudents: 40000 },
    isActive: true
  },
  {
    name: 'Yaba College of Technology (YABATECH)',
    type: 'Polytechnic',
    location: { city: 'Lagos', state: 'Lagos', address: 'Yaba' },
    pickupPoints: [
      { name: 'Main Library Entrance', description: 'Near ICT Center', operatingHours: { open: '08:00', close: '17:00' } }
    ],
    stats: { totalStudents: 28000 },
    isActive: true
  }
];

const runMigration = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for Campus Migration');

    const Campus = mongoose.model('Campus', CampusSchema);

    // Create Indexes
    await Campus.collection.createIndex({ name: 'text' });
    await Campus.collection.createIndex({ 'location.state': 1, 'location.city': 1 });

    // Seed Data
    for (const campus of initialCampuses) {
      const exists = await Campus.findOne({ name: campus.name });
      if (!exists) {
        await Campus.create(campus);
        console.log(` Seeded: ${campus.name}`);
      }
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

runMigration();
