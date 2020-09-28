///////////DEPENDENCIES//////////
const express = require('express')
const router = express.Router()
const User = require('../models/users.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

/////Auth Middleware

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) {
            return res.status(401).json({msg: 'No token'})
        }
        token = token.split(' ')[1]
        const verified = jwt.verify(token, process.env.jwtSECRET)
        if (!verified) {
            return res.status(401).json({msg: 'Not verified'})
        }s
        req.user = verified
        next();
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

///////////ROUTES///////////

/////Create Route:

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({msg: 'Invalid username or password'})
        }
        const isUser = await User.findOne({username: username})
        if (isUser) {
            return res.status(400).json({msg: 'Username is taken'})
        }
        const salt = await bcrypt.genSalt()
        const passHash = await bcrypt.hash(password, salt)
        const newUser = new User ({
            username,
            password: passHash
        })
        const savedUser = await newUser.save()
        res.json(savedUser)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
})

/////Login Route:

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({msg: 'Invalid username or password'})
        }
        const user = await User.findOne({username: username})
        if (!user)
            return res.status(400).json({msg: 'Username not found'})
        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(400).json({msg: 'Incorrect password'})
        const token = jwt.sign({id: user._id, username: user.username}, process.env.jwtSECRET)
        res.json({
            token
        })
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
})

/////Delete Route:

router.delete('/delete', auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user)
        res.json(deletedUser)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
})
    
router.post('/validToken', async (req, res) => {   
    try {
        const token = req.header('x-auth-token')
        if (!token) return res.json(false)
        const verified = jwt.verify(token, process.env.jwtSECRET)
        if (!verified) return res.json(false)
        const user = await User.findById(verified.id)
        if (!user) return res.json(false)
        return res.json(true)
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user)
    res.json({
        username: user.username,
        id: user._id
    })
})

/////Update Route:

router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body
        )
        res.status(200).json(updatedUser)
    }
    catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router