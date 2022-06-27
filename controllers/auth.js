const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../model/user");
const crypto = require("crypto");


//--------------------------     REGISTER USER        -----------------------------

exports.register = asyncHandler(async(req, res, next) => {
    // console.log("Register User Function")
    // console.log(req.body.fname)
    const { fname, lname, email, password } = req.body;
    const user = await User.create({
        fname,
        lname,
        email,
        password,
    });

    sendTokenResponse(user, 200, res);
});



//-------------------          LOGIN USER        ---------------------------------------

exports.login = asyncHandler(async(req, res, next) => {
    // console.log("Login User Function")
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse("Please provide email and password"), 400);
    }

    // Check user
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
        res
            .status(201)
            .json({
                success: false,
                message: 'Invalid credentials user',
            });
    }

    if (user.password != password) {
        res
            .status(201)
            .json({
                success: false,
                message: 'Invalid credentials',
            });
    } else {
        sendTokenResponse(user, 200, res);
    }
});


// ------------------------------------------------------------------------------------------------------

// ---------------------------        ADD TRANSACTION        ------------------------------

exports.addTransaction = asyncHandler(async(req, res, next) => {
    // console.log("Add Transaction Function")
    // console.log(req.body)
    const { itemName, quantity, unitPrice, category, clientName } = req.body;
    const userId = req.user.id;
    const transaction = await Transaction.create({
        itemName,
        quantity,
        unitPrice,
        category,
        clientName,
        userId,
    });

    sendTokenResponse(transaction, 200, res);
});
// -----------------------------------------------------------------------------------------
//-------------------------        VIEW ALL TRANSACTIONS      ------------------------------

exports.viewTransaction = asyncHandler(async(req, res, next) => {
    // setTimeout(async () => {
    console.log("View Transactions Function")
        // console.log(req.user.id)
    const getTransaction = await Transaction.find({ userId: req.user.id })
        // console.log(getTransaction)
    res.status(200).json({
        success: true,
        message: "Success",
        data: getTransaction,
    });
    // }, 300);
});
// ----------------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++     DELETING TRANSACTION   ++++++++++++++++++++++++++++

exports.deleteTransaction = asyncHandler(async(req, res, next) => {
    // console.log("User Profile Data Reached in Delete Transaction Backend Function");
    const transactionId = req.params.transactionId;
    // console.log(transactionId);

    const ifTransactionExists = await Transaction.findOne({ _id: transactionId })

    if (!ifTransactionExists) {
        return res.json("Transaction ID doesn't exist");
    }
    const transaction = await Transaction.findByIdAndDelete(transactionId);
    // console.log("Transaction Data");
    // console.log(transaction);
    return res.json(transaction);


});

// --------------------------------------------------------------------------------------------

// +++++++++++++++++++++++++++++++     UPDATING TRANSACTION   ++++++++++++++++++++++++++++


exports.updateTransaction = asyncHandler(async(req, res, next) => {
    // console.log("User Profile Data Reached in Update Transaction Backend Function");
    const transactionId = req.params.transactionId;
    console.log(transactionId);

    const data = req.body;
    const ifTransactionExists = await Transaction.findOne({ _id: transactionId })

    if (!ifTransactionExists) {
        return res.json("Transaction ID doesn't exist");
    }
    const transaction = await Transaction.findByIdAndUpdate(transactionId, data);
    // console.log("Transaction Data");
    // console.log(transaction);
    return res.json(transaction);


});
exports.homepage = asyncHandler(async(req, res, next) => {
    // const categoryId = req.params.categoryId;


    // const ifCategoryExists = await Category.findOne({ _id: categoryId })

    // if (!ifCategoryExists) {
    //   return res.json("Category ID doesn't exist");
    // }
    // const category = await Category.findByIdAndDelete(categoryId);

    return res.json("Welcome To Home");
});
// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

//------------------------------Add Stock -----------------------------------------
exports.addStock = asyncHandler(async(req, res, next) => {
    console.log("Add stock Function")
        // console.log(req.body)
    const { stockName, quantity, unitPrice, category, supplierName } = req.body;
    const userId = req.user.id;
    const stock = await Stock.create({
        stockName,
        quantity,
        unitPrice,
        category,
        supplierName,
        userId,
    });
    sendTokenResponse(stock, 200, res);
});

