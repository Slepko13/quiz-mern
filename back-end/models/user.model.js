const { Schema, model, Types } = require('mongoose');

let userSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    questions: [{
        type: Types.ObjectId,
        ref: 'question'
    }]
});

module.exports = model('user', userSchema); 