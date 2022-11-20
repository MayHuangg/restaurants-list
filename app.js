// require express
const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

// require method-override 
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// require routes 
const routes = require('./routes')
app.use(routes)

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
const Restaurant = require('./models/restaurants')

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
// app.get('/', (req, res) => {
//   return Restaurant.find()
//   .lean()
//   .then(restaurants => res.render('index', { restaurants }))
//   .catch(error => {console.log(error)})
// })



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




