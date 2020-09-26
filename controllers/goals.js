///////////DEPENDENCIES//////////

const express = require('express')
const router = express.Router()
const Goal = require('../models/goals.js')

///////////ROUTES///////////

/////Create Route:

router.post('/', async (req, res) => {
    try {
        console.log(req)
        const newGoal = Goal.create(req.body.goal)
        res.status(200).json(newGoal)
    } catch(error) {
        res.status(400).json(error)
    }
})

/////Read Route:

router.get('/', async (req, res) => {
    try {
        const goals = Goal.find({}, (errors, goals) => {
            res.status(200).json(goals)
        })
        return goals
    } catch(error) {
        res.status(400).json(error)
    }
})

/////Show Route:

router.get('/:id', async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id)
        res.status(200).json(goal)
    } catch(error) {
        res.status(400).json(error)
    }
})

/////Delete Route:

router.delete('/:id', async (req, res) => {
    try {
        const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedGoal)
    } catch(error) {
        res.status(400).json(error)
    }
})

/////Update Route:

router.put('/:id', async (req, res) => {
    try {
        // console.log(req.body)
        const updatedGoal = await Goal.findByIdAndUpdate(
            req.params.id,
            req.body
        )
        res.status(200).json(updatedGoal)
    } catch(error) {
        res.status(400).json(error)
    }
})

module.exports = router