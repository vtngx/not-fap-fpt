const express = require('express')

const {
  loginStudent,
  loginAdmin
} = require('../controllers/auth.controller')

const router = express.Router()

router.route('/login-stu').post(loginStudent)
router.route('/login-ad').post(loginAdmin)

module.exports = router