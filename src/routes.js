const express = require('express')
const db = require('./services/db')
const shortid = require('shortid')

function routes(dependencies) {
  const { io } = dependencies

  const BikeControllerClass = require('./controllers/BikeController')

  const BikeController = new BikeControllerClass({ io })
  const HomeController = require('./controllers/HomeController')
  const RankController = require('./controllers/RankController')

  const router = express.Router()

  // Home
  router.get('/', HomeController.index)
  // bikes
  router.get('/dashboard', BikeController.dashboard)
  router.post('/bike', (req, res) => {
    const bike = req.body

    // emitir para socket
    io.emit('bike', bike)

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
  })
  // rank
  router.get('/rank', RankController.index)

  return router
}

module.exports = routes
