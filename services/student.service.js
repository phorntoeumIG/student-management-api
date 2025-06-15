const db = require("../models");
const Students = db.Students;
const { ResourceNotFound } = require("../exceptions/exception-handler");

const studentService = {
  async getStudents() {
    try {
      return await Students.findAll();
    } catch (error) {
      throw error;
    }
  },

  async createStudent(studentData) {
    try {
      const dob = new Date(studentData.dateOfBirth);
      return await Students.create({
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        gender: studentData.gender,
        email: studentData.email,
        phone: studentData.phone,
        dateOfBirth: dob,
      });
    } catch (error) {
      throw error;
    }
  },

  async getStudentById(id) {
    try {
      const student = await Students.findOne({ where: { id } });
      if (!student) {
        throw new ResourceNotFound("student", id);
      }
      return student;
    } catch (error) {
      throw error;
    }
  },

  async updateStudent(id, studentData) {
    try {
      const student = await Students.findByPk(id);
      if (!student) {
        throw new ResourceNotFound("student", id);
      }

      const dob = new Date(studentData.dateOfBirth);
      return await student.update({
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        gender: studentData.gender,
        email: studentData.email,
        phone: studentData.phone,
        dateOfBirth: dob,
      });
    } catch (error) {
      throw error;
    }
  },

  async deleteStudent(id) {
    try {
      const student = await Students.findByPk(id);
      if (!student) {
        throw new ResourceNotFound("student", id);
      }
      await student.destroy();
      return null;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = studentService;
