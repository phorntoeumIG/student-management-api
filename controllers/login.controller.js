const db = require("../models");
const Users = db.Users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({
      where: {
        email: username,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn }
    );

    return res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
