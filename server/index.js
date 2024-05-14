const express = require("express");
const app = express();
const cors = require("cors");
const goalRoutes = require("./routes/goalRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

//! MIDDLEWARE

app.use(cors());
app.use(express.json());

//! ROUTES

app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
