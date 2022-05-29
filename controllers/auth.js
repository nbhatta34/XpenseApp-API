const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../model/user");
const crypto = require("crypto");


//--------------------------     REGISTER USER        -----------------------------

exports.register = asyncHandler(async (req, res, next) => {
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

exports.login = asyncHandler(async (req, res, next) => {
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
  }
  else {
    sendTokenResponse(user, 200, res);
  }
});


// ------------------------------------------------------------------------------------------------------

// ---------------------------        ADD TRANSACTION        ------------------------------

exports.addTransaction = asyncHandler(async (req, res, next) => {
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

exports.viewTransaction = asyncHandler(async (req, res, next) => {
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

exports.deleteTransaction = asyncHandler(async (req, res, next) => {
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


exports.updateTransaction = asyncHandler(async (req, res, next) => {
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

// ----------------------------------------------------------------------------------------

//------------------------------Add Stock -----------------------------------------
exports.addStock = asyncHandler(async (req, res, next) => {
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

exports.viewStock = asyncHandler(async (req, res, next) => {
  setTimeout(async () => {
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


exports.updateStock = asyncHandler(async (req, res, next) => {
  
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