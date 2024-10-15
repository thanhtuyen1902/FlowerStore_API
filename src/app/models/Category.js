const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
mongoose.plugin(slug);



const Category = Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true, // Đảm bảo tên danh mục là duy nhất
        trim: true // Xóa khoảng trắng ở đầu và cuối
    },
    description: {
        type: String,
        required: true,
        trim: true // Xóa khoảng trắng ở đầu và cuối
    },
    isActive: {
        type: Boolean,
        default: true // Mặc định là chưa bị xóa
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Tham chiếu đến schema Product
    }],
});

module.exports = mongoose.model('Category', Category);