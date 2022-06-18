const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const SupplierSchema = new mongoose.Schema({
    supplierName: {
        type: String,
        required: [true, 'Enter client name']
    },
    mobile: {
        type: String,
        required: [true, 'Enter mobile number'],
        maxlength: 10,
        minlength: 10,
    },
    address: {
        type: String,
        required: [true, "Enter address"]
    },
    email: {
        type: String,
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

SupplierSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};


module.exports = mongoose.model("Supplier", SupplierSchema);