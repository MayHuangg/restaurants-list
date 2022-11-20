const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurants')

//1.Create 
// get into new page 
router.get('/new', (req, res) => {
  res.render('new')
})

// pass data into db 
router.post('/', (req,res) => {
  const {name, name_en, category, image, location, phone, google_map, rating, description} = req.body

  return Restaurant.create({name, name_en, category, image, location, phone, google_map, rating, description})
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

// 2.Read 
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
  .catch(error => {console.log(error)})
})

// 3.Update
// get into edit page 
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then(restaurant => res.render('edit', { restaurant }))
  .catch(error => console.log(error))
})

// pass data into db 
router.put('/:id', (req, res) => {
  const id = req.params.id 
  const {name, name_en, category, image, location, phone, google_map, rating, description} = req.body

  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 4.Delete 
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
