const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const StockCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, 'Enter Category Name']
    },
    picture: {
        type: String,
        default: "xpense1.png"
    },
    userId: {
        type: String,

    }
});

StockCategorySchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};


module.exports = mongoose.model("StockCategory", StockCategorySchema);