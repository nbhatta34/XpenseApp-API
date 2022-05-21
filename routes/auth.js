const express = require("express");
const router = express.Router();
const app = express();

const { register, login } = require("../controllers/auth");

const { protect } = require("../middleware/auth");
router
    .route("/register")
    .post(register);

router.post("/login", login);


module.exports = router;
