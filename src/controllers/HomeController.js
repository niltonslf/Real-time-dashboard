const lowDB = require('../services/db')

class HomeController {
  index(req, res) {
    lowDB.set('users', []).write()
    res.render('index')
  }
}

module.exports = new HomeController()
