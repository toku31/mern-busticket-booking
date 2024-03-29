const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const dbConfig = require("./config/dbConfig");
app.use(express.json())

const usersRoute = require('./routes/usersRoute') 
const busesRoute = require('./routes/busesRoute') 
const bookingsRoute = require('./routes/bookingsRoute') 

app.use('/api/users/', usersRoute)  
app.use('/api/buses/', busesRoute) 
app.use('/api/bookings/', bookingsRoute) 

if (process.env.NODE_ENV === 'production'){
  app.use('/', express.static('client/build'))
  app.get('*', (req, res)=> {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
  })
} else {
  app.get('/', (req, res)=> {
    res.send('Please set to production')
  }) 
}

app.listen(port, ()=> console.log(`Node server listening on port ${port}!`));
// app.get('/', (req, res) => res.send('Hello World'))