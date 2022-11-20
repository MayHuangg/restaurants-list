const express = require('express')
const router = express.Router()

// routing for index page 
const home = require('./modules/home')
router.use('/', home)

// routing for CRUD 
const restaurants = require('./modules/restaurants')
router.use('/restaurants', restaurants)

module.exports = router