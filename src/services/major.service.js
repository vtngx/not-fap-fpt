const { orderBy } = require('lodash')
const Major = require('../models/Major')
const Course = require('../models/Course')
const UserError = require('../utils/userError')
const { BaseStatus } = require('../_base/base.interface')

const createMajor = async (body, reqUser) => {
  try {
    const exists = await Major.findOne({
      code: body.code,
      deletedAt: null,
    })

    if (exists) return new UserError(401, "Major Already Exists")

    const courses = await Course.find({
      _id: { $in: body.courses },
      deletedAt: null
    })
    if (courses.length !== body.courses.length)
      return new UserError(401, "Invalid Courses")

    const major = await Major.create({
      ...body,
      createdBy: reqUser._id
    })

    return major || new UserError
  } catch (e) {
    return new UserError
  }
}

const listMajors = async (query) => {
  try {
    let { page, limit, sort = "asc" } = query

    page = parseInt(page) || 1
    limit = parseInt(limit) || 20
    const skip = (page - 1) * limit

    const majors = await Major
      .find({ deletedAt: null, status: BaseStatus.ACTIVE })
      .skip(skip)
      .limit(limit)

    return orderBy(majors, ['code'], [sort])
  } catch (e) {
    return new UserError
  }
}

const getMajor = async (_id) => {
  try {
    const major = await Major
      .findOne({
        _id,
        deletedAt: null
      })
      .populate({ 
        path: 'courses',
        populate: {
          path: 'department'
        } 
    })

    return major
      ? major
      : new UserError(404, "Major Not Found")
  } catch (e) {
    return new UserError(404, "Major Not Found")
  }
}

const updateMajor = async (_id, body, reqUser) => {
  try {
    const major = await Major.findOne({
      _id,
      deletedAt: null
    })

    if (!major)
      return new UserError(404, 'Major Not Found')
    
    const exists = await Major.findOne({
      _id: { $ne: major._id },
      code: body.code,
      deletedAt: null,
    })

    if (exists) return new UserError(401, "Major Already Exists")

    const courses = await Course.find({
      _id: { $in: body.courses },
      deletedAt: null
    })
    if (courses.length !== body.courses.length)
      return new UserError(401, "Invalid Courses")

    major.set({
      ...body,
      updatedAt: Date.now(),
      updatedBy: reqUser._id
    })

    await major.save()

    return major || new UserError
  } catch (e) {
    return new UserError
  }
}

const deleteMajor = async (_id, reqUser) => {
  try {
    const major = await Major.findOne({
      _id,
      deletedAt: null
    })

    if (!major)
      return new UserError(404, 'Major Not Found')

    major.set({
      deletedAt: Date.now(),
      updatedAt: Date.now(),
      deletedBy: reqUser._id,
      updatedBy: reqUser._id
    })

    await major.save()

    return true
  } catch (e) {
    return new UserError
  }
}

module.exports = {
  listMajors,
  createMajor,
  getMajor,
  updateMajor,
  deleteMajor
}