class SubmissionController {
  create (req, res) {
    return res.render('submission')
  }

  store (req, res) {
    console.log('REQ SUBMISSION')
    console.log(req.body)
    console.log(req.file)

    return res.redirect('/')
  }
}

module.exports = new SubmissionController()
