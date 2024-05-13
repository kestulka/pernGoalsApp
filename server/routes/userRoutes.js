const express = require("express");
const router = express.Router();
const { verifyToken, checkAdminRole } = require("../middleware/authMiddleware");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// get all users
router.get("/", verifyToken, checkAdminRole, getUsers);

// create a new user
router.post("/", createUser);

// update a user
router.put("/:id", verifyToken, checkAdminRole, updateUser);

// delete a user
router.delete("/:id", verifyToken, checkAdminRole, deleteUser);

module.exports = router;
