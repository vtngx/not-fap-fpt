const { sendResponse } = require('../utils/response')
const requestService = require('../services/requests.service')

const listRequests = async (req, res, next) => {
  const data = await requestService.listRequests(req.query)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const listMyRequests = async (req, res, next) => {
  const data = await requestService.listMyRequests(req.query, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const getRequest = async (req, res, next) => {
  const data = await requestService.getRequest(req.params.id, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const createRequest = async (req, res, next) => {
  const data = await requestService.createRequest(req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const updateStatusRequest = async (req, res, next) => {
  const data = await requestService.updateStatusRequest(req.params.id, req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

module.exports = {
  listRequests,
  listMyRequests,
  getRequest,
  createRequest,
  updateStatusRequest,
}