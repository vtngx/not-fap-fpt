const { sendResponse } = require('../utils/response')
const majorsService = require('../services/major.service')

const listMajors = async (req, res, next) => {
  const data = await majorsService.listMajors(req.query)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const getMajor = async (req, res, next) => {
  const data = await majorsService.getMajor(req.params.id)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const createMajor = async (req, res, next) => {
  const data = await majorsService.createMajor(req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const updateMajor = async (req, res, next) => {
  const data = await majorsService.updateMajor(req.params.id, req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const deleteMajor = async (req, res, next) => {
  const data = await majorsService.deleteMajor(req.params.id, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse({}, res)
}

module.exports = {
  listMajors,
  getMajor,
  createMajor,
  updateMajor,
  deleteMajor,
}