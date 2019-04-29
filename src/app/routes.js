const express = require('express')
const UserController = require('./controllers/UserController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()
// Sign in routes
routes.get('/', SessionController.create)
routes.post('/signin', SessionController.store)
// Signup routes
routes.get('/signup', UserController.create)
routes.post('/signup', UserController.store)

// Dashboard routes
routes.get('/app/dashboard', (req, res) => {
  console.log(req.session.user)
  return res.render('dashboard')
})

module.exports = routes
