const express = require('express')
const {
  getMe,
  createAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require('../controllers/admin.controller')
const { requireAuth } = require('../middlewares/auth.middleware')
const { UserType } = require('../_base/base.interface')

const router = express.Router()

router.use(requireAuth(UserType.ADMIN))

router.route('/')
  .get(getAdmins)
  .post(createAdmin)

router.route('/me')
  .get(getMe)

router.route('/:id')
  .get(getAdmin)
  .put(updateAdmin)
  .delete(deleteAdmin)

module.exports = router