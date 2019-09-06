// read db data
const db = require('../services/db')

class BikeController {
  dashboard(req, res) {
    const users = db
      .get('users')
      .value()
      .filter(item => item != null)
      .filter((item, index) => item)
    res.render('dashboard', { users })
  }

  /**
   * Recebe os requests das bikes e salva no banco
   * @param {*} req
   * @param {*} res
   */
  bike(req, res) {
    const payload = req.body
    db.set(`bikes[${payload.serial}]`, payload).write()
    res.send(payload)
  }
}

module.exports = new BikeController()
