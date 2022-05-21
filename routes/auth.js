const express = require("express");
const router = express.Router();
const app = express();

const { register } = require("../controllers/auth");

const { protect } = require("../middleware/auth");
router
    .route("/register")
    .post(register);



module.exports = router;
