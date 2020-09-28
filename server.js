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
const MONGODB_URI = process.env.DB_URI

//allow cross-origin requests
// app.use(cors({
//     origin: 'https://react-goal-tracker.herokuapp.com/'
// }))

//allow cross-origin requests
app.use(cors());

//connect to mlab (Atlas) database
mongoose.connect('mongodb+srv://PlantManATX:plants@cluster0.emvle.mongodb.net/goalsDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true }
)
.then(()=> console.log('Connected to MongoDB Atlas'))
.catch(err => console.log('Error: ', err.message));

//////////DATABASE CONNECT//////////

// mongoose.connect(MONGODB_URI, {
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// })
// db.on('open', ()=> {
//     console.log('Totally connected to Mongo.')
// })

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