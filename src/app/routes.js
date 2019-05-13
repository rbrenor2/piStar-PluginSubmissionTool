const express = require('express')
const multer = require('multer')
const multerConfig = require('../config/multer')

const UserController = require('./controllers/UserController')
const SessionController = require('./controllers/SessionController')
const SubmissionController = require('./controllers/SubmissionController')
const DashboardController = require('./controllers/DashboardController')

const authMiddleware = require('./middlewares/auth')
const guestMiddleware = require('./middlewares/guest')

const routes = express.Router()

// Adding flash messages to all nunjucks views
routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

// Sign in routes
routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

// Signup routes
routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', UserController.store)

// Routes that contain /app: use the authMiddleware to do user/session verfication
routes.use('/app', authMiddleware)

// App routes
routes.get('/app/dashboard', DashboardController.index)

routes.get('/app/logout', SessionController.destroy)

// TODO Plugin submission requests
// routes.get('/app/submit', SubmissionController.create)
routes.get('/app/create_plugin', SubmissionController.create)
routes.post(
  '/app/submit',
  multer(multerConfig).single('plugin_file'),
  SubmissionController.store
)
routes.post('/app/create_plugin', SubmissionController.createPlugin)

module.exports = routes
