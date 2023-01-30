const mongoose = require("mongoose");

const goalSchema = mongoose.Schema( 
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "userModel",
    },
    text: {
      type: String,
      required: [true, "please enter text"],
    },
  },
  { timestamps: true }
);

const goalModel = mongoose.model("goalSchema", goalSchema);

module.exports = goalModel;
