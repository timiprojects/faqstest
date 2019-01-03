const mongoose = require('mongoose')

const questions = new mongoose.Schema({
    qid: {
        type: String
    },
    question: {
        type: String
    },
    clicks: {
        type: Number
    },
    opens: {
        type: Number
    },
    closes: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
})
mongoose.model('Questions', questions)

var school = new mongoose.Schema({
    name: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    questions: [questions]
})

var School = mongoose.model('School', school)

module.exports = School