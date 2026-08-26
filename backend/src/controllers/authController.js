const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');

const OTP_EXPIRY_MS = 5 * 60 * 1000;
const MAX_OTP_ATTEMPTS = 5;
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const hashToken = (t) => crypto.createHash('sha256').update(String(t)).digest('hex');

const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, role = 'student', campusId } = req.body;
    if (!email || !password || !name) {
      return res.status(422).json({ message: 'name, email and password are required.' });
    }
    if (typeof password !== 'string' || password.length < 8) {
      return res.status(422).json({ message: 'Password must be at least 8 characters.' });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ code: 'USER_EXISTS', message: 'An account with this email already exists.' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const otp = String(crypto.randomInt(100000, 999999));

    const user = await User.create({
      name, email: email.toLowerCase(), phone,
      password: hashedPassword, role, campusId,
      otpCode: hashToken(otp),
      otpExpires: Date.now() + OTP_EXPIRY_MS,
      otpAttempts: 0,
      isVerified: false,
    });
    // TODO: deliver otp via sendEmail/SMS util here.
    res.status(201).json({ message: 'Account created. Please verify your OTP.', userId: user._id });
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: (email || '').toLowerCase() });
    if (!user) return res.status(401).json({ code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' });

    const match = await bcrypt.compare(password || '', user.password);
    if (!match) return res.status(401).json({ code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' });
    if (user.isSuspended) return res.status(403).json({ code: 'ACCOUNT_SUSPENDED', message: 'This account is suspended.' });

    const refreshToken = generateRefreshToken();
    user.refreshToken = hashToken(refreshToken);
    user.refreshTokenExpires = Date.now() + REFRESH_TTL_MS;
    await user.save({ validateBeforeSave: false });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth/refresh',
      maxAge: REFRESH_TTL_MS,
    });

    res.json({
      accessToken: generateAccessToken(user),
      user: { id: user._id, name: user.name, role: user.role, email: user.email },
    });
  } catch (err) { next(err); }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: (email || '').toLowerCase() });
    if (!user || !user.otpCode) return res.status(400).json({ message: 'No pending OTP for this account.' });

    if (user.otpExpires && user.otpExpires < Date.now()) {
      user.otpCode = undefined; user.otpAttempts = 0;
      await user.save({ validateBeforeSave: false });
      return res.status(400).json({ code: 'OTP_EXPIRED', message: 'OTP has expired. Request a new one.' });
    }
    if ((user.otpAttempts || 0) >= MAX_OTP_ATTEMPTS) {
      user.otpCode = undefined; user.otpAttempts = 0;
      await user.save({ validateBeforeSave: false });
      return res.status(429).json({ code: 'OTP_LOCKED', message: 'Too many attempts. Request a new OTP.' });
    }
    if (user.otpCode !== hashToken(otp)) {
      user.otpAttempts = (user.otpAttempts || 0) + 1;
      await user.save({ validateBeforeSave: false });
      return res.status(400).json({ message: 'Incorrect OTP.' });
    }

    user.isVerified = true;
    user.otpCode = undefined; user.otpAttempts = 0; user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });
    res.json({ message: 'Account verified successfully.' });
  } catch (err) { next(err); }
};

const refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (!token) return res.status(401).json({ message: 'Refresh token missing.' });

    const user = await User.findOne({ refreshToken: hashToken(token), refreshTokenExpires: { $gt: Date.now() } });
    if (!user) return res.status(401).json({ message: 'Invalid or expired refresh token.' });

    const newRefresh = generateRefreshToken();
    user.refreshToken = hashToken(newRefresh);
    user.refreshTokenExpires = Date.now() + REFRESH_TTL_MS;
    await user.save({ validateBeforeSave: false });

    res.cookie('refreshToken', newRefresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth/refresh',
      maxAge: REFRESH_TTL_MS,
    });
    res.json({ accessToken: generateAccessToken(user) });
  } catch (err) { next(err); }
};

const logout = async (req, res, next) => {
  try {
    await User.updateOne({ _id: req.user._id }, { $unset: { refreshToken: 1, refreshTokenExpires: 1 } });
    res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
    res.json({ message: 'Logged out.' });
  } catch (err) { next(err); }
};

module.exports = { register, login, verifyOtp, refresh, logout };