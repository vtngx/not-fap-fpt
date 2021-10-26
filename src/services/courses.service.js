const { orderBy } = require('lodash')
const Course = require('../models/Course')
const UserError = require('../utils/userError')
const Department = require('../models/Department')
const { BaseStatus } = require('../_base/base.interface')

const listCourses = async (query) => {
  try {
    let { page, limit, sort = "asc" } = query

    page = parseInt(page) || 1
    limit = parseInt(limit) || 20
    const skip = (page - 1) * limit

    const courses = await Course
      .find({ deletedAt: null, status: BaseStatus.ACTIVE })
      .skip(skip)
      .limit(limit)

    return orderBy(courses, ['createdAt'], [sort])
  } catch (e) {
    return new UserError
  }
}

const getCourse = async (_id) => {
  try {
    const course = await Course.findOne({
      _id,
      deletedAt: null
    }).populate('department')

    return course
      ? course
      : new UserError(404, "Course Not Found")
  } catch (e) {
    return new UserError(404, "Course Not Found")
  }
}

const createCourse = async (body, reqUser) => {
  try {
    const { department } = body
    const dep = await Department.findOne({
      department,
      deletedAt: null
    })

    if (!dep)
      return new UserErro(404, 'Department Not Found')
    
    const exists = await Course.findOne({
      code: body.code,
      deletedAt: null,
    })

    if (exists) return new UserError(401, "Course Already Exists")

    const course = await Course.create({
      ...body,
      createdBy: reqUser._id
    })

    return course || new UserError
  } catch (e) {
    return new UserError
  }
}

const updateCourse = async (_id, body, reqUser) => {
  try {
    const course = await Course.findOne({ _id, deletedAt: null })

    if (!course)
      return new UserError(404, "Course Not Found")
    
    const exists = await Course.findOne({
      _id: { $ne: course._id },
      code: body.code,
      deletedAt: null,
    })

    if (exists) return new UserError(401, "Course Already Exists")

    if (String(course.department) !== String(body.department)) {
      const { department } = body
      const dep = await Department.findOne({
        department,
        deletedAt: null
      })
  
      if (!dep)
        return new UserErro(404, 'Department Not Found')
    }
    
    course.set({
      ...body,
      updatedAt: Date.now(),
      updatedBy: reqUser._id
    })

    await course.save()

    return course || new UserError
  } catch (e) {
    return new UserError
  }
}

const deleteCourse = async (_id, reqUser) => {
  try {
    const course = await Course.findOne({ _id, deletedAt: null })

    if (!course)
      return new UserError(404, "Course Not Found")

    course.set({
      deletedAt: Date.now(),
      updatedAt: Date.now(),
      deletedBy: reqUser._id,
      updatedBy: reqUser._id
    })

    await course.save()

    return true
  } catch (e) {
    return new UserError
  }
}

module.exports = {
  listCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
}