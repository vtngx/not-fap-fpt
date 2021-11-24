const express = require('express')
const {
  listCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses.controller')
const { requireAuth } = require('../middlewares/auth.middleware')
const { UserType } = require('../_base/base.interface')

const router = express.Router()

router.get('/', requireAuth(), listCourses)
router.post('/', requireAuth(UserType.ADMIN), createCourse)
router.get('/:id', getCourse)
router.put('/:id', requireAuth(UserType.ADMIN), updateCourse)
router.delete('/:id', requireAuth(UserType.ADMIN), deleteCourse)

module.exports = router