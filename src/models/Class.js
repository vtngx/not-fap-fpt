const mongoose = require('mongoose')
const { BaseStatus } = require('../_base/base.interface')

const ClassSchema = new mongoose.Schema({
    code: {
      type: String,
      required: [true, 'code is requried'],
    },
    teacher: {
        type: String,
        required: [true, 'teacher is requried'],
    },
    slots: {
        type: Number,
        required: [true, 'slots is requried'],
    },
    status: {
        type: String,
        enum: Object.keys(BaseStatus),
        default: BaseStatus.ACTIVE,
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
    course: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      default: []
    },
    students: {
      type: [mongoose.Schema.ObjectId],
      ref: "Students",
      default: []
    },
})

module.exports = mongoose.model('Class', ClassSchema, "classes")