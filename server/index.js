const express = require("express");
const app = express();
const cors = require("cors");
const goalRoutes = require("./routes/goalRoutes");
const userRoutes = require("./routes/userRoutes");

//! MIDDLEWARE

app.use(cors());
app.use(express.json());

//! ROUTES

app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
