const express = require('express')
const {
  getRequest,
  listRequests,
  listMyRequests,
  createRequest,
  updateStatusRequest
} = require('../controllers/requests.controller')
const { requireAuth } = require('../middlewares/auth.middleware')
const { UserType } = require('../_base/base.interface')

const router = express.Router()

router.get('/', requireAuth(UserType.ADMIN), listRequests)
router.post('/', requireAuth(UserType.STUDENT), createRequest)
router.get('/my', requireAuth(UserType.STUDENT), listMyRequests)
router.get('/:id', requireAuth(), getRequest)
router.put('/:id', requireAuth(UserType.ADMIN), updateStatusRequest)

module.exports = router