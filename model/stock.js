const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const StockSchema = new mongoose.Schema({
    stockName: {
        type: String,
        required: [true, 'Enter item name']
    },
    quantity: {
        type: String,
        required: [true, 'Enter quantity']
    },
    unitPrice: {
        type: String,
        required: [true, 'Enter unit price']
    },
    category: {
        type: String,
        // required: [true, "Please add a category"],
    },
    supplierName: {
        type: String,
        required: [true, "Enter client name"],
    },
    userId: {
        type: String,
        required: [true, "Logged in user id not found"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
StockSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};


module.exports = mongoose.model("Stock", StockSchema);