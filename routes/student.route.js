// routes/student.js
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const studentValidator = require("../validators/student.validator");
const validateRequest = require("../middleware/validation.middleware");

// Utility function
const withValidation = (validator, handler) => [
  ...validator,
  validateRequest,
  handler,
];

// CRUD Routes
router.get(
  "/student",
  ...withValidation(studentValidator.getStudents, studentController.getStudents)
);

router.post(
  "/student",
  ...withValidation(
    studentValidator.createStudent,
    studentController.createStudent
  )
);

router.get(
  "/student/:id",
  ...withValidation(
    studentValidator.getStudentById,
    studentController.getStudentById
  )
);

router.put(
  "/student/:id",
  ...withValidation(
    studentValidator.updateStudent,
    studentController.updateStudent
  )
);

router.delete(
  "/student/:id",
  ...withValidation(
    studentValidator.deleteStudent,
    studentController.deleteStudent
  )
);

module.exports = router;
