const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");

const protected = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from the header authorization
      token = req.headers.authorization.split(" ")[1];

      //Decode the token to get the id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get user from token
      req.user = await userModel.findById(decoded.id).select("-password");

      next();

    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Unauthorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized, no token");
  }
});

module.exports = { protected };
