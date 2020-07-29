const mongoose = require('mongoose');

let { Question } = require('../models');


const getAll = (req, res) => {
    Question.find((err, questions) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(questions);
        }
    });
};
const getById = (req, res) => {
    let id = req.params.id;
    Question.findById((id), (err, question) => {
        if (err) throw err;
        res.json(question);
    });
};

const create = (req, res) => {
    // let question = new Question(req.body);
    // question.save()
    Question.create(req.body)
        .then(question => {
            res.status(200).json({ question: 'question added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new question failed');
        });
};

const update = (req, res) => {
    Question.findById(req.params.id, (err, question) => {
        if (!question) {
            res.status(404).send('data is not found');
        } else {
            question.question = req.body.question;
            question.answers = req.body.answers;
            question.correct_answers = req.body.correct_answers;
            question.save()
                .then(question => {
                    res.json('Question updated');
                })
                .catch(err => {
                    res.status(400).send('Update failed');
                })
        }
    })
};

const remove = (req, res) => {
    let id = req.params.id;
    Question.findByIdAndDelete((id), (err, question) => {
        if (err) throw err;
        res.json('question deleted');
    });
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};