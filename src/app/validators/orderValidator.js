const { checkSchema } = require('express-validator');

const orderValidator = checkSchema({
    userId: {
        in: ['body'],
        isMongoId: {
            errorMessage: 'Invalid User ID',
        },
        notEmpty: {
            errorMessage: 'User ID cannot be empty',
        },
    },
    products: {
        in: ['body'],
        isArray: {
            errorMessage: 'Products must be an array',
        },
        notEmpty: {
            errorMessage: 'Products array cannot be empty',
        },
        custom: {
            options: (value) => {
                for (const product of value) {
                    if (!product.productId || !product.quantity) {
                        throw new Error('Product ID and quantity are required');
                    }
                }
                return true; // Everything is fine
            },
        },
    },
    'products.*.productId': {
        in: ['body', 'products'],
        isMongoId: {
            errorMessage: 'Invalid Product ID',
        },
    },
    'products.*.quantity': {
        in: ['body', 'products'],
        isInt: {
            errorMessage: 'Quantity must be a number',
            options: { min: 1 },
        },
        notEmpty: {
            errorMessage: 'Quantity is required',
        },
    },
});

module.exports = orderValidator;