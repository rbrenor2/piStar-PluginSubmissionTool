const {
  Plugin,
  UsersPlugins,
  Keyword,
  PluginsKeywords,
  User
} = require('../models')

const fs = require('fs')

class SubmissionController {
  create (req, res) {
    return res.render('submission')
  }

  async createPlugin (req, res) {}

  async store (req, res) {
    const { path } = req.file
    // TODO read file and return its contents
    const languageObjects = getObjectsFromFile(path)

    const {
      name,
      shortDescription,
      longDescription,
      homepageLink,
      category,
      references,
      authorsEmails,
      keywords,
      pluginFile
    } = req.body

    await Plugin.create({
      name: name,
      short_description: shortDescription,
      long_description: longDescription,
      homepage_link: homepageLink,
      category: category,
      reference: references
    }).then(async function (plugin) {
      //* STORE: Create new entry in UsersPlugins for each author
      const authors = getAuthors(authorsEmails)
      authors.forEach(async function (email) {
        await User.findOne({ where: { email: email } }).then(async function (
          user
        ) {
          await UsersPlugins.create({
            user_id: user.id,
            plugin_id: plugin.id
          })
        })

        //* STORE: Create new entry in Keyword (if it doesn't exists yet) and then create entries in PluginsKeywords
        const newKeys = getKeywords(keywords)
        newKeys.forEach(async function (key) {
          await Keyword.findOne({ where: { title: key } }).then(async function (
            existingKey
          ) {
            if (existingKey) {
            } else {
              await Keyword.create({ title: key }).then(async function (
                storedKey
              ) {
                await PluginsKeywords.create({
                  plugin_id: plugin.id,
                  keyword_id: storedKey.id
                })
              })
            }
          })
        })
      })
    })
  }
}

function getObjectsFromFile (path) {
  // TODO Unzip

  const contents = fs.readFileSync(path, 'utf8')
  console.log('CONTENTS')
  console.log(contents)
}

function getAuthors (authors) {
  return authors.replace(' ', '').split(',')
}

function getKeywords (keywords) {
  return keywords.split(',')
}

function unzip (path) {}

module.exports = new SubmissionController()
