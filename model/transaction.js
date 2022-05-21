const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const TransactionSchema = new mongoose.Schema({
    itemName: {
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
    },
    clientName: {
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

TransactionSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};


module.exports = mongoose.model("Transaction", TransactionSchema);