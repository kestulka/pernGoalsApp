const pool = require("../db"); // node-postgres, butinas dirbant su postgres
// $1, $2, $3.. [user_id, category_id, etc.] - parameterized queries, naudojami nuo sql ataku
// !TODO dar galima prideti input validacija, del extra security, kol kas palieku ateiciai

const createGoal = async (req, res) => {
  try {
    const { user_id, goal_description, category_id } = req.body;
    const newGoal = await pool.query(
      "INSERT INTO goals (user_id, goal_description, category_id) VALUES($1, $2, $3) RETURNING *",
      [user_id, goal_description, category_id],
    );
    res.json(newGoal.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getGoalsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const userGoals = await pool.query(
      "SELECT * FROM goals where user_id = $1",
      [userId],
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
    // gera praktika checkinti giliau ar goal is tikro buvo updatintas ir keitesi eilutes db:
    const result = await pool.query(
      "UPDATE goals SET goal_description = $1 WHERE id = $2",
      [goal_description, id],
    );
    if (result.rowCount === 0) {
      return res
        .status(404)
        .send("Goal not found or no change in goal description.");
    }
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

const addGoalCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await pool.query(
      "INSERT INTO goal_categories (name) VALUES($1) RETURNING *",
      [name],
    );
    res.json(newCategory.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getGoalCategories = async (req, res) => {
  try {
    const allCategories = await pool.query("SELECT * FROM goal_categories");
    res.json(allCategories.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createGoal,
  getGoalsByUserId,
  updateGoal,
  deleteGoal,
  addGoalCategory,
  getGoalCategories,
};
