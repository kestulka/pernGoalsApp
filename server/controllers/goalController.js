const pool = require("../db");

const createGoal = async (req, res) => {
  try {
    const { user_id, goal_description } = req.body;
    const newGoal = await pool.query(
      "INSERT INTO goals (user_id, goal_description) VALUES($1, $2) RETURNING *",
      [user_id, goal_description],
    );
    res.json(newGoal.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getGoalsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const userGoals = await pool.query(
      "SELECT * FROM goals where user_id = $1",
      [user_id],
    );
    res.json(userGoals.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { goal_description } = req.body;
    await pool.query("UPDATE goals SET goal_description = $1 WHERE id = $2", [
      goal_description,
      id,
    ]);
    res.json("Goal was updated");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM goals WHERE id = $1", [id]);
    res.json("Goal was deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { createGoal, getGoalsByUserId, updateGoal, deleteGoal };
