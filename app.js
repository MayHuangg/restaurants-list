// require packeges
const express = require ('express')
const app = express()

// define variables
const port = 3000

// set routing 
app.get('/', (req ,res) => {
  res.send('restaurants list')
})

// listen on server 
app.listen(port,() => {
  console.log(`listen on port: ${port}`)  
})

