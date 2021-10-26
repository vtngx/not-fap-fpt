const express = require('express')
const {
  listNews,
  getNews,
  createNews,
  updateNews,
  deleteNews
} = require('../controllers/news.controller')
const { requireAuth } = require('../middlewares/auth.middleware')
const { UserType } = require('../_base/base.interface')

const router = express.Router()

router.get('/', requireAuth(), listNews)
router.post('/', requireAuth(UserType.ADMIN), createNews)
router.get('/:id', requireAuth(), getNews)
router.put('/:id', requireAuth(UserType.ADMIN), updateNews)
router.delete('/:id', requireAuth(UserType.ADMIN), deleteNews)

module.exports = router