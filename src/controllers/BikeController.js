// read db data
const db = require('../services/db')
const socketIo = require('../services/socketio')

class BikeController {
  dashboard(req, res) {
    const bikes = db
      .get('bikes')
      .value()
      .filter((item, index) => index < 15)
    res.render('dashboard', { bikes })
  }

  bike(req, res) {
    const payload = req.body
    console.log(payload)
    db.set(`bikes[${payload.serial}]`, payload).write()
    socketIo.emit('bike', payload)
    res.send(payload)
  }
}

module.exports = new BikeController()
