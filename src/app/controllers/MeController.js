const User = require('../models/User');
const { validationResult } = require('express-validator');

class MeController {


    // Xem thông tin cá nhân
    // {GET} /users/me/profile
    async getProfile(req, res, next) {
        // try {
        //     const userId = req.params.id;
        //     const user = await User.findById(userId)
        //     if (!user) {
        //         return res.status(404).json({ message: 'User not found' });
        //     }
        //     res.status(200).json(user);
        // } catch (error) {
        //     res.status(500).json({ message: 'Server Error' });
        // }


        try {
            const userId = req.user.id; // Lấy ID người dùng từ token hoặc session
            const userInfo = await User.findById(userId).select('-password'); // Lấy thông tin người dùng mà không có mật khẩu
            if (!userInfo) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(userInfo);
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }


    // Sửa thông tin cá nhân
    // {POST} /users/me/profile

    async updateProfile(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            return res.status(400).json({
                info: {
                    message: 'Validation failed',
                    errors: errors.array().map(err => err.msg) // Trả về danh sách lỗi
                }
            })
        }
        try {
            const userId = req.user.id;

            const { username, email } = req.body;
            var userInfo = {
                username,
                email,
            }
            const existingCustomer = await User.findOne({ email });
            if (existingCustomer && existingCustomer._id.toString() !== userId) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const updateUser = await User.findByIdAndUpdate(userId, userInfo, { new: true });
            if (updateUser) {
                res.status(201).json({
                    info: {
                        message: 'Updated successfully',

                    },
                    data: {
                        updateUser: updateUser
                    }
                })
            }

        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }
    // Thay đổi mật khẩu 
    // {PUT} /users/me/changepwd
    changeUserPwd(req, res, next) {

    }

};

module.exports = new MeController;