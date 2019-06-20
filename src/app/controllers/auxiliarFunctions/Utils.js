class Utils {
  getAuthors (authors) {
    return authors.replace(' ', '').split(',')
  }

  getKeywords (keywords) {
    return keywords.split(',')
  }
}

module.exports = new Utils()
