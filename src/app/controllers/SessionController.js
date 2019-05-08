const { User } = require('../models')
// const flash = require('connect-flash')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('User not found!')
      req.flash('error', 'User not found')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      console.log('Wrong password!')
      req.flash('error', 'Wrong password')
      return res.redirect('/')
    }

    // Adds new key to session with user's info
    req.session.user = user

    req.flash('success', `User ${email} logged in with success!`)
    return res.redirect('/app/dashboard')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController()
