//quản lý routes liên quan đến product

const express = require('express');
const router = express.Router();
const userValidator = require('../app/validators/userValidator');
const updateUserValidator = require('../app/validators/updateUserValidator');
const isAdmin = require('../app/middleware/authorizeAdmin');
const verifyToken = require('../app/middleware/verifyToken');
const meController = require('../app/controllers/MeController');



//XEM THÔNG TIN CÁ NHÂN


/**
 * @swagger
 * /me/profile:
 *   get:
 *     summary: Get personal information
 *     tags: [AuthO]
 *     security:
 *       - bearerAuth: []  # Nếu bạn có xác thực bằng JWT
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                 _id:
 *                   type: string
 *                   example: "670291ce943897406d029130"
 *                 username:
 *                   type: string
 *                   example: "username"
 *                 email:
 *                   type: string
 *                   example: "username@gmail.com"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-10-06T13:34:06.733Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-10-10T15:21:53.221Z"
 *                 __v:
 *                   type: integer
 *                   example: 0
 *                 role:
 *                   type: string
 *                   example: "user"
 *                
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized
 *       403:
 *        description: Forbidden (người dùng không có quyền truy cập)
 *       500:
 *         description: Server Error
 */

router.get('/', verifyToken, meController.getProfile);




//CẬP NHẬT THÔNG TIN CÁ NHÂN

/**
 * @swagger
 * /me/profile:
 *  put:
 *    summary: Update personal information
 *    tags: [AuthO]
 *    security:
 *      - bearerAuth: []  # Cần xác thực bằng JWT
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: Tên người dùng mới
 *              email:
 *                type: string
 *                description: Email mới của người dùng
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
 *                       example: 'Updated successfully'
 *                 data:
 *                   type: object
 *                   properties:
 *                     updateUser:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "670291ce943897406d029130"
 *                         username:
 *                           type: string
 *                           example: "newName"
 *                         email:
 *                           type: string
 *                           example: "newEmail@gmail.com"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-10-06T13:34:06.733Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-10-10T15:21:53.221Z"
 *                         __v:
 *                           type: integer
 *                           example: 0
 *                         role:
 *                           type: string
 *                           example: "user"
 *      400:
 *        description: Invalid request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden (người dùng không có quyền cập nhật thông tin của người dùng khác)
 *    
 */


router.put('/', verifyToken, updateUserValidator, meController.updateProfile);



//chưa phát triển

router.put('/changepwd', verifyToken, meController.changeUserPwd);



module.exports = router;