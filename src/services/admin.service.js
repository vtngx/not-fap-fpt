const Admin = require('../models/Admin')
const { omit, orderBy } = require('lodash')
const UserError = require('../utils/userError')

const createAdmin = async (body, reqUser) => {
  try {
    const existsEmail = await Admin.findOne({
      email: body.email,
      deletedAt: null
    })
    
    const existsCode = await Admin.findOne({
      code: body.code,
      deletedAt: null,
    })

    if (existsEmail || existsCode)
      return new UserError(401, "Admin Already Exists")

    const admin = await Admin.create({
      ...omit(body, ['password']),
      password: 'abcd1234',
      createdBy: reqUser._id
    })

    return admin || new UserError
  } catch (e) {
    return new UserError
  }
}

const getAdmins = async (query) => {
  try {
    let { page, limit, sort = "asc" } = query

    page = parseInt(page) || 1
    limit = parseInt(limit) || 20
    const skip = (page - 1) * limit

    const admins = await Admin
      .find({ deletedAt: null })
      .skip(skip)
      .limit(limit)

    return orderBy(admins, ['email'], [sort])
  } catch (e) {
    return new UserError
  }
}

const getAdmin = async (_id) => {
  try {
    const admin = await Admin.findOne({
      _id,
      deletedAt: null
    })

    return admin
      ? admin
      : new UserError(404, "Admin Not Found")
  } catch (e) {
    return new UserError(404, "Admin Not Found")
  }
}

const updateAdmin = async (_id, body, reqUser) => {
  try {
    const admin = await Admin.findOne({
      _id,
      deletedAt: null
    })

    if (!admin)
      return new UserError(404, 'Admin Not Found')
    
    const exists = await Admin.findOne({
      _id: { $ne: admin._id },
      code: body.code,
      deletedAt: null,
    })

    if (exists)
      return new UserError(401, "Admin Already Exists")

    if (body.email !== admin.email) {
      const exists = await Admin.findOne({
        email: body.email,
        deletedAt: null
      })

      if (exists) return new UserError(401, "Admin Already Exists")
    }

    admin.set({
      ...omit(body, ['password']),
      updatedAt: Date.now(),
      updatedBy: reqUser._id
    })

    await admin.save()

    return admin || new UserError
  } catch (e) {
    return new UserError
  }
}

const deleteAdmin = async (_id, reqUser) => {
  try {
    const admin = await Admin.findOne({
      _id,
      deletedAt: null
    })

    if (!admin)
      return new UserError(404, 'Admin Not Found')

    admin.set({
      deletedAt: Date.now(),
      updatedAt: Date.now(),
      deletedBy: reqUser._id,
      updatedBy: reqUser._id
    })

    await admin.save()

    return true
  } catch (e) {
    return new UserError
  }
}

module.exports = {
  createAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin
}