// Automated tests for Product creation and Quality Gate flows.

const request = require('supertest');
const app = require('../src/server');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Vendor = require('../src/models/Vendor');

describe('Product & Quality Gate API', () => {
  let adminToken, vendorToken;

  beforeAll(async () => {
    // Create Admin
    const admin = await User.create({
      firstName: 'Admin', lastName: 'User', email: 'admin@bestiez.com',
      phone: '+2348000000099', password: 'Password123', role: 'admin', isVerified: true
    });
    adminToken = admin.generateAuthToken ? admin.generateAuthToken() : 'mock_admin_token'; // Simplified for test

    // Create Approved Vendor
    const vendor = await Vendor.create({
      companyName: 'Test Factory', contactPerson: 'Wei', email: 'vendor@bestiez.com',
      phone: '+8613800000099', password: 'Password123', status: 'approved', location: { city: 'Guangzhou' }
    });
    vendorToken = 'mock_vendor_token'; // In real tests, we'd login to get the JWT
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/products', () => {
    it('should fetch only approved products for students', async () => {
      const res = await request(app).get('/api/products');
      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toBeInstanceOf(Array);
      // Ensure no pending/rejected products leak to the public
      res.body.data.forEach(p => expect(p.status).toBe('approved'));
    });
  });

  describe('POST /api/products (Vendor)', () => {
    it('should allow an approved vendor to create a product', async () => {
      // Note: In a real test suite, we would attach the vendorToken to the headers
      // and use FormData for image uploads.
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${vendorToken}`)
        .field('name', 'Test Wireless Earbuds')
        .field('category', 'Electronics')
        .field('price', JSON.stringify({ factoryPrice: 50, retailPrice: 150 }));

      expect(res.statusCode).toEqual(201);
      expect(res.body.data.status).toBe('pending_approval'); // Must go through Quality Gate
    });
  });
});
