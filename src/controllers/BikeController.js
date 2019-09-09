// read db data
const db = require('../services/db')
const shortid = require('shortid')
class BikeController {
  constructor(dependencies) {
    const { io } = dependencies
    this.io = io
  }
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
  bike(req, res) {
    const bike = req.body
    console.log({ bike })

    // emitir para socket
    this.io.emit('bike', { bike })

    // retorna o objeto performance
    let performance = db
      .get('users')
      .find({ hash: bike.hash })
      .get('performance')
      .value()
    // adiciona o novo item dentro
    performance.push({
      id: shortid.generate(),
      date: new Date(),
      ...bike
    })
    // salva o dado com o novo item
    db.get('users')
      .find({ hash: bike.hash })
      .assign({ performance })
      .write()

    res.send(true)
  }
}

module.exports = BikeController
