const { Plugin } = require('../models')

class SubmissionController {
  create (req, res) {
    // return res.render('submission')
    return res.render('new_plugin')
  }

  async createPlugin (req, res) {
    await Plugin.create(req.body).then(plugin => {
      // return res.redirect('/app/submit', { plugin })
      return res.render('submission', { plugin: plugin })
    })
  }

  async store (req, res) {
    console.log('REQ SUBMISSION')
    console.log(req.body)
    console.log(req.file)

    // TODO Deal with keywords
    //* create array of keywords, store in Keyword table and create entries for each keyword in PluginsKeywords

    // TODO Deal with authors
    //* create array of authors and store them in UsersPlugins

    // const {
    //   plugin_name,
    //   keywords,
    //   authors_emails,
    //   short_description,
    //   long_description,
    //   homepage_link,
    //   file_link
    // } = req.body
    // await Plugin.create({
    //   name:
    // })
    // return res.redirect('/')
  }
}

// function unzip (path) {}

// function getObjects (filesFolder) {}

module.exports = new SubmissionController()
