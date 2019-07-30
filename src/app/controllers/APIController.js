const { Plugin } = require('../models')
class APIController {
  async listAllPlugins (req, res) {
    const plugins = await Plugin.findAll({ attributes: ['id', 'name'] })
    return res.json(plugins)
  }
  async getPluginById (req, res) {
    const id = req.params.id
    const plugin = await Plugin.findOne({ where: { id } })
    return res.json(plugin)
  }
  getFeedbackInfoById () {}
}

module.exports = new APIController()
