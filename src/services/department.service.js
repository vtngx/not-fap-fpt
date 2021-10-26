const { orderBy } = require('lodash')
const UserError = require('../utils/userError')
const Department = require('../models/Department')
const { BaseStatus } = require('../_base/base.interface')

const createDepartment = async (body, reqUser) => {
  try {
    const exists = await Department.findOne({
      code: body.code,
      deletedAt: null,
    })

    if (exists) return new UserError(401, "Department Already Exists")

    const department = await Department.create({
      ...body,
      createdBy: reqUser._id
    })

    return department || new UserError
  } catch (e) {
    return new UserError
  }
}

const getDepartments = async (query) => {
  try {
    let { page, limit, sort = "asc" } = query

    page = parseInt(page) || 1
    limit = parseInt(limit) || 20
    const skip = (page - 1) * limit

    const departments = await Department
      .find({ deletedAt: null, status: BaseStatus.ACTIVE })
      .skip(skip)
      .limit(limit)

    return orderBy(departments, ['code'], [sort])
  } catch (e) {
    return new UserError
  }
}

const getDepartment = async (_id) => {
  try {
    const department = await Department.findOne({
      _id,
      deletedAt: null
    })

    return department
      ? department
      : new UserError(404, "Department Not Found")
  } catch (e) {
    return new UserError(404, "Department Not Found")
  }
}

const updateDepartment = async (_id, body, reqUser) => {
  try {
    const department = await Department.findOne({
      _id,
      deletedAt: null
    })

    if (!department)
      return new UserError(404, 'Department Not Found')
    
    const exists = await Department.findOne({
      _id: { $ne: department._id },
      code: body.code,
      deletedAt: null,
    })

    if (exists) return new UserError(401, "Department Already Exists")

    department.set({
      ...body,
      updatedAt: Date.now(),
      updatedBy: reqUser._id
    })

    await department.save()

    return department || new UserError
  } catch (e) {
    return new UserError
  }
}

const deleteDepartment = async (_id, reqUser) => {
  try {
    const department = await Department.findOne({
      _id,
      deletedAt: null
    })

    if (!department)
      return new UserError(404, 'Department Not Found')

    department.set({
      deletedAt: Date.now(),
      updatedAt: Date.now(),
      deletedBy: reqUser._id,
      updatedBy: reqUser._id
    })

    await department.save()

    return true
  } catch (e) {
    return new UserError
  }
}

module.exports = {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment
}