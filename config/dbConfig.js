const mongoose = require('mongoose')
const dotenv = require("dotenv").config()

// mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI)

const db= mongoose.connection

db.on('connected', ()=> console.log('Mongo DB Connection successful'))
db.on('error', err => console.log(err))