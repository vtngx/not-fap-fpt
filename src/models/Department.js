const mongoose = require('mongoose')
const { BaseStatus } = require('../_base/base.interface')

const DepartmentSchema = new mongoose.Schema({
    code: {
      type: String,
      required: [true, 'code is requried'],
      unique: true,
    },
    name: {
        type: String,
        required: [true, 'name is requried'],
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
})

module.exports = mongoose.model('Department', DepartmentSchema, "departments")