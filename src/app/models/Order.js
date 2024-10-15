const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
mongoose.plugin(slug);



const Order = Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1, // Số lượng tối thiểu là 1
        },
        price: {
            type: Number,
            required: true,
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Order', Order);