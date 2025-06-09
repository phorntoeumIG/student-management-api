const jwt = require("jsonwebtoken");
const db = require("../models");
const Users = db.Users;
const config = require("../config");

const skipAuthRoutes = ["/auth/login"];
const auth = async (req, res, next) => {
  if (skipAuthRoutes.includes(req.path)) {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, config.jwt.access.secret);
    const user = await Users.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = auth;
