const { sendResponse } = require('../utils/response')
const adminService = require('../services/admin.service')

const createAdmin = async (req, res, next) => {
  const data = await adminService.createAdmin(req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const getAdmins = async (req, res, next) => {
  const data = await adminService.getAdmins(req.query)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const getAdmin = async (req, res, next) => {
  const data = await adminService.getAdmin(req.params.id)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const updateAdmin = async (req, res, next) => {
  const data = await adminService.updateAdmin(req.params.id, req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const deleteAdmin = async (req, res, next) => {
  const data = await adminService.deleteAdmin(req.params.id, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

module.exports = {
  createAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
}