class ShapesRead {
  readShapesFile (data) {
    console.log('Reading Shapes file...')

    // TODO removes final comments
    var shapes = data
      .replace(
        '/*definition of globals to prevent undue JSHint warnings*/\n/*globals joint:false */'
      )
      .split('joint.shapes.istar.')

    // TODO removes initial comments
    shapes.shift()

    // TODO Get each shape
    const shapesDict = {}
    shapes.forEach(shape => {
      const element = shape.split('= j')[0].replace(' ', '')
      console.log('Creating element ' + element + '...')
      if (element) {
        if (element.includes('Link')) {
          shapesDict[element] = this.readLinkShape(shape, element)
        } else {
          shapesDict[element] = this.readDefaultShape(shape, element)
        }
      }
    })
    return shapesDict
  }

  readLinkShape (shape, element) {
    const link = shape
      .split(element + ' = ')[1]
      .replace("joint.dia.Link.define('" + element + "',", '')
      .replace(');', '')

    return link
  }

  readDefaultShape (shape, element) {
    const extend = shape
      .split(element + ' = ')[1]
      .replace('joint.dia.Element.extend(', '')
      .replace('joint.shapes.basic.Rect.extend(', '')
      .replace(');', '')

    return extend
  }
}

module.exports = new ShapesRead()
