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
  })
  // rank
  router.get('/rank', RankController.index)

  return router
}

module.exports = routes
