const express = require('express')

const UserController = require('./controllers/UserController')
const SessionController = require('./controllers/SessionController')
const SubmissionController = require('./controllers/SubmissionController')

const authMiddleware = require('./middlewares/auth')
const guestMiddleware = require('./middlewares/guest')

const routes = express.Router()
// Sign in routes
routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)
// Signup routes
routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', UserController.store)

// Routes that contain /app: use the authMiddleware to do user/session verfication
routes.use('/app', authMiddleware)

// App routes
routes.get('/app/dashboard', (req, res) => {
  console.log(req.session.user)
  return res.render('dashboard')
})

routes.get('/app/logout', SessionController.destroy)

// TODO Plugin submission requests
routes.get('/app/submit', SubmissionController.create)
routes.post('/app/submit')

module.exports = routes
