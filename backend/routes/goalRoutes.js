const express = require("express");
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require("../controller/goalController.js");
const {protected} = require('../middleware/authMiddleware')

const router = express.Router();

router.route("/").get( protected, getGoals).post(protected, setGoals);

router.route("/:id").put(protected, updateGoals).delete(protected, deleteGoals);

module.exports = router;
