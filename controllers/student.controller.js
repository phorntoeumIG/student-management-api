const studentService = require("../services/student.service");

exports.getStudents = async (req, res, next) => {
  try {
    const students = await studentService.getStudents();
    res.success(students);
  } catch (error) {
    return next(error);
  }
};

// POST create student
exports.createStudent = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.success(student);
  } catch (error) {
    console.error("Failed to create student:", error);
    return next(error);
  }
};

// GET student by ID
exports.getStudentById = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    res.success(student);
  } catch (error) {
    return next(error);
  }
};

// PUT update student
exports.updateStudent = async (req, res, next) => {
  try {
    const updatedStudent = await studentService.updateStudent(
      req.params.id,
      req.body
    );
    res.success(updatedStudent);
  } catch (error) {
    console.error("Failed to update student:", error);
    return next(error);
  }
};

// DELETE student
exports.deleteStudent = async (req, res, next) => {
  try {
    await studentService.deleteStudent(req.params.id);
    res.success();
  } catch (error) {
    console.error("Failed to delete student:", error);
    return next(error);
  }
};
