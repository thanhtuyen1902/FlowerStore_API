const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
mongoose.plugin(slug);



const User = Schema({
    username: {
        type: String,
        maxLength: 100,
        require: true
    },
    email: {
        type: String,
        maxLength: 100,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        maxLength: 100,
        require: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Chỉ chấp nhận giá trị 'admin' hoặc 'user'
        default: 'user', // Mặc định là user
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order' // Tham chiếu đến schema Order
    }],
}, {
    timestamps: true
});

// module.exports = mongoose.model('User', User);

module.exports = mongoose.model('User', User);