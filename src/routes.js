const express = require('express')

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
  router.post('/bike', BikeController.bike)
  // rank
  router.get('/rank', RankController.index)

  return router
}

module.exports = routes
