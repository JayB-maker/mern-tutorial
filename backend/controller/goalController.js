const asyncHandler = require("express-async-handler");
const goalModel = require("../models/goalModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await goalModel.find();
  res.status(200).json(goals);
});

const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Enter Text");
  }
  const goal = await goalModel.create({
    text: req.body.text,
  });
  res.status(200).json(goal);
});

const updateGoals = asyncHandler(async (req, res) => {
  const goal = goalModel.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updateGoal = await goalModel.findByIdAndUpdate(
    req.params.id,
    req.body, {
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
  await goal.remove();
  res.status(200).json(`${req.params.id}`);
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
