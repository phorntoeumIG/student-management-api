const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
// Crud Route API
router.get('/student', studentController.getStudents);
router.post('/student', studentController.createStudent);
router.get('/student/:id', studentController.getStudentById);
router.put('/student/:id', studentController.updateStudent);
router.delete('/student/:id', studentController.deleteStudent);

module.exports = router;
