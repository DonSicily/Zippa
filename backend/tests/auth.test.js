// Automated tests for the Authentication and User flows.
// Run with: npm run test (from the /backend directory)

const request = require('supertest');
const app = require('../src/server'); // Import the Express app
const mongoose = require('mongoose');
const User = require('../src/models/User');

describe('Authentication API', () => {
  // Clean up database before each test
  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new student successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'Test',
          lastName: 'Student',
          email: 'test@bestiez.com',
          phone: '+2348000000001',
          password: 'Password123',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.data.user.email).toBe('test@bestiez.com');
    });

    it('should fail if email already exists', async () => {
      await request(app).post('/api/auth/register').send({
        firstName: 'Test', lastName: 'Student', email: 'test@bestiez.com',
        phone: '+2348000000001', password: 'Password123',
      });

      const res = await request(app).post('/api/auth/register').send({
        firstName: 'Test2', lastName: 'Student2', email: 'test@bestiez.com',
        phone: '+2348000000002', password: 'Password123',
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toContain('already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      // Pre-seed user
      await request(app).post('/api/auth/register').send({
        firstName: 'Test', lastName: 'Student', email: 'login@bestiez.com',
        phone: '+2348000000003', password: 'Password123',
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'login@bestiez.com', password: 'Password123' });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should fail with incorrect password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'login@bestiez.com', password: 'WrongPassword' });

      expect(res.statusCode).toEqual(401);
    });
  });
});