//----------------------------------------------------------------------------------------

//-------------------------        VIEW ALL STOCKS      ------------------------------

exports.viewStock = asyncHandler(async(req, res, next) => {
    setTimeout(async() => {
        console.log("View Stocks Function")
            // console.log(req.user.id)
        const getStock = await Stock.find({ userId: req.user.id })
            // console.log(getTransaction)
        res.status(200).json({
            success: true,
            message: "Success",
            data: getStock,
        });
    }, 100);
});
//------------------------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++     UPDATING STOCKS   ++++++++++++++++++++++++++++


exports.updateStock = asyncHandler(async(req, res, next) => {

    const stockId = req.params.stockId;
    console.log(stockId);

    const data = req.body;
    const ifStockExists = await Stock.findOne({ _id: stockId })

    if (!ifStockExists) {
        return res.json("Stock ID doesn't exist");
    }
    const stock = await Stock.findByIdAndUpdate(stockId, data);

    return res.json(stock);


});
//---------------------------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++     DELETING STOCK   ++++++++++++++++++++++++++++


exports.deleteStock = asyncHandler(async(req, res, next) => {
    // console.log("User Profile Data Reached in Delete Transaction Backend Function");
    const stockId = req.params.stockId;
    // console.log(transactionId);

    const ifStockExists = await Stock.findOne({ _id: stockId })

    if (!ifStockExists) {
        return res.json("Stock ID doesn't exist");
    }
    const stock = await Stock.findByIdAndDelete(stockId);
    // console.log("Transaction Data");
    // console.log(transaction);
    return res.json(stock);


});
// ---------------------------------------------------------------------------------------

//------------------                  LOGOUT USER           ---------------------------------

exports.logout = asyncHandler(async(req, res, next) => {
    res.cookie("token", "none", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        data: "User Logged out",
    });
});
// --------------------------------------------------------------------------------------------------
//-------------------------        CURRENT USER DETAILS      ------------------------------

exports.getMe = asyncHandler(async(req, res, next) => {
    // setTimeout(async () => {
    console.log(req.user.id)
    const user = await User.findById(req.user.id);
    console.log(user)
    res.status(200).json({
        success: true,
        message: "Success",
        data: user,
    });
    // }, 700);
});
//-----------------------------------------------------------------------------------------------------

// +++++++++++++++++++++++++++++++     UPDATING USER PROFILE   ++++++++++++++++++++++++++++
exports.updateProfile = asyncHandler(async(req, res, next) => {
    console.log("User Profile Data Reached in Update Profile Backend Function");
    const loggedInUserID = req.user.id;
    console.log(loggedInUserID);
    const data = req.body;
    const ifUserExists = await User.findOne({ _id: loggedInUserID })

    if (!ifUserExists) {
        return res.json("User ID doesn't exist");
    }
    const user = await User.findByIdAndUpdate(loggedInUserID, data);
    console.log("User Profile Data");
    console.log(user);
    return res.json(user);
});

//------------------------------------------------------------------------------------------------------

// +++++++++++++++++++++++++++++++     UPDATING USER PICTURE   ++++++++++++++++++++++
exports.uploadImage = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id);
    console.log(req.params.id)
    console.log(req.files)
    if (!user) {
        return next(new ErrorResponse(`No user found with ${req.params.id}`), 404);
    }

    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.file;

    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        console.log("file thulo vayo hajur")
        return next(
            new ErrorResponse(
                `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
                400
            )
        );
    }

    filename = `photo_${user.id}${file.name}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async(err) => {
        if (err) {
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        //insert the filename into database
        await User.findByIdAndUpdate(req.params.id, {

            picture: file.name,

        });
        console.log("image upload vayo hajur")
    });

    res.status(200).json({
        success: true,
        data: file.name,
    });
});

//---------------------------------------------------------------------------------------------------
//-----------------------Add Category -----------------------------------------
exports.addCategory = asyncHandler(async(req, res, next) => {
    console.log("Add Category Function")
    console.log(req.body)
    console.log(req.user.id)
    const { categoryName } = req.body;
    const userId = req.user.id;
    const category = await Category.create({
        categoryName,
        userId,
    });
    // console.log(category)
    return res.json({ category, status: "200" });
});
// ----------------------------------------------------------------------------------

