const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login.controller");
const loginValidator = require("../validators/login.validator");
const validateRequest = require("../middleware/validation.middleware");
const withValidation = (validator, handler) => [
  ...validator,
  validateRequest,
  handler,
];
router.post(
  "/login",
  ...withValidation(loginValidator.loginValidator, loginController.login)
);
module.exports = router;
