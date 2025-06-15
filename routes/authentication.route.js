const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authentication.controller");
const loginValidator = require("../validators/login.validator");
const validateRequest = require("../middleware/validation.middleware");
const auth = require("../security/middleware/auth.middleware");
const {
  login: loginLimiter,
} = require("../security/middleware/rate-limit.middleware");

const withValidation = (validator, handler) => [
  ...validator,
  validateRequest,
  handler,
];

router.post(
  "/auth/login",
  loginLimiter,
  ...withValidation(
    loginValidator.loginValidator,
    authenticationController.login
  )
);
router.post("/auth/logout", auth, authenticationController.logout);

module.exports = router;
