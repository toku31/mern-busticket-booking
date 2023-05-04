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

app.listen(port, ()=> console.log(`Node server listening on port ${port}!`));
// app.get('/', (req, res) => res.send('Hello World'))