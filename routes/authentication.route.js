const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authentication.controller");
const loginValidator = require("../validators/login.validator");
const validateRequest = require("../middleware/validation.middleware");
const auth = require("../middleware/auth.middleware");
const withValidation = (validator, handler) => [
  ...validator,
  validateRequest,
  handler,
];
// Public routes
router.post(
  "/auth/login",
  ...withValidation(
    loginValidator.loginValidator,
    authenticationController.login
  )
).route.requiredRole = "user";
router.post(
  "/auth/logout",
  auth,
  authenticationController.logout
).route.requiredRole = "user";

module.exports = router;
