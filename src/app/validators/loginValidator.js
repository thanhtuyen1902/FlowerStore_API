const { checkSchema } = require('express-validator');

const loginValidator = checkSchema({
    email: {
        errorMessage: 'Invalid Email',
        isEmail: true,
        notEmpty: {
            errorMessage: 'Email is required', // Thông báo lỗi nếu là rỗng
        },
    },
    password: {
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars',
        },
        matches: {
            options: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/, // Điều kiện phải chứa ít nhất một chữ hoa, một chữ thường và một số
            errorMessage: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        },
        notEmpty: {
            errorMessage: 'Password is required', // Thông báo lỗi nếu là rỗng
        },
    },
});

module.exports = loginValidator;