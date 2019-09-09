const lowDB = require('../services/db')
const Firestore = require('../services/Firestore')

class HomeController {
  index(req, res) {
    // Remove usuários do db local
    lowDB.set('users', []).write()
    // remove usuários do firestore
    // const firestore = new Firestore({})
    // firestore.cleanUsers()

    res.render('index')
  }
}

module.exports = new HomeController()
