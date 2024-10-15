const Product = require('../models/Product');
const User = require('../models/User');
const Category = require('../models/Category');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
class CategoryController {


    // Lấy tất cả danh mục (chưa test lại) {admin, user}
    // {GET} /orders
    async getAllCategories(req, res, next) {
        const userRole = req.user.role;
        try {
            const categories = await Category.find({ isActive: true }); // Lấy tất cả danh mục từ MongoDB
            // let categories;
            // if (userRole === 'admin') {
            //     // Admin có thể xem tất cả danh mục, bao gồm cả danh mục đã xóa mềm
            //     categories = await Category.find(); // Hoặc tìm với điều kiện phù hợp
            // } else {
            //     // User chỉ xem các danh mục không bị xóa
            //     categories = await Category.find({ isActive: true });
            // }
            if (!categories) {
                return res.status(404).json({ message: 'Category not found' }); // Nếu không tìm thấy, trả về 404
            }
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }

    }

    //Xem chi tiết một danh mục (chưa test lại) {admin, user}
    //{GET} categories/{categoriesId}
    async getDetailCategory(req, res, next) {
        const categoryId = req.params.id;
        const userRole = req.user.role;
        try {
            // const categoryInfo = await Category.findById(categoryId).populate('products'); // Tìm danh mục theo ID và populate sản phẩm

            // if (!categoryInfo) {
            //     return res.status(404).json({ message: 'Category not found' }); // Nếu không tìm thấy, trả về 404
            // }
            // if (categoryInfo.isActive) {
            //     return res.status(410).json({ message: 'Category has been deleted' }); // Danh mục đã bị xóa mềm
            // }
            // let category;

            // Kiểm tra quyền truy cập
            // if (userRole === 'admin') {
            //     // Admin có thể xem tất cả danh mục, bao gồm cả danh mục đã xóa mềm
            //     category = await Category.findById(categoryId).populate('products');
            // } else {
            //     // User chỉ có thể xem danh mục chưa xóa
            //     category = await Category.findOne({ _id: categoryId, isActive: true });
            // }
            const category = await Category.findById({ _id: categoryId, isActive: true }).populate('products');
            if (!category) {
                return res.status(404).json({ message: 'Category not found' }); // Nếu không tìm thấy, trả về 404
            }
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }

    }



    // Tạo một danh mục mới (chưa test lại) {admin}
    // {POST} /categories
    async createNewCategories(req, res, next) {
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
        // const name = req.body.name;
        // const description = req.body.description;
        const { categoryName, description, isActive } = req.body;
        // const categoryData = {
        //     categoryName: req.body.categoryName,
        //     description: req.body.description,
        //     isActive: req.body.isActive,
        // }
        const categoryData = {
            categoryName,
            description,
            isActive,
        }
        try {
            // Tạo và lưu danh mục mới
            // const newCategory = await Category.create({
            //     categoryName: name,
            //     description: description,
            // });
            const newCategory = await Category.create(categoryData);

            return res.status(201).json({
                info: {
                    message: 'Created successfully',
                },
                data: {
                    newCategory: newCategory,
                }

            }); // Trả về danh mục vừa tạo
        } catch (error) {
            return res.status(500).json({ message: 'Server Error' });
        }
    };

