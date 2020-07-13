const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let QuestionSchema = new Schema({

    question: {
        type: String
    },
    answers: [String],
    correct_answers: [String]
});

module.exports = mongoose.model('question', QuestionSchema); 