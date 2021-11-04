const { sendResponse } = require('../utils/response')
const studentService = require('../services/student.service')

const getStudents = async (req, res, next) => {
  const data = await studentService.getStudents(req.query)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const getStudent = async (req, res, next) => {
  const data = await studentService.getStudent(req.params.id)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const createStudent = async (req, res, next) => {
  const data = await studentService.createStudent(req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const updateStudent = async (req, res, next) => {
  const data = await studentService.updateStudent(req.params.id, req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const deleteStudent = async (req, res, next) => {
  const data = await studentService.deleteStudent(req.params.id, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const getMe = async (req, res, next) => {
  const data = await studentService.getMe(req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const getMyRequests = async (req, res, next) => {
  const data = await studentService.getMyRequests(req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const getMyProgress = async (req, res, next) => {
  const data = await studentService.getMyProgress(req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

module.exports = {
  getMe,
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getMyRequests,
  getMyProgress,
}