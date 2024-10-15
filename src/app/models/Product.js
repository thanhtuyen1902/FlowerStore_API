const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
mongoose.plugin(slug);



const Product = Schema({
    name: {
        type: String,
        maxLength: 100,
        require: true
    },
    description: {
        type: String,
        maxLength: 100,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        maxLength: 100,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    quantity: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Tham chiếu đến schema Category
        required: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', Product);