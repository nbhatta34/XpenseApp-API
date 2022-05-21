const express = require("express");
const router = express.Router();
const app = express();

const { register, login, addTransaction, viewTransaction, deleteTransaction } = require("../controllers/auth");

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
    .delete(protect, deleteTransaction)



module.exports = router;
