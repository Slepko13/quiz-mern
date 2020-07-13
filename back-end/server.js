const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const questionRoutes = express.Router();


const app = express();
const PORT = process.env.PORT || 5000;

let Question = require('./question.model');

app.use(cors());
app.use(bodyParser.json());

async function start() {
    try {
        //? DB connection//////////////////////////////////////////////////////////
        await mongoose.connect(
            " mongodb+srv://fosfat:12345@cluster0-dlm3x.mongodb.net/MERNDB?retryWrites=true&w=majority", {//For MongoDB connection(cloud)
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Data base connected...');
        ///? Routes//////////////////////////////////////////////////////////////////

        //! Get all
        questionRoutes.get('/', (req, res) => {
            Question.find((err, questions) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(questions);
                }
            });
        });

        //!Get by id
        questionRoutes.route('/:id').get((req, res) => {
            let id = req.params.id;
            Question.findById((id), (err, question) => {
                if (err) throw err;
                res.json(question);
            });
        });
        //! Delete by id
        questionRoutes.route('/:id').delete((req, res) => {
            let id = req.params.id;
            Question.findByIdAndDelete((id), (err, question) => {
                if (err) throw err;
                res.json('question deleted');
            });
        });
        //! Add new 
        questionRoutes.route('/add').post((req, res) => {
            let question = new Question(req.body);
            question.save()
                .then(question => {
                    res.status(200).json({ question: 'question added successfully' });
                })
                .catch(err => {
                    res.status(400).send('adding new question failed');
                });
        });
        //!Update 
        questionRoutes.route('/update/:id').post((req, res) => {
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
        })
        //! Connect app with router
        app.use('/questions', questionRoutes);

        app.listen(PORT, () => console.log(`Server has been  started on port ${PORT}...`));//For server running
    } catch (e) {
        console.log('server error', e.message)
        process.exit(1)
    }
}
start();