const { omit, orderBy } = require('lodash')
const Student = require('../models/Student')
const UserError = require('../utils/userError')

const getStudents = async (query) => {
  try {
    let { page, limit, sort = "asc" } = query

    page = parseInt(page) || 1
    limit = parseInt(limit) || 20
    const skip = (page - 1) * limit

    const students = await Student
      .find({ deletedAt: null })
      .skip(skip)
      .limit(limit)

    return orderBy(students, ['email'], [sort])
  } catch (e) {
    return new UserError
  }
}

const getStudent = async (_id) => {
  try {
    const student = await Student.findOne({
      _id,
      deletedAt: null
    })

    return student
      ? student
      : new UserError(404, "Student Not Found")
  } catch (e) {
    return new UserError(404, "Student Not Found")
  }
}

const createStudent = async (body, reqUser) => {
  try {
    const exists = await Student.findOne({
      email: body.email,
      deletedAt: null
    })

    if (exists) return new UserError(401, "Student Already Exists")

    const { roleNum, name } = body

    let i = 0
    const code = (name
      .split(' ')
      .reverse()
      .reduce((a, b) => {
        if (i !== 0) b = b.charAt(0)
        i += 1
        return (a + b)
      }) + roleNum)
      .toLowerCase()

    const student = await Student.create({
      ...omit(body, ['password']),
      code,
      password: 'abcd1234',
      createdBy: reqUser._id
    })

    return student || new UserError
  } catch (e) {
    return new UserError
  }
}

const updateStudent = async (_id, body, reqUser) => {
  try {
    const student = await Student.findOne({
      _id,
      deletedAt: null
    })

    if (!student)
      return new UserError(404, 'Student Not Found')

    if (body.email !== student.email) {
      const exists = await Student.findOne({
        email: body.email,
        deletedAt: null
      })

      if (exists) return new UserError(401, "Student Already Exists")
    }

    const { roleNum, name } = body

    let i = 0
    const code = (name
      .split(' ')
      .reverse()
      .reduce((a, b) => {
        if (i !== 0) b = b.charAt(0)
        i += 1
        return (a + b)
      }) + roleNum)
      .toLowerCase()

    student.set({
      ...omit(body, ['password']),
      code,
      updatedAt: Date.now(),
      updatedBy: reqUser._id
    })

    await student.save()

    return student || new UserError
  } catch (e) {
    return new UserError
  }
}

const deleteStudent = async (_id, reqUser) => {
  try {
    const student = await Student.findOne({
      _id,
      deletedAt: null
    })

    if (!student)
      return new UserError(404, 'Student Not Found')

    student.set({
      deletedAt: Date.now(),
      updatedAt: Date.now(),
      deletedBy: reqUser._id,
      updatedBy: reqUser._id
    })

    await student.save()

    return true
  } catch (e) {
    return new UserError
  }
}

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
}