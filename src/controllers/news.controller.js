const { sendResponse } = require('../utils/response')
const newsService = require('../services/news.service')

const listNews = async (req, res, next) => {
  const data = await newsService.listNews(req.query)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const getNews = async (req, res, next) => {
  const data = await newsService.getNews(req.params.id)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const createNews = async (req, res, next) => {
  const data = await newsService.createNews(req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const updateNews = async (req, res, next) => {
  const data = await newsService.updateNews(req.params.id, req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const deleteNews = async (req, res, next) => {
  const data = await newsService.deleteNews(req.params.id, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse({}, res)
}

module.exports = {
  listNews,
  getNews,
  createNews,
  updateNews,
  deleteNews,
}