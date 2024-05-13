const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.header("Authorization");
  if (!bearerHeader) return res.status(401).send("Access Denied");

  const token = bearerHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, "druskytepipiriukai");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

const checkAdminRole = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Access Denied. Admin role required.");
  }
  next();
};

module.exports = { verifyToken, checkAdminRole };
