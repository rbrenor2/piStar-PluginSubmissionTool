const { User } = require('../models')
class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    const { email } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('User not found!')
      await User.create(req.body)
      return res.redirect('/')
    } else {
      console.log('User already exists, try to login!')
    }
  }
}

module.exports = new UserController()
