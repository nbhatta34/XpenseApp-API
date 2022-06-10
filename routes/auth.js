const express = require("express");
const router = express.Router();
const app = express();

const { register, login, addTransaction, viewTransaction, deleteTransaction, updateTransaction, homepage } = require("../controllers/auth");

const { protect } = require("../middleware/auth");
router
    .route("/register")
    .post(register);

router.post("/login", login);

router
    .route("/addTransaction")
    .post(protect, addTransaction)
    .get(protect, viewTransaction)

router
    .route("/updateTransaction/:transactionId")
    .put(protect, updateTransaction)
    .delete(protect, deleteTransaction)


    router.route("/home")
    .get(homepage)

module.exports = router;
