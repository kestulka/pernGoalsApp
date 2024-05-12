const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// MIDDLEWARE

app.use(cors());
app.use(express.json());

// ROUTES

// create a goal

app.post("/goals", async (req, res) => {
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
});

// get all goals of an user

app.get("/goals/:user_id", async (req, res) => {
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
});

// update a goal

app.put("/goals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { goal_description } = req.body;
    const updateGoal = await pool.query(
      "UPDATE goals SET goal_description = $1 WHERE id = $2",
      [goal_description, id],
    );
    res.json("Goal was updated");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// delete a goal

app.delete("/goals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteGoal = await pool.query("DELETE FROM goals WHERE id = $1", [
      id,
    ]);
    res.json("Goal was deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// TODO: pratestuoti cruda su postmanu

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
