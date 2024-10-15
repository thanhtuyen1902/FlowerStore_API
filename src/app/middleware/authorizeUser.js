

const isUser = (req, res, next) => {
    const role = req.user.role; // Giả sử bạn đã lưu vai trò của người dùng trong req.user

    if (role === 'user') {
        return next(); // Cho phép người dùng tạo đơn hàng
    }

    return res.status(403).json({ message: 'Forbidden!' });
};


