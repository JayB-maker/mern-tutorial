const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "please enter text"],
    },
  },
  { timestamps: true }
);

const goalModel = mongoose.model("goalSchema", goalSchema);

module.exports = goalModel;
