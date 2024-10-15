//quản lý routes liên quan đến product

const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');
const registerValidator = require('../app/validators/registerValidator');
const loginValidator = require('../app/validators/loginValidator');

/**
 * @swagger
 * tags:
 *   name: AuthO
 *   description: API xác thực phân quyền
 */




/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new user account
 *     tags: [AuthO]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Tên của người dùng
 *               email:
 *                 type: string
 *                 description: Mật khẩu của người dùng
 *               password:
 *                 type: string
 *                 description: Mật khẩu của người dùng
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: Registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo đăng ký thành công
 *                 token:
 *                   type: string
 *                   description: Token JWT cho người dùng
 *       400:
 *         description: User already exist
 *       500:
 *         description: Server Error
 */
router.post('/register', registerValidator, authController.register);




/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [AuthO]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo thành công
 *                 token:
 *                   type: string
 *                   description: Token JWT cho người dùng
 *       401:
 *         description: Invalid information
 *       500:
 *         description: Server Error
 */


router.post('/login', loginValidator, authController.login);




module.exports = router;