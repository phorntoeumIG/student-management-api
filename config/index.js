require("dotenv").config();

module.exports = {
  jwt: {
    access: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "24h",
    },
    refresh: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    },
  },
};
