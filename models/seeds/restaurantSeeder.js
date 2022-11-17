const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const data = require('../../restaurant-data.json')

mongoose.connect('mongodb+srv://alpha:camp@cluster0.spwrmxz.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})

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