const { body, param } = require("express-validator");

exports.createUserValidator = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.updateUserValidator = [
  body("email").optional().isEmail().withMessage("Email must be valid"),
];

exports.idParamValidator = [
  param("id").isInt().withMessage("ID must be a number"),
];
