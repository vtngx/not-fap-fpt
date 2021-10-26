const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const Student = require('../models/Student')
const UserError = require('../utils/userError')
const { UserType } = require('../_base/base.interface')

const requireAuth = (type) => {
  return async (req, res, next) => {
    let token
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
      token = req.headers.authorization.split(' ')[1]
    else if (req.cookies.token)
      token = req.cookies.token
  
    if (!token)
      return next(new UserError(401, 'Not Authorized'))
  
    try {
      //Verify token
      const decode = jwt.verify(token, process.env.JWT_SECRET)
  
      //Get current logged in user by decoded ID
      const [student, admin] = await Promise.all([
        Student.findOne({ _id: decode.id }),
        Admin.findOne({ _id: decode.id })
      ])
  
      if (!student && !admin)
        return next(new UserError(401, 'Not Authorized'))

      if (type) {
        if (!student && type == UserType.STUDENT)
          return next(new UserError(401, 'Not Authorized'))
  
        if (!admin && type == UserType.ADMIN)
          return next(new UserError(401, 'Not Authorized'))
      }

      if (student) req.user = student
      if (admin) req.user = admin
      return next()
    } catch (e) {
      return next(new UserError(401, 'Not Authorized'))
    }
  }
}

module.exports = {
  requireAuth
}