const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET;
const ISSUER = process.env.JWT_ISSUER || 'bestiez-api';
const AUDIENCE = process.env.JWT_AUDIENCE || 'bestiez-app';

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('FATAL: JWT_SECRET must be set and at least 32 characters.');
}

const generateAccessToken = (user) =>
  jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
      campusId: user.campusId || undefined,
    },
    JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m',
      issuer: ISSUER,
      audience: AUDIENCE,
      jwtid: crypto.randomUUID(),
    }
  );

const generateRefreshToken = () => crypto.randomBytes(48).toString('hex');

module.exports = { generateAccessToken, generateRefreshToken, ISSUER, AUDIENCE };