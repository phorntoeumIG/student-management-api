const userService = require("../services/user.service");

exports.createUser = async (req, res, next) => {
  try {
    const userData = await userService.createUser(req.body);
    delete userData.password;
    delete userData.refreshToken;
    return res.success(userData);
  } catch (error) {
    console.error("Failed to create user:", error);
    return next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return res.success(users);
  } catch (error) {
    return next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.success(user);
  } catch (error) {
    return next(error);
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    return res.success(updated);
  } catch (error) {
    console.error("Update user error:", error);
    return next(error);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Delete user error:", error);
    return next(error);
  }
};