    //Sửa một danh mục
    //{PUT} categories/{categoriesId}
    async updateCategory(req, res, next) {
        // const categoryId = req.params.id; // Lấy ID từ tham số URL
        // const categoryData = req.body; // Lấy dữ liệu từ yêu cầu
        // const products = categoryData.products;
        // try {
        //     // Tìm danh mục theo ID và cập nhật các trường cần thiết
        //     const updateCategory = await Category.findByIdAndUpdate(
        //         categoryId,
        //         categoryData,
        //         { new: true } // Trả về tài liệu đã cập nhật
        //     );

        //     if (!updateCategory) {
        //         return res.status(404).json({ message: 'Category not found' }); // Nếu không tìm thấy, trả về 404
        //     }

        //     // Tìm tất cả các sản phẩm theo ID
        //     const foundProducts = await Product.find({ _id: { $in: products } });

        //     // Tạo một mảng chứa các ID đã tìm thấy
        //     const foundProductIds = foundProducts.map(product => product._id.toString());

        //     // Tìm các ID không tồn tại
        //     const notFoundIds = products.filter(productId => !foundProductIds.includes(productId));
        //     // Cập nhật thông tin sản phẩm để phản ánh danh mục mới
        //     await Product.updateMany(
        //         { _id: { $in: products } }, // Tìm tất cả sản phẩm có ID nằm trong danh sách sản phẩm mới
        //         { categoryId: categoryId } // Cập nhật categoryId cho những sản phẩm này
        //     );
        //     return res.status(200).json({
        //         info: {
        //             message: 'Category updated successfully',
        //         },
        //         data: {
        //             updatedCategory: updatedCategory,
        //         },
        //         productUpdated: {
        //             message: 'Những sản phẩm tồn tại',
        //             foundProduct: foundProductIds,
        //         },
        //         productNotUpdate: {
        //             message: 'Những sản phẩm không tồn tại',
        //             notFoundProduct: notFoundIds,
        //         }
        //     }); // Trả về danh mục đã cập nhật
        // } catch (error) {
        //     return res.status(500).json({ message: 'Server Error' }); // Xử lý lỗi
        // }
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

        const { categoryName, description, isActive } = req.body;
        const categoryId = req.params.id;


        var categoryInfo = {
            categoryName,
            description,
            isActive,
        }

        try {


            const updatedCategory = await Category.findByIdAndUpdate(categoryId, categoryInfo, { new: true });

            if (!updatedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json({
                info: {
                    message: 'Updated successfully',
                },
                data: {
                    updateCategory: updatedCategory,
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }

    };




    //Xóa một danh mục (xóa mềm?)
    //{DELETE} categories/{categoriesId}
    async deleteCategory(req, res, next) {
        const categoryId = req.params.id;

        try {
            // const updatedCategory = await Category.findByIdAndUpdate(
            //     categoryId,
            //     { isActive: false }, // Đánh dấu là đã xóa
            //     { new: true } // Trả về tài liệu đã cập nhật
            // );

            // if (!updatedCategory) {
            //     return res.status(404).json({ message: 'Category not found' });
            // }

            // Cập nhật tất cả các sản phẩm thuộc danh mục này, set isActive = false
            // await Product.updateMany(
            //     { categoryId: categoryId },
            //     { isActive: false }
            // );

            // return res.status(200).json({
            //     message: 'Category soft deleted successfully',
            //     data: updatedCategory
            // });
            const deletedCategory = await Category.findByIdAndDelete(categoryId);

            if (!deletedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json({
                info: {
                    message: 'Deleted successfully',
                },
                data: {
                    deleteCategory: deletedCategory,
                },
            });

        } catch (error) {
            return res.status(500).json({ message: 'Server Error' });
        }


        //     // Khởi tạo session để bắt đầu transaction
        //     const session = await mongoose.startSession();
        //     session.startTransaction(); // Bắt đầu transaction

        //     try {
        //         // Cập nhật các sản phẩm thuộc danh mục này
        //         const updatedProducts = await Product.updateMany(
        //             { categoryId: categoryId },
        //             { isActive: false },
        //             { session }  // Đảm bảo thao tác này thuộc transaction
        //         );

        //         // Xóa danh mục trong transaction
        //         const deletedCategory = await Category.findByIdAndDelete(categoryId, { session });

        //         if (!deletedCategory) {
        //             // Nếu không tìm thấy danh mục, hủy transaction và trả lỗi
        //             await session.abortTransaction();
        //             session.endSession(); // Kết thúc session
        //             return res.status(404).json({ message: 'Category not found' });
        //         }

        //         // Nếu tất cả thành công, commit transaction
        //         await session.commitTransaction();
        //         session.endSession();

        //         res.status(200).json({
        //             info: {
        //                 message: 'Deleted successfully',
        //             },
        //             data: {
        //                 deleteCategory: deletedCategory,
        //             },
        //         });
        //     } catch (error) {
        //         // Nếu có lỗi, hủy transaction và kết thúc session
        //         await session.abortTransaction();
        //         session.endSession();
        //         return res.status(500).json({ message: 'Server Error', error });
        //     }

    };

};

module.exports = new CategoryController;


