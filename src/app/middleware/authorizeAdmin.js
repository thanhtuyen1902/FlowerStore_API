

// Middleware để kiểm tra vai trò admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden! Admin only.' });
    }
    next();
};


module.exports = isAdmin;
