//quản lý routes liên quan đến product

const express = require('express');
const router = express.Router();
const productValidator = require('../app/validators/productValidator');
const isAdmin = require('../app/middleware/authorizeAdmin');
const verifyToken = require('../app/middleware/verifyToken');
const productController = require('../app/controllers/ProductController');



/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API quản lý sản phẩm
 */


//LẤY TẤT CẢ SẢN PHẨM {admin, user}

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product not found"
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
 * 
 */
router.get('/', verifyToken, productController.getAllProducts);



// LẤY THÔNG TTN 1 SẢN PHẨM {admin, user}


/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product details
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm cần lấy thông tin
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Product'
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
 *                   example: "Product not found"
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
router.get('/:id', verifyToken, productController.getDetailProduct);



//THÊM MỘT SẢN PHẨM {admin}
/**
 * @swagger
 * /products/new:
 *   post:
 *     summary: Add new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # Nếu bạn có xác thực bằng JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên của sản phẩm
 *               description:
 *                 type: string
 *                 description: Mô tả sản phẩm
 *               image:
 *                 type: string
 *                 description: Ảnh của sản phẩm
 *               color:
 *                 type: string
 *                 description: Màu sắc
 *               price:
 *                 type: number
 *                 description: Giá của sản phẩm
 *               quantity:
 *                 type: number
 *                 description: Số lượng còn
 *               isActive:
 *                 type: boolean
 *                 description: Trạng thái
 *               
 *             required:
 *               - name
 *               - price
 *               - color
 *               - quantity
 *     responses:
 *       201:
 *         description: Added successfully
 *         content:
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
 *                     newProduct:
 *                       $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *        description: Forbidden
 *       500:
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

router.post('/new', [verifyToken, isAdmin], productValidator, productController.addProduct);

//SỬA MỘT SẢN PHẨM {admin}
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Edit a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # Nếu bạn có xác thực bằng JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm cần sửa
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên của sản phẩm
 *               description:
 *                 type: string
 *                 description: Mô tả sản phẩm
 *               image:
 *                 type: string
 *                 description: Ảnh của sản phẩm
 *               color:
 *                 type: string
 *                 description: Màu sắc
 *               price:
 *                 type: number
 *                 description: Giá của sản phẩm
 *               quantity:
 *                 type: number
 *                 description: Số lượng còn
 *             required:
 *               - name
 *               - price
 *               - color
 *               - quantity
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
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
 *                     updateProduct:
 *                       $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *        description: Forbidden 
 *       500:
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





router.put('/:id', [verifyToken, isAdmin], productValidator, productController.updateProduct);

//XÓA MỘT SẢN PHẨM {admin}
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []  # Nếu bạn có xác thực bằng JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của sản phẩm cần xóa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 *         content:
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
 *                     deleteProduct:
 *                       $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 *       403:
 *        description: Forbidden (người dùng không có quyền)
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product not found"
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
 *       
 */

router.delete('/:id', [verifyToken, isAdmin], productController.deleteProduct);


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "66f2c87fae826d020ef4f0c2"
 *         name:
 *           type: string
 *           maxLength: 100
 *           example: "Hoa cúc"
 *         description:
 *           type: string
 *           example: "Hoa đẹp lắm"
 *         image:
 *           type: string
 *           example: ""
 *         color:
 *           type: string
 *           example: "vàng"
 *         price:
 *           type: number
 *           example: 60
 *         quantity:
 *           type: number
 *           example: 1000
 *         slug:
 *           type: string
 *           example: "hoa-cuc"
 *         categoryId:
 *           type: string
 *           example: "67062fa989e18b18da99d3e4"
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-10-06T13:34:06.733Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-10-10T15:21:53.221Z"
 *       required:
 *         - name
 *         - color
 *         - price
 *         - quantity
 */

module.exports = router;