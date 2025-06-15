const jwt = require("jsonwebtoken");
const config = require("../config/security.config");

const generateTokens = (userId) => {
  const payload = { userId };
  const accessToken = jwt.sign(payload, config.jwt.access.secret, {
    expiresIn: config.jwt.access.expiresIn,
  });

  const refreshToken = jwt.sign(payload, config.jwt.refresh.secret, {
    expiresIn: config.jwt.refresh.expiresIn,
  });

  return { accessToken, refreshToken };
};

const verifyToken = (token, secretType = "access") => {
  return jwt.verify(token, config.jwt[secretType].secret);
};

module.exports = {
  generateTokens,
  verifyToken,
};
