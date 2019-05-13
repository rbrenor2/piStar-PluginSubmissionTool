const { Plugin, UsersPlugins } = require('../models')

class DashboardController {
  async index (req, res) {
    // if is Admin
    if (req.session.user.isAdmin) {
      console.log('IS ADMIN')
    }

    // if isn't Admin
    const { id } = req.session.user
    const pluginIds = await UsersPlugins.findAll({ where: { user_id: id } })
    const plugins = await Plugin.findAll({ where: { id: pluginIds } })

    console.log(pluginIds)
    console.log(plugins)

    return res.render('dashboard', { plugins })
  }
}

module.exports = new DashboardController()
