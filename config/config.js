module.exports = {
  jwt: {
    access: {
      secret: process.env.JWT_SECRET,
      expiresIn: "24h",
    },
    refresh: {
      secret: process.env.JWT_SECRET,
      expiresIn: "7d",
    },
  },
};
