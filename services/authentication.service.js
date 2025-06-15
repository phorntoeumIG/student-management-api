const db = require("../models");
const Users = db.Users;
const bcrypt = require("bcryptjs");
const { UnauthorizedError } = require("../exceptions/exception-handler");
const { generateTokens } = require("../security/utils/jwt.utils");

const authenticationService = {
  login: async (credentials) => {
    const { username, password } = credentials;
    const user = await Users.findOne({
      where: { email: username },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    // Temporarily include password for comparison
    const userWithPassword = await Users.findOne({
      where: { email: username },
    });

    const isPasswordValid = await bcrypt.compare(
      password,
      userWithPassword.password
    );
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const { accessToken, refreshToken } = generateTokens(user.id);

    await user.update({
      isLogout: false,
    });

    return {
      accessToken,
      refreshToken,
    };
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
