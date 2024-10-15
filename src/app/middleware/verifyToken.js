const jwt = require('jsonwebtoken');

// Secret key để mã hóa và giải mã token
const SECRET_KEY = 'mk'; // Thay đổi thành secret key của bạn

const verifyToken = (req, res, next) => {
    // Lấy token từ header
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }

    // Giải mã token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Forbidden!' });
        }
        // Lưu thông tin người dùng vào request để sử dụng ở các middleware hoặc route tiếp theo
        req.user = {
            id: decoded.id,
            role: decoded.role, // Đảm bảo rằng role được bao gồm trong payload
        };
        next();
    });
};

module.exports = verifyToken;
