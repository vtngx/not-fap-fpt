const express = require('express')
const {
  getMe,
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getMyRequests
} = require('../controllers/student.controller')
const { requireAuth } = require('../middlewares/auth.middleware')
const { UserType } = require('../_base/base.interface')

const router = express.Router()

router.get('/', requireAuth(UserType.ADMIN), getStudents)
router.post('/', requireAuth(UserType.ADMIN), createStudent)
router.get('/me', requireAuth(UserType.STUDENT), getMe)
router.get('/me/requests', requireAuth(UserType.STUDENT), getMyRequests)
router.get('/:id', requireAuth(UserType.ADMIN), getStudent)
router.put('/:id', requireAuth(UserType.ADMIN), updateStudent)
router.delete('/:id', requireAuth(UserType.ADMIN), deleteStudent)

module.exports = router