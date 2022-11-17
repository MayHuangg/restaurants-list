// require express
const express = require('express')
const app = express()

// require dontenv 
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// set templete engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// define variables
const port = 3000
const data = require('./restaurant-data.json')

// set static files
app.use(express.static('public'))

// set routing
app.get('/', (req, res) => {
  res.render('index', { restaurants: data.results })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = data.results.find(result => {
    return result.id.toString() === req.params.id
  })
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const results = data.results.filter(result => {
    return result.name.toLowerCase().includes(req.query.keyword.toLowerCase()) || result.category.toLowerCase().includes(req.query.keyword.toLowerCase())
  })

  res.render('index', { restaurants: results, keyword })
})

// listen on server
app.listen(port, () => {
  console.log(`listen on port: ${port}`)
})

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