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