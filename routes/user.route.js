const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const userValidator = require("../validators/user.validator");
const validateRequest = require("../middleware/validation.middleware");
const withValidation = (validator, handler) => [
  ...validator,
  validateRequest,
  handler,
];

router.post(
  "/user",
  ...withValidation(
    userValidator.createUserValidator,
    userController.createUser
  )
);
router.get("/user", userController.getAllUsers);
router.get(
  "/user/:id",
  ...withValidation(userValidator.idParamValidator, userController.getUserById)
);
router.put(
  "/user/:id",
  ...withValidation(
    [...userValidator.idParamValidator, ...userValidator.updateUserValidator],
    userController.updateUser
  )
);
router.delete(
  "/user/:id",
  ...withValidation(userValidator.idParamValidator, userController.deleteUser)
);
module.exports = router;
