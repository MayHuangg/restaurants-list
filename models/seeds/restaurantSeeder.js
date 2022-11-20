// const mongoose = require('mongoose')
const Restaurant = require('../restaurants')
const data = require('../../restaurant-data.json')
const dotenv = require('dotenv')
dotenv.config({path:'../../.env'})
const db = require('../../config/mongoose')

db.once('open', () => {
  const restaurantData = data.results
  for(let i = 0; i < restaurantData.length; i++) {
    Restaurant.create({
      name: restaurantData[i].name,
      name_en: restaurantData[i].name_en,
      category: restaurantData[i].category,
      image: restaurantData[i].image,
      location: restaurantData[i].location,
      phone: restaurantData[i].phone,
      google_map: restaurantData[i].google_map,
      rating: restaurantData[i].rating,
      description: restaurantData[i].description
    })
  }
})
