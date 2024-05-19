const express = require("express");
const router = express.Router();
const { verifyToken, checkAdminRole } = require("../middleware/authMiddleware");
const {
  createGoal,
  getGoalsByUserId,
  updateGoal,
  deleteGoal,
  addGoalCategory,
  getGoalCategories,
} = require("../controllers/goalController");

router.post("/", verifyToken, createGoal);
router.get("/:userId", verifyToken, getGoalsByUserId);
router.put("/:id", verifyToken, updateGoal);
router.delete("/:id", verifyToken, deleteGoal);

router.get("/categories", verifyToken, checkAdminRole, getGoalCategories);
router.post("/categories", verifyToken, checkAdminRole, addGoalCategory);

// TODO: pries testuojant su postmanu nepamirsti paleisti postgres

module.exports = router;
