// require packeges
const express = require ('express')
const app = express()
const exphbs = require('express-handlebars') 

// define variables
const port = 3000

// set templete engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
// 這句是一定要的，但我不知道它的作用到底是甚麼。單看doc的話感覺有點像是在define。
app.set('view engine', 'handlebars')

// set static files 
app.use(express.static('public'))

// set routing 
app.get('/', (req ,res) => {
  res.render('index')
})

// listen on server 
app.listen(port,() => {
  console.log(`listen on port: ${port}`)  
})

