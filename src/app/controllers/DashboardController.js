const { Plugin, UsersPlugins } = require('../models')

class DashboardController {
  async index (req, res) {
    var plugins = null
    // if it is Admin
    if (req.session.user.isAdmin) {
      console.log('IS ADMIN')
      plugins = await Plugin.findAll({
        attributes: ['id', 'name', 'created_at', 'category']
      })

      plugins = plugins.map(async plugin => {
        const authors = await UsersPlugins.findOne({
          where: { plugin_id: plugin.id }
        })
        plugin.authors = authors
        return plugin
      })
    } else {
      // if isn't Admin
      const { id } = req.session.user
      const pluginIds = await UsersPlugins.findAll({ where: { user_id: id } })
      plugins = await Plugin.findAll({
        where: { id: pluginIds },
        attributes: ['id', 'name', 'created_at', 'category']
      })
    }
    return res.render('dashboard', { plugins })
  }
}

module.exports = new DashboardController()
