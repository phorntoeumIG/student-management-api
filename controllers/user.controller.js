const db = require("../models");
const Users = db.Users;
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const {
  ConflictError,
  ResourceNotFound,
} = require("../exceptions/exception-handler");
exports.createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Users.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      next(new ConflictError("Email already exists."));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      email,
      password: hashedPassword,
    });
    const userData = user.get({ plain: true });
    delete userData.password;
    delete userData.refreshToken;

    return res.success(userData);
  } catch (error) {
    console.error("Failed to create user:", error);
    return res.error(500);
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await Users.findAll({
    attributes: { exclude: ["password", "refreshToken", "accessToken"] },
  });
  return res.success(users);
};

exports.getUserById = async (req, res, next) => {
  const user = await Users.findByPk(req.params.id, {
    attributes: { exclude: ["password", "refreshToken", "accessToken"] },
  });
  if (!user) {
    next(new ResourceNotFound("user", req.params.id));
  }
  return res.success(user);
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [updated] = await Users.update(updates, {
      where: { id: id },
      returning: true,
      plain: true,
    });

    if (!updated) {
      next(new ResourceNotFound("user", req.params.id));
    }

    return res.success(updated);
  } catch (error) {
    console.error("Update user error:", error);
    return res.error(500);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Users.destroy({ where: { id } });

    if (!deleted) {
      next(new ResourceNotFound("user", req.params.id));
    }
    res.status(204).send();
  } catch (error) {
    console.error("Delete user error:", error);
    return res.error(500);
  }
};
