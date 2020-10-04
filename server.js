//////////DEPENDENCIES//////////
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

require('dotenv').config()

//////////GLOBALS//////////

const PORT = process.env.PORT || 4000
const goalsController = require('./controllers/goals.js')
const MONGODB_URI = process.env.DB_URI

//allow cross-origin requests
// app.use(cors({
//     origin: 'https://react-goal-tracker.herokuapp.com/'
// }))

//allow cross-origin requests
app.use(cors());

//////////DATABASE CONNECT//////////
mongoose.connect('mongodb+srv://PlantManATX:plants@cluster0.emvle.mongodb.net/goalsDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true }
)
.then(()=> console.log('Connected to MongoDB Atlas'))
.catch(err => console.log('Error: ', err.message));

//////////MIDDLEWARE//////////

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/goals/', goalsController)

//////////LISTENER//////////
app.listen(PORT, ()=> {
    console.log(`Thank you for listening to Port: ${PORT}`)
})