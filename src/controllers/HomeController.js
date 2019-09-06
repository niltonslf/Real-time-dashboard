const socketIo = require('../services/socketio')

class HomeController {
  index(req, res) {
    socketIo.emit('firebase', { controller: true })
    res.render('index')
  }
}

module.exports = new HomeController()
