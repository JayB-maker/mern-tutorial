const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter Name"],
    },
    email: {
      type: String,
      required: [true, "Enter Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Enter Password"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("userSchema", userSchema);

module.exports = userModel;
