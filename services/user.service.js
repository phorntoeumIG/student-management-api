const db = require("../models");
const Users = db.Users;
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const {
  ConflictError,
  ResourceNotFound,
} = require("../exceptions/exception-handler");

const userService = {
  // Create a new user
  async createUser(userData) {
    try {
      const { email, password } = userData;
      const existingUser = await Users.findOne({
        where: {
          email,
        },
      });

      if (existingUser) {
        throw new ConflictError("Email already exists.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await Users.create({
        email,
        password: hashedPassword,
      });
      return user.get({ plain: true });
    } catch (error) {
      throw error;
    }
  },

  // Get all users
  async getAllUsers() {
    try {
      return await Users.findAll({
        attributes: { exclude: ["password", "refreshToken", "accessToken"] },
      });
    } catch (error) {
      throw error;
    }
  },

  // Get user by ID
  async getUserById(id) {
    try {
      const user = await Users.findByPk(id, {
        attributes: { exclude: ["password", "refreshToken", "accessToken"] },
      });
      if (!user) {
        throw new ResourceNotFound("user", id);
      }
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Update user
  async updateUser(id, updates) {
    try {
      const [updated] = await Users.update(updates, {
        where: { id },
        returning: true,
        plain: true,
      });

      if (!updated) {
        throw new ResourceNotFound("user", id);
      }
      return updated;
    } catch (error) {
      throw error;
    }
  },

  // Delete user
  async deleteUser(id) {
    try {
      const deleted = await Users.destroy({ where: { id } });
      if (!deleted) {
        throw new ResourceNotFound("user", id);
      }
      return null;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = userService;
