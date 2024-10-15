const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const { validationResult } = require('express-validator');

class OrderController {


    // Lấy danh sách tất cả đơn hàng {admin-xem của tất cả, user-xem của mình}
    // {GET} /orders
    async getAllOrders(req, res, next) {
        const userId = req.user.id;
        const userRole = req.user.role;
        // try {
        //     const orders = await Order.find(); // Lấy tất cả sản phẩm từ MongoDB
        //     res.status(200).json(orders);
        // } catch (error) {
        //     res.status(500).json({ message: 'Server Error' });
        // }

        try {
            var orders;
            if (userRole === 'admin') {
                // Nếu là admin, lấy tất cả đơn hàng
                orders = await Order.find(); // Populate để lấy thông tin sản phẩm
            } else if (userRole === 'user') {
                // Nếu là user, lấy đơn hàng của chính họ
                orders = await Order.find({ userId: userId }); // Populate để lấy thông tin sản phẩm
            } else {
                return res.status(403).json({ message: 'Forbidden' });
            }

            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: 'No orders found' }); // Trả về thông báo nếu không có đơn hàng
            }
            res.status(200).json(orders); // Trả về danh sách đơn hàng
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }

    }

    // Lấy chi tiết 1 đơn hàng theo id {admin-xem của tất cả, user-xem của mình}
    // {GET} /orders/:id
    async getDetailOrder(req, res, next) {
        // try {
        //     const orderId = req.params.id;
        //     const order = await Order.findById(orderId).populate('products.productId');; // Tìm sản phẩm theo ID
        //     if (!order) {
        //         return res.status(404).json({ message: 'Order not found' });
        //     }
        //     res.status(200).json(order);
        // } catch (error) {
        //     res.status(500).json({ message: 'Server Error' });
        // }

        const orderId = req.params.id;
        const userId = req.user.id;
        const userRole = req.user.role;


        try {
            const order = await Order.findById(orderId).populate('products.productId');
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Kiểm tra quyền truy cập
            if (userRole !== 'admin' && order.userId.toString() !== userId) {
                return res.status(403).json({ message: 'Forbidden' }); // Người dùng không có quyền truy cập đơn hàng này
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }


    };

    // //{GET} orders/myorders
    // async getAllMeOrders(req, res, next) {

    //     const userId = req.user.id; // Lấy userId từ token xác thực

    //     try {
    //         // Tìm tất cả đơn hàng của người dùng
    //         const orders = await Order.find({ userId: userId });
    //         if (orders.length === 0) {
    //             return res.status(404).json({ message: 'No orders found for this user' });
    //         }
    //         return res.status(200).json(orders);
    //     } catch (error) {
    //         console.error('Error fetching orders:', error);
    //         return res.status(500).json({ message: 'Server Error' });
    //     }

    // };

    // //{GET} /orders/me/detail/:orderId
    // async getDetailMeOrder(req, res, next) {
    //     const userId = req.user.id; // Lấy userId từ token xác thực
    //     const orderId = req.params.id; // Lấy orderId từ route parameters

    //     try {
    //         // Tìm kiếm đơn hàng theo userId và orderId
    //         const order = await Order.findOne({ _id: orderId, userId: userId }).populate('products.productId');

    //         if (!order) {
    //             return res.status(404).json({ message: 'Order not found' });
    //         }

    //         return res.status(200).json(order);
    //     } catch (error) {
    //         return res.status(500).json({ message: 'Server Error' });
    //     }
    // };

    //Lấy danh sách những đơn hàng của một cá nhân
    //{GET} /orders/customer/:userId {admin}
    async getCustomerOrders(req, res, next) {
        try {
            const userId = req.params.id; // Lấy userId từ params
            const orders = await Order.find({ userId: userId }); // Lấy các đơn hàng của user

            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: 'No orders found for this customer' }); // Thông báo nếu không tìm thấy đơn hàng
            }

            res.status(200).json(orders); // Trả về danh sách đơn hàng của user
        } catch (error) {
            res.status(500).json({ message: 'Server Error' }); // Xử lý lỗi
        }
    }

    //Tạo một đơn hàng mới {customer}
    //{POST} orders/new
    async createOrder(req, res, next) {

        // Kiểm tra các lỗi validation
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

        var userId = req.body.userId;
        var products = req.body.products;

        try {
            // Tính tổng tiền
            var totalAmount = 0;
            const productInfo = [];

            for (const product of products) {
                // Kiểm tra từng sản phẩm trong database
                const foundProduct = await Product.findById(product.productId);
                if (!foundProduct) {
                    return res.status(400).json({ message: `Product ID ${product.productId} not found` });
                }
                // Tính tổng tiền cho đơn hàng
                const productTotal = foundProduct.price * product.quantity;
                totalAmount += productTotal;

                productInfo.push({
                    productId: product.productId,
                    quantity: product.quantity,
                    price: foundProduct.price // Lưu giá trị từ product
                });
            }

            const newOrder = await Order.create({
                userId: userId,
                products: productInfo,
                totalAmount: totalAmount,
            });

            // const savedOrder = await newOrder.save();
            return res.status(201).json({
                info: {
                    message: 'Created successfully',
                },
                data: {
                    newOrder: newOrder
                }

            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server Error' });
        }
    };

};

module.exports = new OrderController;


