const { checkSchema } = require('express-validator');


// Schema validate cho username và email
const updateUserValidator = checkSchema({
    username: {
        optional: true, // Trường username là tùy chọn
        isString: {
            errorMessage: 'Username must be a string', // Thông báo lỗi nếu không phải chuỗi
        },
        isLength: {
            options: { min: 3 },
            errorMessage: 'Username must be at least 3 characters long', // Thông báo lỗi nếu độ dài không đủ
        },
        trim: true, // Loại bỏ khoảng trắng thừa ở đầu và cuối
        escape: true // Loại bỏ các ký tự đặc biệt không hợp lệ
    },
    email: {
        optional: true, // Trường email là tùy chọn
        isEmail: {
            errorMessage: 'Invalid email format', // Thông báo lỗi nếu không đúng định dạng email
        },
        normalizeEmail: true // Chuẩn hóa email bằng cách loại bỏ các khoảng trắng thừa và chuyển thành chữ thường
    }
});




module.exports = updateUserValidator;
