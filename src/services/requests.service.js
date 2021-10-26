const { orderBy } = require('lodash')
const Request = require('../models/Requests')
const UserError = require('../utils/userError')

const listRequests = async (query) => {
  try {
    let { page, limit, sort = "asc" } = query

    page = parseInt(page) || 1
    limit = parseInt(limit) || 20
    const skip = (page - 1) * limit

    const requests = await Request
      .find({ deletedAt: null })
      .skip(skip)
      .limit(limit)

    return orderBy(requests, ['createdAt'], [sort])
  } catch (e) {
    return new UserError
  }
}

const listMyRequests = async (query, reqUser) => {
  try {
    let { page, limit, sort = "asc" } = query

    page = parseInt(page) || 1
    limit = parseInt(limit) || 20
    const skip = (page - 1) * limit

    const requests = await Request
      .find({ deletedAt: null, createdBy: reqUser._id })
      .skip(skip)
      .limit(limit)

    return orderBy(requests, ['createdAt'], [sort])
  } catch (e) {
    return new UserError
  }
}

const getRequest = async (_id, reqUser) => {
  try {
    const request = await Request.findOne({ _id })

    if (!request)
      return new UserError(404, "Request Not Found")

    if (String(request.createdBy) !== String(reqUser._id))
      return new UserError(401, 'Not Authorized')

    return request
  } catch (e) {
    return new UserError(404, "Request Not Found")
  }
}

const createRequest = async (body, reqUser) => {
  try {
    const request = await Request.create({
      ...body,
      createdBy: reqUser._id
    })

    return request || new UserError
  } catch (e) {
    return new UserError
  }
}

const updateStatusRequest = async (_id, body, reqUser) => {
  try {
    const request = await Request.findOne({ _id })

    if (!request)
      return new UserError(404, "Request Not Found")
    
    request.set({
      status: body.status,
      updatedAt: Date.now(),
      updatedBy: reqUser._id
    })

    await request.save()

    return request || new UserError
  } catch (e) {
    return new UserError
  }
}

module.exports = {
  listRequests,
  listMyRequests,
  getRequest,
  createRequest,
  updateStatusRequest,
}