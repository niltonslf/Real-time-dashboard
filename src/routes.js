const express = require('express')
const BikeController = require('./controllers/BikeController')

const router = express.Router()

router.get('/', BikeController.index)
router.post('/bike', BikeController.bike)

module.exports = router
