const authenticationService = require("../services/authentication.service");
const { UnauthorizedError } = require("../exceptions/exception-handler");

exports.login = async (req, res, next) => {
  try {
    const authResult = await authenticationService.login(req.body);
    return res.json(authResult);
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof UnauthorizedError) {
      return res.status(401).json({ error: error.message });
    }
    return next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const logoutResult = await authenticationService.logout(req.user.id);

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    req.user = null;

    return res.json(logoutResult);
  } catch (error) {
    console.error("Logout error:", error);
    return next(error);
  }
};
