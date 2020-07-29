const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

const questionRoutes = require('./routes/question.routes');
const authRoutes = require('./routes/auth.routes');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/questions', questionRoutes);
app.use('/auth', authRoutes)

module.exports = app;
