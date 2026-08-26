const { body } = require('express-validator');

exports.registerVendorValidator = [
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('contactPerson').notEmpty().withMessage('Contact person is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('location.city').isIn(['Guangzhou', 'Shenzhen', 'Yiwu', 'Other'])
    .withMessage('Invalid warehouse city'),
];
