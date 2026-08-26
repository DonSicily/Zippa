const { body } = require('express-validator');

exports.createProductValidator = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('category').isIn(['Electronics', 'Fashion', 'Beauty', 'Home', 'Stationery', 'Bags'])
    .withMessage('Invalid category'),
  body('price.factoryPrice').isFloat({ min: 0 }).withMessage('Factory price must be a positive number'),
  body('price.retailPrice').isFloat({ min: 0 }).withMessage('Retail price must be a positive number'),
  body('shipping.from').isIn(['Guangzhou', 'Shenzhen', 'Yiwu'])
    .withMessage('Shipping origin must be a valid warehouse city'),
];
