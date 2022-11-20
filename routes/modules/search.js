const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurants')

router.get('/', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  Restaurant.find()
  .lean()
  .then(restaurants => {
    const filterData = restaurants.filter(result => {
    return result.name.toLowerCase().includes(keyword) || result.category.toLowerCase().includes(keyword)
    })
    res.render('index', { restaurants: filterData, keyword })
  })
  .catch(err => console.log(err))
})

module.exports = router