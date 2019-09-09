// read db data
const db = require('../services/db')
const shortid = require('shortid')
class BikeController {
  dashboard(req, res) {
    const users = db
      .get('users')
      .value()
      .filter(item => item != null)
      .filter(item => item)

    const teacher = db.get('teacher').value()

    res.render('dashboard', { users, teacher })
  }

  /**
   * Recebe os requests das bikes e salva no banco
   * @param {*} req
   * @param {*} res
   */
  async bike(req, res) {
    const bike = req.body

    console.log({ bike })

    let performance = await db
      .get('users')
      .find({ hash: bike.hash })
      .get('performance')
      .value()

    performance.push({ id: shortid.generate(), date: new Date(), ...bike })

    db.get('users')
      .find({ hash: bike.hash })
      .assign({ performance })
      .write()

    res.send(true)
  }
}

module.exports = new BikeController()
