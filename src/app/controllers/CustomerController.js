const User = require('../models/User');
const { validationResult } = require('express-validator');

class CustomerController {


    // Lấy danh sách tất cả users {admin}
    // {GET} /users/customers
    async getAllCustomers(req, res, next) {
        try {
            const customers = await User.find().select('-password'); // Lấy tất cả sản phẩm từ MongoDB
            if (!customers) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            res.status(200).json(customers);
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }

    // Lấy thông tin một khách hàng {admin}
    // {GET} /users/customers/{id}
    async getCustomerDetail(req, res, next) {
        try {
            const userId = req.params.id;
            const userRole = req.user.role;

            // let user;
            // if (userRole === 'admin') {
            //     // Nếu là admin, có thể xem được của tất cả user
            //     user = await User.findById(userId);
            //     // return res.status(200).json(user);
            // } else {
            //     // User chỉ có thể xem thông tin của chính mình
            //     if (userId !== req.user.id) {
            //         return res.status(403).json({ message: 'Access denied. You can only view your own information.' });
            //     }
            //     user = await User.findById(userId);

            // }

            // Tìm người dùng
            const customer = await User.findById(userId).select('-password'); // Loại trừ mật khẩu


            // const user = await User.findById(userId)
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }

    // Thêm mới một khách hàng {admin}
    // {POST} /users/customers

    async addCustomer(req, res, next) {
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

            const { username, email, password } = req.body;
            var customerInfo = {
                username,
                email,
                password,
            }

            const existingCustomer = await User.findOne({ email: email });
            if (existingCustomer) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            const addCustomer = await User.create(customerInfo);
            if (addCustomer) {
                res.status(201).json({
                    info: {
                        message: 'Added successfully',

                    },
                    data: {
                        newCustomer: addCustomer
                    }
                })
            }

        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }
    // Cập nhật khách hàng theo id  {admin} 
    // {PUT} /users/customers/{id}
    async updateCustomer(req, res, next) {
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

        const { username, email } = req.body;
        const customerId = req.params.id;


        var customerInfo = {
            username,
            email,
        }

        try {

            const existingCustomer = await User.findOne({ email: email });
            if (existingCustomer && existingCustomer._id.toString() !== customerId) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            const updatedCustomer = await User.findByIdAndUpdate(customerId, customerInfo, { new: true });

            if (!updatedCustomer) {
                return res.status(404).json({ message: 'Customer not found' });
            }

            res.status(200).json({
                info: {
                    message: 'Updated successfully',
                },
                data: {
                    updateCustomer: updatedCustomer,
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }

    // Xóa khách hàng theo id  {admin} {xóa cứng}
    // {DELETE} users/customers/{id}
    async deleteCustomer(req, res, next) {
        const customerId = req.params.id;

        try {

            const deletedCustomer = await User.findByIdAndDelete(customerId).select('-password');

            if (!deletedCustomer) {
                return res.status(404).json({ message: 'Customer not found' });
            }

            res.status(200).json({
                info: {
                    message: 'Deleted successfully',
                },
                data: {
                    deleteCustomer: deletedCustomer,
                },
            });
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }
};

module.exports = new CustomerController;