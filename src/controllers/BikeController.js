// read db data
const db = require('../services/db')
const shortid = require('shortid')

class BikeController {
  dashboard(req, res) {
    const left = [1, 2, 3, 9, 10, 11, 12, 13, 14, 20, 21, 22, 23, 24, 25]
    const right = [4, 5, 6, 7, 8, 15, 16, 17, 18, 19, 26, 27, 28, 29, 30]

    const teacher = db.get('teacher').value()
    const screenOpened = req.query.screen

    const position = {
      label: screenOpened === 'left' ? 'E' : 'D',
      bikesArrangement: screenOpened === 'left' ? left : right
    }

    res.render('dashboard', { position, teacher })
  }

  /**
   * Recebe os requests das bikes e salva no banco
   * @param {*} req
   * @param {*} res
   */
  bike(req, res, io) {
    const bikeData = req.body
    const userCollection = db.get('users').find({ hash: bikeData.hash })
    const userData = userCollection.value()

    if (!userData) return res.send(false)

    const bikePos = userData.bikePos
    // emitir para socket
    io.emit('bikeUpdated', { ...bikeData, bikePos })

    // retorna o objeto performance
    let performance = userCollection.get('performance').value()

    // adiciona o novo item dentro
    performance.push({
      id: shortid.generate(),
      date: new Date(),
      ...bikeData
    })
    // salva o dado com o novo item
    userCollection.assign({ performance }).write()

    res.send(true)
  }
}

module.exports = new BikeController()
