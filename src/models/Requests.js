const mongoose = require('mongoose')
const { RequestType, RequestStatus } = require('../_base/base.interface')

const RequestSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.keys(RequestType),
    required: true
  },
  subject: {
    type: String,
    required: [true, 'subject is requried'],
  },
  content: {
    type: String,
    required: [true, 'content is requried'],
  },
  status: {
    type: String,
    enum: Object.keys(RequestStatus),
    default: RequestStatus.PENDING,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: null
  },
  deletedAt: {
    type: Date,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Admin",
    default: null
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Admin",
    default: null
  },
  deletedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Admin",
    default: null
  },
})

module.exports = mongoose.model('Request', RequestSchema, "requests")