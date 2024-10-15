//quản lý routes liên quan đến product

const express = require('express');
const router = express.Router();
const productValidator = require('../app/validators/productValidator');
const orderValidator = require('../app/validators/orderValidator');
const isAdmin = require('../app/middleware/authorizeAdmin');
const verifyToken = require('../app/middleware/verifyToken');
const orderController = require('../app/controllers/OrderController');



/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API quản lý đơn hàng
 */


//XEM TẤT CẢ ĐƠN HÀNG {admin-xem của tất cả, user-xem của chính mình}

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: Trả về danh sách tất cả đơn hàng. Admin có thể xem tất cả đơn hàng, customer chỉ có thể xem đơn hàng của mình.
 *     tags: [Orders]
 *     security:
 *      - bearerAuth: []  # Cần xác thực bằng JWT
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/Order'
 *                 
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orders not found"
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server Error"
 */
router.get('/', verifyToken, orderController.getAllOrders);



// XEM CHI TIẾT ĐƠN HÀNG CỦA USERS {admin-xem của tất cả, user-xem của chính mình}


/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Get order details
 *     description: Trả về chi tiết đơn hàng. Admin có thể chi tiết đơn hàng của nhiều cá nhân, customer chỉ có thể xem đơn hàng của mình.
 *     tags: [Orders]
 *     security:
 *      - bearerAuth: []  # Cần xác thực bằng JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của đơn hàng cần xem
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                    type: string
 *                    example: "60d5ec49b80e9441f8e7e0e1"
 *                 userId:
 *                    type: string
 *                    example: "60d5ec49b80e9441f8e7e0e0"
 *                 products:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        productId:
 *                           type: object
 *                           $ref: '#/components/schemas/Product'
 *                        quantity:
 *                           type: integer
 *                           example: 2
 *                 totalAmount:
 *                     type: number
 *                     format: float
 *                     description: Tổng số tiền của đơn hàng
 *                     example: 150.00
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order not found"
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server Error"
 */

router.get('/:id', verifyToken, orderController.getDetailOrder);



/**
 * @swagger
 * /orders/customer/{userId}:
 *   get:
 *     summary: Get a customer's orders
 *     description: Cho phép admin xem tất cả đơn hàng của một khách hàng cụ thể.
 *     tags: [Orders]
 *     security:
 *      - bearerAuth: []  # Cần xác thực bằng JWT
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: "ID của người dùng mà admin muốn xem đơn hàng"
 *         schema:
 *           type: string
 *           example: "1234567890"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No orders found for this customer"
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server Error"
 */



router.get('/customer/:id', [verifyToken, isAdmin], orderController.getCustomerOrders);
// ---------------v---------------------------------------------------------------------v--

//XEM TẤT CẢ ĐƠN HÀNG {user}

// /**
//  * @swagger
//  * /orders/me:
//  *   get:
//  *     summary: Get all personal's orders
//  *     tags: [Orders]
//  *     security:
//  *      - bearerAuth: []  # Cần xác thực bằng JWT
//  *     responses:
//  *       200:
//  *         description: Success
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   _id:
//  *                     type: string
//  *                     example: "60d5ec49b80e9441f8e7e0e1"
//  *                   userId:
//  *                     type: string
//  *                     example: "60d5ec49b80e9441f8e7e0e0"
//  *                   products:
//  *                     type: array
//  *                     items:
//  *                      type: object
//  *                      properties:
//  *                        productId:
//  *                          type: string
//  *                          example: "60d5ec49b80e9441f8e7e0e2"
//  *                        quantity:
//  *                          type: integer
//  *                          example: 2
//  *                   totalAmount:
//  *                     type: number
//  *                     format: float
//  *                     description: Tổng số tiền của đơn hàng
//  *                     example: 150.00
//  *       404:
//  *         description: Not found
//  *       500:
//  *         description: Error Server
//  */
// router.get('/me/myorders', verifyToken, orderController.getAllMeOrders);


// XEM CHI TIẾT ĐƠN HÀNG CỦA USERS {user}


// /**
//  * @swagger
//  * /orders/me/detail/{orderId}:
//  *   get:
//  *     summary: Get personal's order details
//  *     tags: [Orders]
//  *     security:
//  *      - bearerAuth: []  # Cần xác thực bằng JWT
//  *     responses:
//  *       200:
//  *         description: Success
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 _id:
//  *                    type: string
//  *                    example: "60d5ec49b80e9441f8e7e0e1"
//  *                 userId:
//  *                    type: string
//  *                    example: "60d5ec49b80e9441f8e7e0e0"
//  *                 products:
//  *                    type: array
//  *                    items:
//  *                      type: object
//  *                      properties:
//  *                        productId:
//  *                           type: string
//  *                           example: "60d5ec49b80e9441f8e7e0e2"
//  *                        quantity:
//  *                           type: integer
//  *                           example: 2
//  *                 totalAmount:
//  *                     type: number
//  *                     format: float
//  *                     description: Tổng số tiền của đơn hàng
//  *                     example: 150.00
//  *       404:
//  *         description: Not found
//  *       500:
//  *         description: Server Error
//  */

// router.get('/me/detail/:id', verifyToken, orderController.getDetailMeOrder);


// ---------------v---------------------------------------------------------------------v--

//TẠO ĐƠN HÀNG {user}

/**
 * @swagger
 * /orders/new:
 *  post:
 *    summary: Add an order 
 *    description: Cho phép customer tạo mới một đơn hàng
 *    tags: [Orders]
 *    security:
 *      - bearerAuth: []  # Cần xác thực bằng JWT
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *                description: ID của người dùng
 *                example: "1234567890"
 *              products:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    productId:
 *                      type: string
 *                      description: ID của sản phẩm
 *                      example: "9876543210"
 *                    quantity:
 *                      type: integer
 *                      description: Số lượng sản phẩm
 *                      example: 2
 *            required:
 *              - userId
 *              - items
 *    responses:
 *      201:
 *        description: Added successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                 info:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     newOrder:
 *                       $ref: '#/components/schemas/Order'
 *      400:
 *        description: Invalid request
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server Error
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server Error"
 */

router.post('/new', verifyToken, orderValidator, orderController.createOrder);

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         orderId:
 *           type: string
 *           description: "ID của đơn hàng"
 *           example: "order12345"
 *         userId:
 *           type: string
 *           description: "ID của người dùng"
 *           example: "1234567890"
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: "ID của sản phẩm"
 *                 example: "9876543210"
 *               quantity:
 *                 type: integer
 *                 description: "Số lượng sản phẩm"
 *                 example: 2
 *               price:
 *                 type: number
 *                 description: "Giá sản phẩm"
 *                 example: 75.00
 *         totalAmount:
 *           type: number
 *           description: "Tổng số tiền của đơn hàng"
 *           example: 150.00
 *        
 *           
 */



module.exports = router;