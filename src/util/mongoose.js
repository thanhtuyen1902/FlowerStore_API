const { mongo } = require("mongoose");
const { mongooseToObject } = require("../../../blogF8/src/util/mongoose");


module.exports = {
    multiMongooseToObject: function (mongooses) {
        return mongooses.map(mongoose => mongoose.ToObject())
    },

    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.ToObject() : mongoose
    }

};