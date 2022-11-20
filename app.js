// require express
const express = require('express')
const app = express()

// 需要它和db連接 
require('./config/mongoose')

// 需要它處理req 
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// 需要它讓client可以使用put、delete 
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// require routes 
const routes = require('./routes')
app.use(routes)

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

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword.toLowerCase()
//   Restaurant.find()
//   .lean()
//   .then(restaurants => {
//     const filterData = restaurants.filter(result => {
//     return result.name.toLowerCase().includes(keyword) || result.category.toLowerCase().includes(keyword)
//     })
//     res.render('index', { restaurants: filterData, keyword })
//   })
//   .catch(err => console.log(err))
// })




