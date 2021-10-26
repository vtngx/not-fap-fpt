const { sendResponse } = require('../utils/response')
const coursesService = require('../services/courses.service')

const listCourses = async (req, res, next) => {
  const data = await coursesService.listCourses(req.query)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const getCourse = async (req, res, next) => {
  const data = await coursesService.getCourse(req.params.id)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const createCourse = async (req, res, next) => {
  const data = await coursesService.createCourse(req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const updateCourse = async (req, res, next) => {
  const data = await coursesService.updateCourse(req.params.id, req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const deleteCourse = async (req, res, next) => {
  const data = await coursesService.deleteCourse(req.params.id, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse({}, res)
}

module.exports = {
  listCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
}