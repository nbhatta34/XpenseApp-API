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