//-------------------------        VIEW CATEGORY      ------------------------------

exports.viewCategory = asyncHandler(async(req, res, next) => {
    console.log("View Category Function")
    const getCategory = await Category.find({ userId: req.user.id })
    res.status(200).json({
        success: true,
        message: "Success",
        data: getCategory,
    });
});
// ----------------------------------------------------------------------------------

// +++++++++++++++++++++++++++++++     UPLOADING CATEGORY THUMBNAIL PICTURE   ++++++++++++++++++++++
exports.uploadThumbnail = asyncHandler(async(req, res, next) => {
    console.log("Upload Thumbnail")
    console.log(req.params.catName)


    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.file;

    const userId = req.user.id;

    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        console.log("file thulo vayo hajur")
        return next(
            new ErrorResponse(
                `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
                400
            )
        );
    }

    filename = `${req.params.catName}_${req.user.id}.png`;
    console.log(filename);

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${filename}`, async(err) => {
        if (err) {
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        //insert the filename into database
        await Category.findByIdAndUpdate(req.params.id, {

            picture: filename,

        });
        console.log("image upload vayo hajur")
    });

    res.status(200).json({
        success: true,
        data: file.name,
    });
});
// ------------------------------------------------------------------------------------
//-----------------------Add Client Information -----------------------------------------
exports.addClientInformation = asyncHandler(async(req, res, next) => {
    console.log("Add Client Function")
    console.log(req.body)
    const { clientName, mobile, address, email } = req.body;
    const userId = req.user.id;
    const client = await Client.create({
        clientName,
        mobile,
        address,
        email,
        userId,
    });
    sendTokenResponse(client, 200, res);
});

//-------------------------        VIEW CLIENT INFORMATION      ------------------------------

exports.viewClientInformation = asyncHandler(async(req, res, next) => {
    console.log("View Client Function")
    const getClientInformation = await Client.find({ userId: req.user.id })
    res.status(200).json({
        success: true,
        message: "Success",
        data: getClientInformation,
    });
});
// ----------------------------------------------------------------------------------
//-------------------------        DELETE CLIENT INFORMATION      ------------------------------

exports.deleteClientInformation = asyncHandler(async(req, res, next) => {
    const clientId = req.params.clientId;


    const ifClientExists = await Client.findOne({ _id: clientId })

    if (!ifClientExists) {
        return res.json("Client ID doesn't exist");
    }
    const client = await Client.findByIdAndDelete(clientId);

    return res.json(client);

})

//-------------------------        DELETE CATEGORY      ------------------------------

exports.deleteCategory = asyncHandler(async(req, res, next) => {
    const categoryId = req.params.categoryId;


    const ifCategoryExists = await Category.findOne({ _id: categoryId })

    if (!ifCategoryExists) {
        return res.json("Category ID doesn't exist");
    }
    const category = await Category.findByIdAndDelete(categoryId);

    return res.json(category);
});
// ----------------------------------------------------------------------------------
//-----------------------  Add Supplier Information -----------------------------------------
exports.addSupplierInformation = asyncHandler(async(req, res, next) => {
    console.log("Add Supplier Function")
    console.log(req.body)
    const { supplierName, mobile, address, email } = req.body;
    const userId = req.user.id;
    const supplier = await Supplier.create({
        supplierName,
        mobile,
        address,
        email,
        userId,
    });
    sendTokenResponse(supplier, 200, res);
});

//-------------------------        VIEW SUPPLIER INFORMATION      ------------------------------

exports.viewSupplierInformation = asyncHandler(async(req, res, next) => {
    console.log("View Supplier Function")
    console.log(req.user.id)
    const getSupplierInformation = await Supplier.find({ userId: req.user.id })
    console.log(getSupplierInformation)
    res.status(200).json({
        success: true,
        message: "Success",
        data: getSupplierInformation,
    });
});
// ----------------------------------------------------------------------------------
//-------------------------        DELETE SUPPLIER INFORMATION      -------------------

exports.deleteSupplierInformation = asyncHandler(async(req, res, next) => {
    const supplierId = req.params.supplierId;

    const ifSupplierExists = await Supplier.findOne({ _id: supplierId })

    if (!ifSupplierExists) {
        return res.json("Supplier ID doesn't exist");
    }
    const supplier = await Supplier.findByIdAndDelete(supplierId);

    return res.json(supplier);
});
// ----------------------------------------------------------------------------------

// +++++++++++++++++++++++++++++++++++++++++  TOTAL EARNING FROM INIVIDUAL CATEGORIES OF CURRENT MONTH    +++++++++++++++++++++++++++++++++++++++++++
exports.totalEarningInCategories = async(req, res) => {
    var day = new Date().getUTCDate()
    try {
        const currentMonthCategoryEarning = await Transaction.aggregate([
            { $match: { createdAt: { $lt: new Date(), $gt: new Date(new Date().getTime() - (24 * 60 * 60 * 1000 * day)) }, userId: req.user.id } },
            {
                $project: {
                    date: { $dayOfMonth: "$createdAt" },
                    grand_total: "$grandTotal",
                    category: "$category"
                },
            },
            {
                $group: {
                    _id: "$category",
                    "grand_total": {
                        "$sum": {
                            "$toDouble": "$grand_total"
                        }
                    },
                },

            },
            {
                $sort: {
                    _id: 1
                },
            },
        ])
        res.json(currentMonthCategoryEarning)
    } catch (error) {
        res.json(error)
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------

// +++++++++++++++++++++++++++++++++++++++++  TOTAL EARNING OF EACH DAY OF A MONTH    +++++++++++++++++++++++++++++++++++++++++++
exports.totalEarning = async(req, res) => {
    var day = new Date().getUTCDate()
    console.log(day)

    try {
        const currentMonthTransactions = await Transaction.aggregate([
            { $match: { createdAt: { $lt: new Date(), $gt: new Date(new Date().getTime() - (24 * 60 * 60 * 1000 * day)) }, userId: req.user.id } },
            {
                $project: {
                    date: { $dayOfMonth: "$createdAt" },
                    grand_total: "$grandTotal",

                },
            },
            {
                $group: {
                    _id: "$date",
                    "grand_total": {
                        "$sum": {
                            "$toDouble": "$grand_total"
                        }
                    },
                },

            },
            {
                $sort: {
                    _id: 1
                },
            },
        ])
        res.json(currentMonthTransactions)
    } catch (error) {
        res.json(error)
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------
//-----------------------Add Stocks Category ----------------------------------------
exports.addStockCategory = asyncHandler(async(req, res, next) => {
    console.log("Add Stocks Category Function")
    console.log(req.body)
    console.log(req.user.id)
    const { categoryName } = req.body;
    const userId = req.user.id;
    const stockCategory = await StockCategory.create({
        categoryName,
        userId,
    });
    return res.json({ stockCategory, status: "200" });
});
// ---------------------------------------------------------------------------------

//-------------------------        VIEW STOCK CATEGORY      ------------------------------

exports.viewStockCategory = asyncHandler(async(req, res, next) => {
    console.log("View Stock Category Function")
    const getStockCategory = await StockCategory.find({ userId: req.user.id })
    console.log(getStockCategory)
    res.status(200).json({
        success: true,
        message: "Success",
        data: getStockCategory,
    });
});
// ----------------------------------------------------------------------------------
// +++++++++++++++++++++++++++++++     UPLOADING STOCK CATEGORY THUMBNAIL PICTURE   ++++++++++++++++++++++
exports.uploadStockCategoryThumbnail = asyncHandler(async(req, res, next) => {
    console.log("Upload Stock Category Thumbnail")
    console.log(req.params.stockCatName)


    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.file;

    const userId = req.user.id;

    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        console.log("file thulo vayo hajur")
        return next(
            new ErrorResponse(
                `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
                400
            )
        );
    }

    filename = `${req.params.catName}_${req.user.id}.png`;
    console.log(filename);

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${filename}`, async(err) => {
        if (err) {
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        //insert the filename into database
        await StockCategory.findByIdAndUpdate(req.params.id, {

            picture: filename,

        });
        console.log("image upload vayo hajur")
    });

    res.status(200).json({
        success: true,
        data: file.name,
    });
});

//-------------------------        DELETE STOCK CATEGORY      ------------------------------

exports.deleteStockCategory = asyncHandler(async(req, res, next) => {
    const stockCategoryId = req.params.categoryId;


    const ifStockCategoryExists = await StockCategory.findOne({ _id: stockCategoryId })

    if (!ifStockCategoryExists) {
        return res.json("Category ID doesn't exist");
    }
    const stockCategory = await StockCategory.findByIdAndDelete(stockCategoryId);

    return res.json(stockCategory);
});
// ----------------------------------------------------------------------------------
//-------------------------        SEARCH CLIENT INFO      ------------------------------

exports.searchClientInfo = asyncHandler(async(req, res, next) => {
    // setTimeout(async () => {
    console.log("Search Client Function")
        // console.log(req.user.id)
    const getclients = await Client.find({ userId: req.user.id })
        // console.log(getTransaction)
    res.status(200).send(getclients)
        // }, 300);
});
// ----------------------------------------------------------------------------------

// +++++++++++++++++++++++++++++++++++++++++  TOTAL QUANTITY OF INIVIDUAL CATEGORIES OF CURRENT MONTH    +++++++++++++++++++++++++++++++++++++++++++
exports.totalQuantityOfCategories = async (req, res) => {
  var day = new Date().getUTCDate()

  try {
    const currentMonthCategoryQuantity = await Transaction.aggregate([
      { $match: { createdAt: { $lt: new Date(), $gt: new Date(new Date().getTime() - (24 * 60 * 60 * 1000 * day)) }, userId: req.user.id } },
      {
        $project: {
          date: { $dayOfMonth: "$createdAt" },
          quantity: "$quantity",
          category: "$category"
        },
      },
      {
        $group: {
          _id: "$category",
          "quantity": {
            "$sum": {
              "$toDouble": "$quantity"
            }
          },
        },

      },
      {
        $sort: {
          _id: 1
        },
      },
    ])
    res.json(currentMonthCategoryQuantity)
  } catch (error) {
    res.json(error)
  }
}
// ---------------------------------------------------------------------------------------------------------------------------------

// +++++++++++++++++++++++++++++++++++++++++  TOTAL QUANTITY OF INIVIDUAL STOCK CATEGORIES OF CURRENT MONTH    +++++++++++++++++++++++++++++++++++++++++++
exports.totalQuantityOfStockCategories = async(req, res) => {
  var day = new Date().getUTCDate()

  try {
      const currentMonthStockCategoryQuantity = await Stock.aggregate([
          { $match: { createdAt: { $lt: new Date(), $gt: new Date(new Date().getTime() - (24 * 60 * 60 * 1000 * day)) }, userId: req.user.id } },
          {
              $project: {
                  date: { $dayOfMonth: "$createdAt" },
                  quantity: "$quantity",
                  category: "$category"
              },
          },
          {
              $group: {
                  _id: "$category",
                  "quantity": {
                      "$sum": {
                          "$toDouble": "$quantity"
                      }
                  },
              },

          },
          {
              $sort: {
                  _id: 1
              },
          },
      ])
      res.json(currentMonthStockCategoryQuantity)
  } catch (error) {
      res.json(error)
  }
}
// ---------------------------------------------------------------------------------------------------------------------------------


//-------------------------        SEARCH TRANSACTIONS      ------------------------------

exports.searchTransaction = asyncHandler(async(req, res, next) => {
  // setTimeout(async () => {
  console.log("Search Transactions Function")
      // console.log(req.user.id)
  const getTransaction = await Transaction.find({ userId: req.user.id })
      // console.log(getTransaction)
  res.status(200).send(getTransaction)
      // }, 300);
});
// ----------------------------------------------------------------------------------


// +++++++++++++++++++++++++++++++++++++++++  GET SELECTED DATE TRANSACTIONS   +++++++++++++++++++++++++++++++++++++++++++
exports.getSelectedDateTransactions = async(req, res) => {

  const selectedDate = req.params.date;
  const yyyymmdd = selectedDate.split(" ")[0]
  const commaDate = yyyymmdd.split("-")

  
}
// ------------------------------------------------------------------------------------------------------------------


// Get token from model , create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {

    const token = user.getSignedJwtToken();

    const options = {
        //Cookie will expire in 30 days
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    // Cookie security is false .if you want https then use this code. do not use in development time
    if (process.env.NODE_ENV === "proc") {
        options.secure = true;
    }

    //we have created a cookie with a token
    res
        .status(statusCode)
        .cookie("token", token, options)
        .json({
            success: true,
            token,
        });





};