// const mongoose = require('mongoose')
const Restaurant = require('../restaurants')
const data = require('../../restaurant-data.json')
const dotenv = require('dotenv')
dotenv.config({path:'../../.env'})
const db = require('../../config/mongoose')

db.once('open', () => {
  const restaurantData = data.results
  Restaurant.insertMany(restaurantData)
})
