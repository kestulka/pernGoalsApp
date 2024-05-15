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

router.post("/categories", verifyToken, checkAdminRole, addGoalCategory);
router.get("/categories", verifyToken, getGoalCategories); // not working properly

// TODO: pries testuojant su postmanu nepamirsti paleisti postgres

module.exports = router;
