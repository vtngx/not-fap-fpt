const express = require('express')
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/student.controller')
const { requireAuth } = require('../middlewares/auth.middleware')
const { UserType } = require('../_base/base.interface')

const router = express.Router()

router.use(requireAuth(UserType.ADMIN))

router.route('/')
  .get(getStudents)
  .post(createStudent)

router.route('/:id')
  .get(getStudent)
  .put(updateStudent)
  .delete(deleteStudent)

module.exports = router