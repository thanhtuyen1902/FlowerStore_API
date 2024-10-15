//quản lý routes liên quan đến product

const express = require('express');
const router = express.Router();
const categoryValidator = require('../app/validators/categoryValidator');
const isAdmin = require('../app/middleware/authorizeAdmin');
const verifyToken = require('../app/middleware/verifyToken');
const categoryController = require('../app/controllers/CategoryController');



/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API quản lý danh mục
 */




// XEM CHI TIẾT DANH MỤC (gồm những sản phẩm gì)?
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get categories detail
 *     description: Trả về chi tiết một danh mục
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []  # Cần xác thực bằng JWT
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "670635b4dab9df5bc86572ec"
 *                 categoryName:
 *                   type: string
 *                   example: "Hoa khô"
 *                 description:
 *                   type: string
 *                   example: "Các loại hoa khô trang trí đẹp"
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 __v:
 *                   type: integer
 *                   example: 0
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category not found"
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */



router.get('/:id', verifyToken, categoryController.getDetailCategory);

//XEM TẤT CẢ DANH MỤC HIỆN CÓ
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Trả về danh sách tất cả các danh mục sản phẩm.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []  # Cần xác thực bằng JWT
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       404:
 *         description: Not found
 *         content:  
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category not found"
 *       500:
 *         description: Server Error
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */


router.get('/', verifyToken, categoryController.getAllCategories);





//TẠO DANH MỤC MỚI {admin}

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Add new category
 *     description: Thêm một danh mục sản phẩm mới.
 *     operationId: addCategory
 *     tags: [Categories]
 *     security:
 *      - bearerAuth: []  # Cần xác thực bằng JWT
 *     requestBody:
*        required: true
*        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 description: Tên danh mục
 *                 example: Hoa khô
 *               description:
 *                 type: string
 *                 description: Mô tả danh mục
 *                 example: Hoa khô trang trí
 *               isActive:
 *                 type: boolean
 *                 description: Trạng thái
 *                 example: true
 * 
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Added category successfully
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
 *                       example: "Created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     newCategory:
 *                       $ref: '#/components/schemas/Category'
 *                   
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server Error
 *         content:  
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

router.post('/', [verifyToken, isAdmin], categoryValidator, categoryController.createNewCategories);


//CẬP NHẬT DANH MỤC {admin}

/**
 * @swagger
 * /categories/{categoryId}:
 *  put:
 *    summary: Update a category
 *    tags: [Categories]
 *    security:
 *      - bearerAuth: []  # Cần xác thực bằng JWT
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID của danh mục cần cập nhật
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: Tên mới của danh mục
 *              description:
 *                type: string
 *                description: Mô tả mới cho danh mục
 *            required:
 *              - name
 *              - description
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
 *                     updateCategory:
 *                       $ref: '#/components/schemas/Category'
 *      400:
 *        description: Invalid request
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
 *                   example: "Category not found"
 *      500:
 *        description: Server Error
 *        content:  
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

router.put('/:id', [verifyToken, isAdmin], categoryValidator, categoryController.updateCategory);


//XÓA DANH MỤC {admin}


/**
 * @swagger
 * /categories/{categoryId}:
 *  delete:
 *    summary: Delete a category
 *    tags: [Categories]
 *    security:
 *      - bearerAuth: []  # Cần xác thực bằng JWT
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID của danh mục cần xóa
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
 *                     deleteCategory:
 *                       $ref: '#/components/schemas/Category'
 *      400:
 *        description: Invalid request
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
 *                   example: "Category not found"
 *      500:
 *        description: Server Error
 *        content:  
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

router.delete('/:id', [verifyToken, isAdmin], categoryController.deleteCategory);

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "670635b4dab9df5bc86572ec"
 *         categoryName:
 *           type: string
 *           example: "Hoa khô"
 *         description:
 *           type: string
 *           example: "Các loại hoa khô trang trí đẹp"
 *         isActive:
 *           type: boolean
 *           example: true
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             description: Products in this category
 *             example: "670635b4dab9df5bc86576sd"
 *         __v:
 *           type: integer
 *           example: 0
 */

module.exports = router;