const {Schema, model} = require ('mongoose')

const goalSchema = new Schema({
    name: String,
    category: String,
    difficulty: String,
    importance: String,
    progress: Number,
    complete: Boolean,
    steps: [String]
}, {timestamps: true}
)

const Goal = model('Goal', goalSchema)

module.exports = Goal