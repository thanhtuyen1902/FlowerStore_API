const { checkSchema } = require('express-validator');
const mongoose = require('mongoose');

const categoryValidator = checkSchema({
    categoryName: {
        in: ['body'], // Kiểm tra thuộc tính trong phần body của request
        isString: true, // Đảm bảo categoryName là chuỗi
        trim: true, // Xóa khoảng trắng ở đầu và cuối chuỗi
        notEmpty: {
            errorMessage: 'Category name is required', // Thông báo lỗi nếu rỗng
        },

    },
    description: {
        in: ['body'],
        isString: true,
        trim: true,
        notEmpty: {
            errorMessage: 'Description is required', // Thông báo lỗi nếu rỗng
        },
        isLength: {
            options: { max: 500 },
            errorMessage: 'Description can be up to 500 characters long',
        },
    },
    isActive: {
        in: ['body'],
        optional: true, // Không bắt buộc trong khi thêm
        isBoolean: {
            errorMessage: 'isActive should be a boolean value',
        },
        toBoolean: true, // Tự động chuyển đổi giá trị thành boolean
    },

});

module.exports = categoryValidator;