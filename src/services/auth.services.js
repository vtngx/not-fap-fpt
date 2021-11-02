const Admin = require('../models/Admin')
const Student = require('../models/Student')
const UserError = require("../utils/userError")

const loginStudent = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const student = await Student
      .findOne({ email, deletedAt: null })
      .select('+password')

    if (!student)
      return new UserError(400, "Invalid Credentials")

    return !!await student.matchPassword(password)
      ? student
      : new UserError(400, "Invalid Credentials")
  } catch (err) {
    return new UserError
  }
}

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const admin = await Admin
      .findOne({ email, deletedAt: null })
      .select('+password')

    if (!admin)
      return new UserError(400, "Invalid Credentials")

    return !!await admin.matchPassword(password)
      ? admin
      : new UserError(400, "Invalid Credentials")
  } catch (err) {
    return new UserError
  }
}

module.exports = {
  loginStudent,
  loginAdmin
}