// validators/student.validator.js
const { body, param, query } = require("express-validator");

exports.createStudent = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),

  body("lastName").trim().notEmpty().withMessage("Last name is required"),

  body("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female, or other"),

  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),

  body("phone").optional().isMobilePhone().withMessage("Invalid phone number"),

  body("dateOfBirth")
    .exists()
    .withMessage("Date of birth is required")
    .isString()
    .withMessage("Date of birth must be a string")
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$/
    )
    .withMessage(
      "Date of birth must be in format DD-MMM-YYYY, e.g. 01-Jan-2000"
    ),
];

exports.updateStudent = [
  param("id").isUUID().withMessage("Student ID must be a valid UUID"),

  body("firstName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty"),

  body("lastName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Last name cannot be empty"),

  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female, or other"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("phone").optional().isMobilePhone().withMessage("Invalid phone number"),

  body("dateOfBirth")
    .exists()
    .withMessage("Date of birth is required")
    .isString()
    .withMessage("Date of birth must be a string")
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$/
    )
    .withMessage(
      "Date of birth must be in format DD-MMM-YYYY, e.g. 01-Jan-2000"
    ),
];

exports.getStudentById = [
  param("id").isInt().withMessage("Student ID must be a valid integer"),
];

exports.deleteStudent = [
  param("id").isInt().withMessage("Student ID must be a valid integer"),
];

exports.getStudents = [
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("search").optional().isString().withMessage("Search must be a string"),
];
