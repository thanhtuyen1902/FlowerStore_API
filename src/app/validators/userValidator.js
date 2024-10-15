const { checkSchema } = require('express-validator');

const userValidator = checkSchema({
    username: {
        notEmpty: {
            errorMessage: 'Username is required', // Thông báo lỗi nếu là rỗng
        },
        isLength: {
            options: { max: 30 },
            errorMessage: 'Username must not more than 30 chars',
        },

    },
    email: {
        notEmpty: {
            errorMessage: 'Email is required', // Thông báo lỗi nếu là rỗng
        },
        errorMessage: 'Invalid Email',
        isEmail: true,

    },
    password: {
        notEmpty: {
            errorMessage: 'Password is required', // Thông báo lỗi nếu là rỗng
        },
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars',
        },
        matches: {
            options: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/, // Điều kiện phải chứa ít nhất một chữ hoa, một chữ thường và một số
            errorMessage: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        },
    },
});

module.exports = userValidator;