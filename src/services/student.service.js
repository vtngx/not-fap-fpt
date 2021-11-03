const Major = require('../models/Major')
const { omit, orderBy } = require('lodash')
const Student = require('../models/Student')
const Requests = require('../models/Requests')
const UserError = require('../utils/userError')

const getStudents = async (query) => {
  try {
    let { page, limit, sort = "asc" } = query

    page = parseInt(page) || 1
    limit = parseInt(limit) || 20
    const skip = (page - 1) * limit

    const students = await Student
      .find({ deletedAt: null })
      .populate('major', 'name code')
      .populate('coursesPassed', 'code name credits')
      .populate('coursesFailed', 'code name credits')
      .skip(skip)
      .limit(limit)

    return orderBy(students, ['roleNum'], [sort])
  } catch (e) {
    return new UserError
  }
}

const getStudent = async (_id) => {
  try {
    const student = await Student
      .findOne({
        _id,
        deletedAt: null
      })
      .populate('major', 'name code')
      .populate('coursesPassed', 'code name credits')
      .populate('coursesFailed', 'code name credits')

    return student
      ? student
      : new UserError(404, "Student Not Found")
  } catch (e) {
    return new UserError(404, "Student Not Found")
  }
}

const createStudent = async (body, reqUser) => {
  try {
    if (!body.major)
      return new UserError(400, "Major Cannot Be Blank")

    const [exists, major] = await Promise.all([
      Student.findOne({
        email: body.email,
        deletedAt: null
      }),
      Major.findOne({
        _id: body.major,
        deletedAt: null,
      })
    ])

    if (exists) return new UserError(401, "Student Already Exists")

    const { name } = body
    const roleNum = major.code + String(await Student.find({ deletedAt: null, major: body.major }).count() + 1)

    let i = 0
    const code = (name
      .split(' ')
      .reverse()
      .reduce((a, b) => {
        if (i !== 0) b = b.charAt(0)
        i += 1
        return (a + b)
      }, '') + roleNum)
      .toLowerCase()
    const email = `${code}@edu.vn`

    const student = await Student.create({
      ...omit(body, ['password', 'roleNum', 'code', 'email']),
      roleNum,
      code,
      email,
      password: 'asd123',
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

    student.set({
      ...omit(body, ['password', 'code', 'email', 'roleNum', 'major']),
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

const getMe = async (reqUser) => {
  const me = await Student
    .find({
      deletedAt: null,
      _id: reqUser._id,
    })
    .populate({ path: 'major', select: 'code name' })
    .select('roleNum code name phone email address status major')

  if (!me)
    return new UserError(404, "Student Not Found")

  return me
}

const getMyRequests = async (reqUser) => {
  const requests = await Requests.find({
    deletedAt: null,
    createdBy: reqUser._id,
  })
  return requests || []
}

module.exports = {
  getMe,
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getMyRequests,
}