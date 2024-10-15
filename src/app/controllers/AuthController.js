const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
// const data = { username: 'Thanh' };
// var token = jwt.sign(data, 'thanh123');
// console.log(token);

//* mã hóa mật khẩu trước khi lưu
class AuthController {


    // {POST} /register
    async register(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        try {
            //Kiểm tra xem người dùng đã tồn tại chưa (email)
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const newUser = await User.create({
                username: username,
                email: email,
                password: password
            })
            if (newUser) {
                const accessToken = jwt.sign({
                    id: newUser._id,
                    role: newUser.role,
                }, 'mk', { expiresIn: '1h' });
                return res.status(201).json({
                    message: "User registered successfully",
                    infor: {
                        id: newUser._id
                    },
                    accessToken: accessToken
                });
            }

        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }

    }

    // {POST} /login
    async login(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        //Tìm người dùng trong danh sách
        try {
            const loginUser = await User.findOne({
                email: email,
            });
            if (!loginUser) {
                return res.status(401).json({ message: 'Invalid email or password' }); // Nếu không tìm thấy người dùng
            }

            // Kiểm tra mật khẩu (không mã hóa)
            if (loginUser.password !== password) {
                return res.status(401).json({ message: 'Invalid email or password' }); // Nếu mật khẩu không đúng
            }

            const accessToken = jwt.sign({
                id: loginUser._id,
                role: loginUser.role,
            }, 'mk', { expiresIn: '1h' });

            return res.status(200).json({
                message: "User login successfully",
                infor: {
                    id: loginUser._id
                },
                accessToken: accessToken
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }

    }

};





module.exports = new AuthController;