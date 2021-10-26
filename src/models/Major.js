const mongoose = require('mongoose')
const { BaseStatus } = require('../_base/base.interface')

const MajorSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'code is requried'],
  },
  name: {
    type: String,
    required: [true, 'name is requried'],
  },
  description: {
    type: String,
    required: [true, 'description is requried'],
  },
  credits: {
      type: Number,
      required: [true, 'credits is requried'],
  },
  status: {
    type: String,
    enum: Object.keys(BaseStatus),
    default: BaseStatus.ACTIVE
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
  courses: {
    type: [mongoose.Schema.ObjectId],
    ref: "Course",
    default: []
  },
})

module.exports = mongoose.model('Major', MajorSchema, "majors")