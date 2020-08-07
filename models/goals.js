const {Schema, model} = require ('mongoose')

const goalSchema = new Schema({
    name: String,
    description: String,
    category: String,
    difficulty: Number,
    importance: Number,
    progress: Number,
    complete: Boolean,
    finishBy: Date,
    notes: String
}, {timestamps: true}
)

const Goal = model('Goal', goalSchema)

module.exports = Goal