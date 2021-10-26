const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { BaseStatus } = require('../_base/base.interface')

const AdminSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'code is requried'],
  },
  name: {
    type: String,
    required: [true, 'name is requried'],
  },
  phone: {
    type: String,
    required: [true, 'phone is requried'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'email invalid'
    ],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    select: false
  },
  address: {
    type: String,
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
})

//  encrypt password
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password'))
    next()

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

//  sign jwt
AdminSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXP }
  )
}

//  check password match
AdminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('Admin', AdminSchema, "admins")