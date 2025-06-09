const db = require("../models");
const Users = db.Users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const {
  ResourceNotFound,
  UnauthorizedError,
} = require("../exceptions/exception-handler");

const authenticationService = {
  async login(credentials) {
    try {
      const { username, password } = credentials;
      const user = await Users.findOne({
        where: {
          email: username,
        },
      });

      if (!user) {
        throw new UnauthorizedError("Invalid email or password");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new UnauthorizedError("Invalid email or password");
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
        isLogout: false,
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  async logout(userId) {
    try {
      const user = await Users.findByPk(userId);
      if (!user) {
        throw new ResourceNotFound("user", userId);
      }

      await user.update({
        isLogout: true,
      });

      return {
        message: "Successfully logged out",
      };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = authenticationService;
