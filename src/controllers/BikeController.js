// read db data
const db = require('../services/db')
const shortid = require('shortid')
class BikeController {
  constructor(dependencies) {
    const { io } = dependencies
    this.io = io
  }
  dashboard(req, res) {
    const left = [1, 2, 3, 9, 10, 11, 12, 13, 14, 20, 21, 22, 23, 24, 25]
    const right = [4, 5, 6, 7, 8, 15, 16, 17, 18, 19, 26, 27, 28, 29, 30]

    const teacher = db.get('teacher').value()
    const screenOpened = req.query.screen

    const position = {
      label: screenOpened === 'left' ? 'Esquerda' : 'Direita',
      bikesArrangement: screenOpened === 'left' ? left : right
    }

    res.render('dashboard', { position, teacher })
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

    // // retorna o objeto performance
    // let performance = db
    //   .get('users')
    //   .find({ hash: bike.hash })
    //   .get('performance')
    //   .value()
    // // adiciona o novo item dentro
    // performance.push({
    //   id: shortid.generate(),
    //   date: new Date(),
    //   ...bike
    // })
    // // salva o dado com o novo item
    // db.get('users')
    //   .find({ hash: bike.hash })
    //   .assign({ performance })
    //   .write()

    res.send(true)
  }
}

module.exports = BikeController
