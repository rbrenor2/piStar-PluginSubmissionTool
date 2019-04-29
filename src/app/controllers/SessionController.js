const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('User not found!')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      console.log('Wrong password!')
      return res.redirect('/')
    }

    // Adds new key to session with user's info
    req.session.user = user

    console.log(`User ${email} logged in with success!`)
    return res.redirect('/app/dashboard')
  }
}

module.exports = new SessionController()
