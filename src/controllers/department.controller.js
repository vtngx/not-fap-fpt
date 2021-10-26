const { sendResponse } = require('../utils/response')
const departmentService = require('../services/department.service')

const createDepartment = async (req, res, next) => {
  const data = await departmentService.createDepartment(req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const getDepartments = async (req, res, next) => {
  const data = await departmentService.getDepartments(req.query)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const getDepartment = async (req, res, next) => {
  const data = await departmentService.getDepartment(req.params.id)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const updateDepartment = async (req, res, next) => {
  const data = await departmentService.updateDepartment(req.params.id, req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const deleteDepartment = async (req, res, next) => {
  const data = await departmentService.deleteDepartment(req.params.id, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

module.exports = {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
}