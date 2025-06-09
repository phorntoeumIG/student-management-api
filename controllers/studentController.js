const db = require('../models');
const Students = db.Students;
const {ResourceNotFound} = require('../exceptions/exception-handler')

// GET all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Students.findAll();
    res.success(students);
  } catch (error) {
    res.error(500);
  }
};

// POST create student
exports.createStudent = async (req, res) => {
  const { firstName, lastName, gender, email, phone, dateOfBirth } = req.body;

  if (!firstName || !lastName || !gender || !email || !phone || !dateOfBirth) {
    return res.error(400);
  }

  try {
    const dob = new Date(dateOfBirth);
    const student = await Students.create({
      firstName,
      lastName,
      gender,
      email,
      phone,
      dateOfBirth: dob,
    });

    res.success(student);
  } catch (err) {
    console.error('Failed to insert data:', err);
    res.error(500);
  }
};

// GET student by ID
exports.getStudentById = async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const student = await Students.findOne({ where: { id: studentId } });
    if (!student) {
      return next(new ResourceNotFound('student', req.params.id));
    }
    res.success(student);
  } catch(exception) {
    next(exception);
  }
};

// PUT update student
exports.updateStudent = async (req, res) => {
  const { firstName, lastName, gender, email, phone, dateOfBirth } = req.body;
  const { id } = req.params;

  if (!firstName || !lastName || !gender || !email || !phone || !dateOfBirth) {
    return res.error(400);
  }

  try {
    const student = await Students.findByPk(id);

    if (!student) {
      return res.error(404);
    }

    const dob = new Date(dateOfBirth);
    const updatedStudent = await student.update({
      firstName,
      lastName,
      gender,
      email,
      phone,
      dateOfBirth: dob,
    });

    res.success(updatedStudent);
  } catch (error) {
    console.error('Failed to update student:', error);
    res.error(500);
  }
};

// DELETE student
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Students.findByPk(id);

    if (!student) {
      return res.error(404);
    }

    await student.destroy();
    res.status(204).send();
  } catch (err) {
    console.log(err)
    console.error('Failed to delete student:', err);
    res.error(500);
  }
};
