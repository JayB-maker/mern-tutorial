const asyncHandler = require("express-async-handler");
const goalModel = require("../models/goalModel");
const userModel = require("../models/userModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await goalModel.find({ user: req.user.id });
  res.status(200).json(goals);
});

const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Enter Text");
  }
  const goal = await goalModel.create({
    user: req.user.id,
    text: req.body.text,
  });
  res.status(200).json(goal);
});

const updateGoals = asyncHandler(async (req, res) => {
  const goal = await goalModel.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await userModel.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if ((goal.user || 5).toString() !== user.id) {
    res.status(401);
    throw new Error("Unauthorised User");
  }

  const updateGoal = await goalModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateGoal);
});

const deleteGoals = asyncHandler(async (req, res) => {
  const goal = goalModel.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await userModel.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if ((goal.user || 5).toString() !== user.id) {
    res.status(401);
    throw new Error("Unauthorised User");
  }
  
  await goal.remove();
  res.status(200).json(`${req.params.id}`);
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
