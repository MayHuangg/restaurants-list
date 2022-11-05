// require express
const express = require ('express')
const app = express()

// set templete engine 
const exphbs = require('express-handlebars') 
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
// 這句是一定要的，但我不知道它的作用到底是甚麼。單看doc的話感覺有點像是在define。
app.set('view engine', 'handlebars')

// define variables
const port = 3000
const data = require('./restaurant-data.json')

// set static files 
app.use(express.static('public'))

// set routing 
app.get('/restaurants', (req ,res) => {
  res.render('index',{restaurants: data.results})
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = data.results.find(result => {
    return result.id.toString() === req.params.id
  })  
  res.render('show',{restaurant: restaurant})
})

// listen on server 
app.listen(port,() => {
  console.log(`listen on port: ${port}`)  
})

