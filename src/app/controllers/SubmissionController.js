const {
  Plugin,
  UsersPlugins,
  Keyword,
  PluginsKeywords,
  User
} = require('../models')

const Utils = require('./auxiliarFunctions/Utils')
const FilesRead = require('./auxiliarFunctions/FilesRead')

const fs = require('fs')
const unzip = require('unzip-stream')

class SubmissionController {
  create (req, res) {
    return res.render('submission')
  }

  async store (req, res) {
    const { path, destination } = req.file

    // TODO read file and return its contents
    const {
      name,
      shortDescription,
      longDescription,
      homepageLink,
      category,
      references,
      authorsEmails,
      keywords
    } = req.body

    await fs
      .createReadStream(path)
      .pipe(unzip.Extract({ path: destination }))
      .on('finish', async function () {
        // TODO read each file
        console.log(destination)
        const images = FilesRead.readSVG(destination)
        const constraints = FilesRead.readFiles('constraints', destination)
        const metamodel = FilesRead.readFiles('metamodel', destination)
        const shapes = FilesRead.readFiles('shapes', destination)
        const uimetamodel = FilesRead.readFiles('ui.metamodel', destination)

        const plugin = Plugin.create({
          name: name,
          short_description: shortDescription,
          long_description: longDescription,
          homepage_link: homepageLink,
          category: category,
          reference: references,
          svgs: images,
          constraints: constraints,
          metamodel: metamodel,
          shapes: shapes,
          uimetamodel: uimetamodel
        })

        const authors = Utils.getAuthors(authorsEmails)
        authors.forEach(async function (email) {
          const user = await User.findOne({ where: { email: email } })
          UsersPlugins.create({
            user_id: user.id,
            plugin_id: plugin.id
          })
        })

        const newKeys = Utils.getKeywords(keywords)
        newKeys.forEach(async function (key) {
          const existingKey = await Keyword.findOne({ where: { title: key } })
          if (existingKey) {
          } else {
            const storedKey = await Keyword.create({ title: key })
            PluginsKeywords.create({
              plugin_id: plugin.id,
              keyword_id: storedKey.id
            })
          }
        })
      })
  }
}

module.exports = new SubmissionController()
