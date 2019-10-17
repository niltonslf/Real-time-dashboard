const express = require('express')

function routes(dependencies) {
  const { io } = dependencies

  const BikeController = require('./controllers/BikeController')
  const HomeController = require('./controllers/HomeController')
  const RankController = require('./controllers/RankController')

  const router = express.Router()

  // Home
  router.get('/', HomeController.index)
  // bikes
  router.get('/dashboard', (req, res) => BikeController.dashboard(req, res))
  router.post('/bike', (req, res) => BikeController.bike(req, res, io))
  // rank
  router.get('/rank', RankController)

  return router
}
module.exports = routes
