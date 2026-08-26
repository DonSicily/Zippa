const { body } = require('express-validator');

exports.createOrderValidator = [
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('items.*.product').isMongoId().withMessage('Invalid product ID'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('shippingAddress.recipientName').notEmpty().withMessage('Recipient name is required'),
  body('shippingAddress.phone').notEmpty().withMessage('Phone number is required'),
  body('paymentMethod').isIn(['card', 'bank_transfer', 'ussd', 'wallet'])
    .withMessage('Invalid payment method'),
];
