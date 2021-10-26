const authService = require('../services/auth.services')
const { sendTokenResponse } = require('../utils/response')

const loginStudent = async (req, res, next) => {
  const data = await authService.loginStudent(req, res, next)

  if (data instanceof Error)
    return next(data)

  return sendTokenResponse(data, 200, res)
}

const loginAdmin = async (req, res, next) => {
  const data = await authService.loginAdmin(req, res, next)

  if (data instanceof Error)
    return next(data)

  return sendTokenResponse(data, 200, res)
}

module.exports = {
  loginStudent,
  loginAdmin
}