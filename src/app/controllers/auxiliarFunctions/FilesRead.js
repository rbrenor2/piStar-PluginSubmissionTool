const fs = require('fs')
const ShapesRead = require('./ShapesRead')

class FilesRead {
  readSVG (destination) {
    const imagePath = destination + '/language/images/'
    const errorsPath = imagePath + '/errors/'
    const svgs = {}
    const errors = {}

    const filenames = fs.readdirSync(imagePath)
    filenames.forEach(filename => {
      if (filename !== 'errors') {
        const data = fs.readFileSync(imagePath + filename, 'utf8')
        svgs[filename.replace('.svg', '')] = data
      }
    })

    const fileErrors = fs.readdirSync(errorsPath)
    fileErrors.forEach(filename => {
      const data = fs.readFileSync(errorsPath + filename, 'utf8')
      errors[filename.replace('.svg', '')] = data
    })

    svgs['errors'] = errors
    return svgs
  }

  readFiles (name, destination) {
    console.log(destination + '/language/' + name + '.js')
    const file = fs.readFileSync(destination + '/language/' + name + '.js', {
      encoding: 'utf-8'
    })
    if (file) {
      switch (name) {
        case 'constraints':
          console.log('reading constraints file...')
          return file
        case 'metamodel':
          const metamodelDict =
            file.split('istar.metamodel = ')[1].split('};')[0] + '}'
          return metamodelDict
        case 'shapes':
          const shapesDict = ShapesRead.readShapesFile(file)
          return shapesDict
        case 'ui.metamodel':
          console.log('reading ui.metamodel file...')
          return 'uimetamodel'
        default:
          return 'default'
      }
    } else {
      console.log('File error')
    }
  }
}

module.exports = new FilesRead()
