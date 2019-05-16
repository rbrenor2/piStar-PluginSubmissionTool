const {
  Plugin,
  UsersPlugins,
  Keyword,
  PluginsKeywords,
  User
} = require('../models')

const ShapesRead = require('./auxiliarFunctions/ShapesRead')
const fs = require('fs')
const unzip = require('unzip-stream')
const xml2js = require('xml2js')
const parser = new xml2js.Parser({ attrkey: 'ATTR' })

class SubmissionController {
  create (req, res) {
    return res.render('submission')
  }

  async store (req, res) {
    const { path, destination, filename } = req.file

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

    const objects = await getObjectsFromFile(path, destination, filename)
    console.log('OBJECTS')
    console.log(objects)

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

    // return res.redirect('/')
  }
}

function getAuthors (authors) {
  return authors.replace(' ', '').split(',')
}

function getKeywords (keywords) {
  return keywords.split(',')
}

async function getObjectsFromFile (path, destination, filename) {
  console.log(`Getting objects from ${filename} file...`)
  await fs
    .createReadStream(path)
    .pipe(unzip.Extract({ path: destination }))
    .on('close', async () => {
      console.log('Done unzipping')

      // TODO read each file
      const images = await readSVG(destination)
      const constraints = await readFiles('constraints', destination)
      const metamodel = await readFiles('metamodel', destination)
      const shapes = await readFiles('shapes', destination)
      const uimetamodel = await readFiles('ui.metamodel', destination)

      console.log({
        images: images,
        constraints: constraints,
        metamodel: metamodel,
        shapes: shapes,
        uimetamodel: uimetamodel
      })

      return {
        images: images,
        constraints: constraints,
        metamodel: metamodel,
        shapes: shapes,
        uimetamodel: uimetamodel
      }
    })
}

async function readSVG (destination) {
  const imagePath = destination + '/language/images/'
  const errorsPath = imagePath + '/language/images/errors'
  const svgs = {}

  await fs.readdir(imagePath, function (err, files) {
    if (err) {
      console.log('Unable to scan directory: ' + err)
    } else {
      console.log('SVG:')
      for (const fileName of files) {
        if (fileName !== 'errors') {
          console.log('NOTERRORS filename: ' + fileName)
          const data = fs.readFileSync(imagePath + fileName, 'utf8')
          svgs[fileName.replace('.svg', '')] = data
        }
      }
    }
    console.log('Passou!')
    return svgs
  })
}

async function readFiles (name, destination) {
  await fs.readFile(
    destination + '/language/' + name + '.js',
    { encoding: 'utf-8' },
    function (err, data) {
      if (!err) {
        switch (name) {
          case 'constraints':
            console.log('reading constraints file...')
            return 'constraints'
          case 'metamodel':
            const metamodelDict =
              data.split('istar.metamodel = ')[1].split('};')[0] + '}'
            return metamodelDict
          case 'shapes':
            const shapesDict = ShapesRead.readShapesFile(data)
            return shapesDict
          case 'ui.metamodel':
            console.log('reading constraints file...')
            return 'uimetamodel'
          default:
            return 'default'
        }
      } else {
        console.log(err)
      }
    }
  )
}

module.exports = new SubmissionController()
