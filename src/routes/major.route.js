const express = require('express')
const {
  listMajors,
  getMajor,
  createMajor,
  updateMajor,
  deleteMajor,
  getMarjorCourses
} = require('../controllers/major.controller')
const { requireAuth } = require('../middlewares/auth.middleware')
const { UserType } = require('../_base/base.interface')

const router = express.Router()

router.get('/', requireAuth(), listMajors)
router.post('/', requireAuth(UserType.ADMIN), createMajor)
router.get('/:id', requireAuth(), getMajor)
router.put('/:id', requireAuth(UserType.ADMIN), updateMajor)
router.delete('/:id', requireAuth(UserType.ADMIN), deleteMajor)
router.get('/:id/courses', requireAuth(), getMarjorCourses)

module.exports = router