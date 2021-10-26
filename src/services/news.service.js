const { orderBy } = require('lodash')
const News = require('../models/News')
const UserError = require('../utils/userError')
const { BaseStatus } = require('../_base/base.interface')

const listNews = async (query) => {
  try {
    let { page, limit, sort = "asc" } = query

    page = parseInt(page) || 1
    limit = parseInt(limit) || 20
    const skip = (page - 1) * limit

    const news = await News
      .find({ deletedAt: null, status: BaseStatus.ACTIVE })
      .skip(skip)
      .limit(limit)

    return orderBy(news, ['createdAt'], [sort])
  } catch (e) {
    return new UserError
  }
}

const getNews = async (_id) => {
  try {
    const news = await News.findOne({
      _id,
      deletedAt: null
    })

    return news
      ? news
      : new UserError(404, "News Not Found")
  } catch (e) {
    return new UserError(404, "News Not Found")
  }
}

const createNews = async (body, reqUser) => {
  try {
    const news = await News.create({
      ...body,
      createdBy: reqUser._id
    })

    return news || new UserError
  } catch (e) {
    return new UserError
  }
}

const updateNews = async (_id, body, reqUser) => {
  try {
    const news = await News.findOne({ _id, deletedAt: null })

    if (!news)
      return new UserError(404, "News Not Found")
    
    news.set({
      ...body,
      updatedAt: Date.now(),
      updatedBy: reqUser._id
    })

    await news.save()

    return news || new UserError
  } catch (e) {
    return new UserError
  }
}

const deleteNews = async (_id, reqUser) => {
  try {
    const news = await News.findOne({ _id, deletedAt: null })

    if (!news)
      return new UserError(404, "News Not Found")

    news.set({
      deletedAt: Date.now(),
      updatedAt: Date.now(),
      deletedBy: reqUser._id,
      updatedBy: reqUser._id
    })

    await news.save()

    return true
  } catch (e) {
    return new UserError
  }
}

module.exports = {
  listNews,
  getNews,
  createNews,
  updateNews,
  deleteNews,
}