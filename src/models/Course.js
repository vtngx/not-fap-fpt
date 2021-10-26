const mongoose = require('mongoose')
const { BaseStatus } = require('../_base/base.interface')

const CourseSchema = new mongoose.Schema({
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
      default: ""
    },
    credits: {
        type: Number,
        required: [true, 'credits is requried'],
    },
    minMarkToPass: {
        type: Number,
        required: [true, 'minMarkToPass is requried'],
    },
    slotsTotal: {
        type: Number,
        required: [true, 'slotsTotal is requried'],
    },
    slotsPerWeek: {
        type: Number,
        required: [true, 'slotsPerWeek is requried'],
    },
    price: {
        type: Number,
        required: [true, 'price is requried'],
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
    department: {
        type: mongoose.Schema.ObjectId,
        ref: "Department",
        default: null
    },
})

module.exports = mongoose.model('Course', CourseSchema, "courses")