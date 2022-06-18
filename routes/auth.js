const express = require("express");
const router = express.Router();
const app = express();

const {
    register,
    getMe,
    login,
    addTransaction,
    viewTransaction,
    deleteTransaction,
    updateTransaction,
    addStock,
    viewStock,
    updateStock,
    deleteStock,
    logout,
    updateProfile,
    uploadImage,
    addCategory,
    viewCategory,
    uploadThumbnail,
    addClientInformation,
    viewClientInformation,
    deleteClientInformation,
    addStockCategory,
    viewStockCategory,
    uploadStockCategoryThumbnail,
    deleteStockCategory,
    homepage } = require("../controllers/auth");

const { protect } = require("../middleware/auth");
router
    .route("/register")
    .get(protect, getMe)
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

router
    .route("/addStock")
    .post(protect, addStock)
    .get(protect, viewStock)

router
    .route("/updateStock/:stockId")
    .put(protect, updateStock)
    .delete(protect, deleteStock)

router.post("/logout", logout)

router
    .route("/profile")
    .put(protect, updateProfile);

router
    .route("/:id/photo")
    .put(protect, uploadImage);

router
    .route("/addCategory")
    .post(protect, addCategory)
    .get(protect, viewCategory)

router
    .route("/:id/:catName/photo")
    .post(protect, uploadThumbnail);

router
    .route("/addClientInformation")
    .post(protect, addClientInformation)
    .get(protect, viewClientInformation)

router
    .route("/deleteClientInformation/:clientId")
    .delete(deleteClientInformation)

router
    .route("/deleteCategory/:categoryId")
    .delete(deleteCategory)

router
    .route("/addStockCategory")
    .post(protect, addStockCategory)
    .get(protect, viewStockCategory)

router
    .route("/:id/:stockCatName/photo")
    .post(protect, uploadStockCategoryThumbnail);

router
    .route("/deleteStockCategory/:categoryId")
    .delete(deleteStockCategory)



router.route("/home")
    .get(homepage)

module.exports = router;
