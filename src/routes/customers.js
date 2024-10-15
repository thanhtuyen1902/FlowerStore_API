//quản lý routes liên quan đến product

const express = require('express');
const router = express.Router();
const userValidator = require('../app/validators/userValidator');
const updateUserValidator = require('../app/validators/updateUserValidator');
const isAdmin = require('../app/middleware/authorizeAdmin');
const verifyToken = require('../app/middleware/verifyToken');
const customerController = require('../app/controllers/CustomerController');



/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: API quản lý khách hàng
 */

//XEM THÔNG TIN MỘT NGƯỜI {admin}


/**
 * @swagger
 * /users/customer/{id}:
 *   get:
 *     summary: Get customer details
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []  # Nếu bạn có xác thực bằng JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của khách hàng cần lấy thông tin
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/CustomerWithoutPassword'
 *               
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
 *                   example: "Customer not found"
 *       401:
 *         description: Unauthorized
 *       403:
 *        description: Forbidden (người dùng không có quyền truy cập)
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

router.get('/customers/:id', [verifyToken, isAdmin], customerController.getCustomerDetail);


//XEM TẤT CẢ NGƯỜI DÙNG {admin}
/**
 * @swagger
 * /users/customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []  # Nếu bạn có xác thực bằng JWT
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/CustomerWithoutPassword'
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
 *                   example: "Customer not found"
 *       401:
 *         description: Unauthorized
 *       403:
 *        description: Forbidden (người dùng không có quyền truy cập)
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
router.get('/customers', [verifyToken, isAdmin], customerController.getAllCustomers);



//THÊM 1 USERS MỚI {admin}

/**
 * @swagger
 * /users/customers:
 *  post:
 *    summary: Add new customer
 *    tags: [Customers]
 *    security:
 *      - bearerAuth: []  # Định nghĩa loại xác thực, ví dụ: JWT
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: Tên khách hàng
 *              email:
 *                type: string
 *                description: Email của khách hàng
 *              password:
 *                type: string
 *                description: Mật khẩu của khách hàng
 *            required:
 *              - username
 *              - email
 *              - password
 *    responses:
 *      201:
 *        description: Added successfully
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 info:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     newCustomer:
 *                       $ref: '#/components/schemas/Customer'
 *        
 *      400:
 *        description: Invalid request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden (người dùng không có quyền truy cập)
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



router.post('/customers', [verifyToken, isAdmin], userValidator, customerController.addCustomer);

//CẬP NHẬT USER THEO ID {admin}


/**
 * @swagger
 * /users/customers/{id}:
 *  put:
 *    summary: Update user information (Cần xác thực)
 *    tags: [Customers]
 *    security:
 *      - bearerAuth: []  # Cần xác thực bằng JWT
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID của khách hàng cần cập nhật
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: Tên khách hàng mới
 *              email:
 *                type: string
 *                description: Email mới của khách hàng
 *            required:
 *              - username
 *              - email
 *    responses:
 *      200:
 *        description: Updated successfully
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 info:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     updateCustomer:
 *                       $ref: '#/components/schemas/CustomerWithoutPassword'
 * 
 *      400:
 *        description: Invalid request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden 
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
 *    
 */



router.put('/customers/:id', [verifyToken, isAdmin], updateUserValidator, customerController.updateCustomer);

//XÓA 1 USER {admin}
/**
 * @swagger
 * /users/customers/{id}:
 *  delete:
 *    summary: Delete user 
 *    tags: [Customers]
 *    security:
 *      - bearerAuth: []  # Cần xác thực bằng JWT
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID của khách hàng cần xóa
 *    responses:
 *      200:
 *        description: Deleted successfully
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 info:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     deleteCustomer:
 *                       $ref: '#/components/schemas/CustomerWithoutPassword'
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden 
 *      404:
 *        description: Not found
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Customer not found"
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


router.delete('/customers/:id', [verifyToken, isAdmin], customerController.deleteCustomer);



/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: "username"
 *         email:
 *           type: string
 *           example: "username@gmail.com"
 *         password:
 *           type: string
 *           example: "Password123"
 *         role:
 *           type: string
 *           example: "user"
 *         orders:
 *           type: array
 *           items:
 *             type: object
 *           example: []
 *         _id:
 *           type: string
 *           example: "67088a12b2c20bdad160eb77"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-10-11T02:14:42.711Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-10-11T02:14:42.711Z"
 *         __v:
 *           type: integer
 *           description: Version key
 *           example: 0
 * 
 * 
 * 
 *     CustomerWithoutPassword:
 *       allOf:
 *         - $ref: '#/components/schemas/Customer'
 *         - type: object
 *           properties:
 *             password: 
 *               type: string
 *               description: Password (not returned)
 *               example: "hidden"
 *           required: []
 */

module.exports = router;