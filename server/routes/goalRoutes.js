const express = require("express");
const router = express.Router();
const {
  createGoal,
  getGoalsByUserId,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

router.post("/", createGoal);
router.get("/:user_id", getGoalsByUserId);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

// TODO: pries testuojant su postmanu nepamirsti paleisti postgres

module.exports = router;
