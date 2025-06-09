const { body } = require("express-validator");
exports.loginValidator = [
  body("username").isString().withMessage("Invalid username"),
  body("password").isString().withMessage("Invalid password"),
];
