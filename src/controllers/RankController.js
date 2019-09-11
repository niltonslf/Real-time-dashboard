const db = require('../services/db')

class RankController {
  index(req, res) {
    const teacher = db.get('teacher').value()
    const screenOpened = req.query.screen

    const position = {
      label: screenOpened === 'left' ? 'E' : 'D'
    }
    res.render('rank.ejs', { position, teacher })
  }
}

module.exports = new RankController()
