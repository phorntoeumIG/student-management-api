const db = require("../models");
const Users = db.Users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const {
  ConflictError,
  ResourceNotFound,
  UnauthorizedError,
} = require("../exceptions/exception-handler");

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
      config.jwt.access.secret,
      { expiresIn: config.jwt.access.expiresIn }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      config.jwt.refresh.secret,
      { expiresIn: config.jwt.refresh.expiresIn }
    );

    await user.update({
      refreshToken,
      accessToken,
    });

    return res.success({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.error(500);
  }
};

exports.logout = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await Users.findByPk(id);
    if (!user) {
      throw new ResourceNotFound("user", id);
    }

    // Check if user has required role
    const requiredRole = req.route.requiredRole || "user";
    if (user.role !== requiredRole && user.role !== "admin") {
      throw new UnauthorizedError(
        `User does not have required role: ${requiredRole}`
      );
    }

    await user.update({
      refreshToken: null,
      accessToken: null,
    });

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    req.user = null;

    return res.success({
      message: "Successfully logged out",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.error(500);
  }
};
