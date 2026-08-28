const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  name: { 
    type: String, 
    required: [true, 'Name is required'], 
    trim: true 
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: { type: String, trim: true },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ['student', 'vendor', 'admin', 'ambassador'],
    default: 'student',
  },
  campusId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Campus' 
  },
  
  // --- OTP & Verification (Used for Student Reg + Admin 2FA) ---
  otpCode: String,
  otpExpires: Date,
  otpAttempts: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  
  // --- Session Management (Refresh Tokens) ---
  refreshToken: String,
  refreshTokenExpires: Date,
  
  // --- Push Notifications ---
  pushToken: String,
  
  // --- Admin/Security flags ---
  isSuspended: { type: Boolean, default: false },
}, {
  timestamps: true,
});

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
