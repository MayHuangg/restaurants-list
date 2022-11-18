// require express
const express = require('express')
const app = express()

// require dontenv 
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// connect to db 
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', ()=> {
  console.log('mongodb error')
})
db.once('open', ()=>{
  console.log('mongodb connect')
})

// require restaurant data 
const Restaurant = require('./models/restaurant')

// set templete engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// define variables
const port = 3000

// listen on server
app.listen(port, () => {
  console.log(`listen on port: ${port}`)
})

// set static files
app.use(express.static('public'))

// set routing for index page
app.get('/', (req, res) => {
  return Restaurant.find()
  .lean()
  .then(restaurants => res.render('index', { restaurants }))
  .catch(error => {console.log(error)})
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .lean()
  .then(restaurant => res.render('show', { restaurant }))
  .catch(error => {console.log(error)})
})

app.get('/search', (req, res) => {
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

// set routing for create 
app.get('/new', (req, res) => {
  res.render('new')
})

// set routing for catching data
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description})
  .then(() => { res.redirect('/') })
  .catch(error => console.log(error))
})