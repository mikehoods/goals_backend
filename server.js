//////////DEPENDENCIES//////////
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

//////////GLOBALS//////////

const PORT = process.env.PORT || 4000
const goalsController = require('./controllers/goals.js')
const usersController = require('./controllers/users.js')
const db = mongoose.connection
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017'

//allow cross-origin requests
app.use(cors())

//////////DATABASE CONNECT//////////

mongoose.connect(DB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
db.on('open', ()=> {
    console.log('Totally connected to Mongo.')
})

//////////MIDDLEWARE//////////

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/goals/', goalsController)
app.use('/users/', usersController)

//////////LISTENER//////////
app.listen(PORT, ()=> {
    console.log(`Thank you for listening to Port: ${PORT}`)
})