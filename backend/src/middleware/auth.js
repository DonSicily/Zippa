const jwt = require('jsonwebtoken');
const User = require('../models/User');

const ROLE_MAP = {
  student: ['student'],
  vendor: ['vendor'],
  admin: ['admin'],
  ambassador: ['ambassador', 'admin'],
};

const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) {
      return res.status(401).json({ code: 'NO_TOKEN', message: 'Authentication required.' });
    }
    const token = header.slice(7);

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: process.env.JWT_ISSUER || 'bestiez-api',
      audience: process.env.JWT_AUDIENCE || 'bestiez-app',
    });

    const user = await User.findById(decoded.sub).select('-password -otpCode');
    if (!user || user.isSuspended) {
      return res.status(401).json({ code: 'USER_INVALID', message: 'Account is unavailable.' });
    }

    req.user = user;
    req.tokenId = decoded.jti;
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ code: 'TOKEN_EXPIRED', message: 'Session expired. Please sign in again.' });
    }
    return res.status(401).json({ code: 'INVALID_TOKEN', message: 'Invalid token.' });
  }
};

const authorize = (...roles) => (req, res, next) => {
  const allowed = roles.flatMap((r) => ROLE_MAP[r] || [r]);
  if (!req.user || !allowed.includes(req.user.role)) {
    return res.status(403).json({ code: 'FORBIDDEN', message: 'You do not have permission to perform this action.' });
  }
  return next();
};

module.exports = { protect, authorize };