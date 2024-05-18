const pool = require("../db");
const bcrypt = require("bcrypt");

//! cd to server/scripts and run node createAdminUser.js

const createAdminUser = async () => {
  try {
    const username = "admin";
    const password = "admin";
    const role = "admin";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *",
      [username, hashedPassword, role],
    );
    console.log("Admin user created:", newUser.rows[0]);
  } catch (error) {
    console.error("Error creating admin user:", error.message);
  }
};
createAdminUser();
