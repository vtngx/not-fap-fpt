const express = require('express')
const {
  getDepartment,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
} = require('../controllers/department.controller')
const { requireAuth } = require('../middlewares/auth.middleware')
const { UserType } = require('../_base/base.interface')

const router = express.Router()

router.get('/', requireAuth(), getDepartments)
router.post('/', requireAuth(UserType.ADMIN), createDepartment)
router.get('/:id', requireAuth(), getDepartment)
router.put('/:id', requireAuth(UserType.ADMIN), updateDepartment)
router.delete('/:id', requireAuth(UserType.ADMIN), deleteDepartment)

module.exports = router