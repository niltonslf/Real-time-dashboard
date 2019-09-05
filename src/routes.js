const express = require('express')
const HomeController = require('./controllers/HomeController')
const BikeController = require('./controllers/BikeController')
const RankController = require('./controllers/RankController')

const router = express.Router()

router.get('/', HomeController.index)

router.get('/dashboard', BikeController.dashboard)
router.post('/bike', BikeController.bike)

router.get('/rank', RankController.index)

module.exports = router
