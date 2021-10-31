const authRoutes = require('./auth.route')
const adminRoutes = require('./admin.route')
const majorRoutes = require('./major.route')
const courseRoutes = require('./course.route')
const studentRoutes = require('./student.route')
const requestRoutes = require('./request.route')

module.exports = app => {
  app.get('/', (req, res) => {
    return res.send("not-fap backend")
  })
  app.use('/api/auth', authRoutes),
  app.use('/api/admin', adminRoutes),
  app.use('/api/major', majorRoutes),
  app.use('/api/course', courseRoutes),
  app.use('/api/request', requestRoutes),
  app.use('/api/student', studentRoutes)
}