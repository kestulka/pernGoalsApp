const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  createGoal,
  getGoalsByUserId,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

router.post("/", verifyToken, createGoal);
router.get("/:user_id", verifyToken, getGoalsByUserId);
router.put("/:id", verifyToken, updateGoal);
router.delete("/:id", verifyToken, deleteGoal);

// TODO: pries testuojant su postmanu nepamirsti paleisti postgres

module.exports = router;
