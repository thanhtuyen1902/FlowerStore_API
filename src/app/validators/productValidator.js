const { checkSchema } = require('express-validator');
const mongoose = require('mongoose');
const validator = require('validator');
const Category = require('../models/Category'); // Giả định bạn đã định nghĩa model cho Category


// const categoryExists = async (categoryId) => {
//     const category = await Category.findById(categoryId);
//     return !!category; // Trả về true nếu tìm thấy category
// };


// const productValidator = async (data) => {
//     let errors = [];

//     // Kiểm tra trường 'name' (bắt buộc)
//     if (!data.name || !validator.isLength(data.name, { min: 3, max: 255 })) {
//         errors.push('Name is required and must be between 3 and 255 characters');
//     }

//     // Kiểm tra trường 'color' (bắt buộc)
//     if (!data.color || !validator.isLength(data.color, { min: 1, max: 50 })) {
//         errors.push('Color is required and must be between 1 and 50 characters');
//     }

//     // Kiểm tra trường 'price' (bắt buộc)
//     if (!data.price) {
//         errors.push('Price is required');
//     }

//     // Kiểm tra trường 'quantity' (bắt buộc)
//     if (!data.quantity) {
//         errors.push('Quantity is required');
//     }

//     // Kiểm tra trường 'categoryId' (bắt buộc)
//     if (!data.categoryId) {
//         errors.push('Category ID is required');
//     } else if (!await categoryExists(data.categoryId)) {
//         errors.push('Category ID does not exist in the database');
//     }

//     // Kiểm tra trường 'description' (tùy chọn)
//     if (data.description && !validator.isLength(data.description, { max: 1000 })) {
//         errors.push('Description is not more than 1000');
//     }

//     // Kiểm tra trường 'image' (tùy chọn)
//     if (data.image && !validator.isURL(data.image)) {
//         errors.push('Image must be a valid URL');
//     }
//     // Kiểm tra trường 'isActive' (tùy chọn)
//     if (data.isActive !== undefined && typeof data.isActive !== 'boolean') {
//         errors.push('isActive must be a boolean value');
//     }

//     // Nếu có lỗi, trả về thông báo lỗi
//     if (errors.length > 0) {
//         return { error: errors };
//     }

//     return { valid: true };
// };




const productValidator = checkSchema({
    name: {
        in: ['body'],
        isLength: {
            options: { max: 100 },
            errorMessage: 'Name must not more than 100 chars',
        },
        notEmpty: {
            errorMessage: 'Product name is required', // Thông báo lỗi nếu là rỗng
        },
        isString: {
            errorMessage: 'Product name must be a string', // Thông báo lỗi nếu không phải là string
        },
    },
    price: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Price is required', // Thông báo lỗi nếu là rỗng
        },

    },
    quantity: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Quantity is required', // Thông báo lỗi nếu là rỗng
        },
    },
    color: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Color is required', // Thông báo lỗi nếu là rỗng
        },
    },
    description: {
        in: ['body'],
        optional: true, // Trường này là không bắt buộc
    },
    image: {
        in: ['body'],
        optional: true, // Trường này là không bắt buộc
    },
    categoryId: {
        in: ['body'],
        isMongoId: {
            errorMessage: 'Invalid Category ID',
        },
        custom: {
            options: async (value) => {
                const category = await Category.findById(value);
                if (!category) {
                    throw new Error('Category does not exist');
                }
                return true;
            },
        }

    },
    isActive: {
        in: ['body'],
        optional: true,
    },

});

module.exports = productValidator;