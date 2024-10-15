const Product = require('../models/Product');
const Category = require('../models/Category');
const { validationResult } = require('express-validator');
const productValidator = require('../validators/productValidator');
class ProductController {


    // Lấy danh tất cả sách sản phẩm (chưa test lại) {admin, user}
    // {GET} /products
    async getAllProducts(req, res, next) {
        // res.setHeader('Content-type', 'application/json');
        // res.writeHead(200, {
        //     'Content-type': 'application/json',
        //     'X-Powered-By': 'Node.js'
        // })
        // res.end(JSON.stringify())
        const userRole = req.user.role;
        try {
            const products = await Product.find({ isActive: true }); // Lấy tất cả sản phẩm từ MongoDB
            // let products;

            // if (userRole === 'admin') {
            //     // Nếu là admin, lấy tất cả sản phẩm
            //     products = await Product.find();
            // } else {
            //     // Nếu là user, chỉ lấy sản phẩm isActive = true
            //     products = await Product.find({ isActive: true });
            // }

            if (!products) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }

    }

    // Lấy chi tiết 1 sản phẩm theo id  (chưa test lại) {admin, user}
    // {GET} /products/:id
    async getDetailProduct(req, res, next) {
        const productId = req.params.id;
        const userRole = req.user.role;
        try {

            const product = await Product.findOne({ _id: productId, isActive: true }); // Tìm sản phẩm theo ID

            // let product;

            // if (userRole === 'admin') {
            //     // Nếu là admin, có thể xem được cả sản phẩm inactive
            //     product = await Product.findById(productId);
            // } else {
            //     // Nếu là user, chỉ được xem sản phẩm đang active
            //     product = await Product.findOne({ _id: productId, isActive: true });
            // }
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    };


    // Thêm mới một sản phẩm
    // {POST} /products/new

    async addProduct(req, res, next) {
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
        // Gọi hàm xác thực
        // const validationResult = await productValidator(req.body);

        // // Kiểm tra xem có lỗi hay không
        // if (validationResult.error) {
        //     return res.status(400).json({ message: validationResult.error });
        // }
        try {
            // var productInfo = {
            //     name: req.body.name,
            //     description: req.body.description,
            //     image: req.body.image,
            //     color: req.body.color,
            //     price: req.body.price,
            //     quantity: req.body.quantity,
            //     categoryId: req.body.categoryId,
            // }
            const { name, description, image, color, price, quantity, categoryId, isActive } = req.body;

            const productInfo = {
                name,
                description,
                image,
                color,
                price,
                quantity,
                categoryId,
                isActive,
            };

            // const categoryId = req.body.categoryId;

            const newProduct = await Product.create(productInfo);


            if (newProduct) {
                // Cập nhật sản phẩm vào danh sách products của category tương ứng
                await Category.findByIdAndUpdate(
                    newProduct.categoryId,
                    { $addToSet: { products: newProduct._id } }, // Thêm productId vào mảng products
                    { new: true } // Trả về document đã được cập nhật
                );
                res.status(201).json({
                    info: {
                        message: 'Added successfully',

                    },
                    data: {
                        newProduct: newProduct
                    }
                })
            }
        } catch (error) {

            res.status(500).json({ message: 'Server Error' });
        }

    }
    // Cập nhật sản phẩm theo id
    // {PUT} /products/{id}

    async updateProduct(req, res, next) {
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
        try {
            const productId = req.params.id;
            const updateData = req.body;

            // Tìm sản phẩm theo ID và cập nhật thông tin
            const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

            // Kiểm tra xem sản phẩm có tồn tại không
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            // Trả về phản hồi thành công với sản phẩm đã cập nhật
            res.status(200).json({
                info: {
                    message: 'Updated successfully',
                },
                data: {
                    updateProduct: updatedProduct,
                }
            });
        } catch (error) {

            res.status(500).json({ message: 'Server Error' });
        }
    }



    // Xóa một sản phẩm theo id (xóa cứng)
    // {DELETE} /products/{id}

    async deleteProduct(req, res, next) {
        try {
            const productId = req.params.id;

            // Tìm và xóa sản phẩm theo ID
            // const deletedProduct = await Product.findByIdAndDelete(productId);

            // const deletedProduct = await Product.findByIdAndDelete(productId);
            const deletedProduct = await Product.findOneAndDelete({ _id: productId, isActive: true });


            // Kiểm tra xem sản phẩm có tồn tại không
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            // Cập nhật category để xóa productId khỏi danh sách products
            await Category.findByIdAndUpdate(
                deletedProduct.categoryId,
                { $pull: { products: productId } }, // Xóa productId khỏi mảng products
                { new: true } // Trả về document đã được cập nhật
            );
            // Trả về phản hồi thành công
            res.status(200).json({
                info: {
                    message: 'Deleted successfully',
                },
                data: {
                    deleteProduct: deletedProduct,
                }
            });
        } catch (error) {

            res.status(500).json({ message: 'Server Error' });
        }
    }


};

module.exports = new ProductController;