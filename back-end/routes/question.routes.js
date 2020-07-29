const express = require('express');
const questionRoutes = express.Router();

let { Question } = require('../models');
const authMiddleware = require('../middlewares/auth');

let questionsController = require('../controllers/questions.controller');

//! Get all
questionRoutes.get('/', questionsController.getAll);

//!Get by id
questionRoutes.get('/:id', questionsController.getById);

//! Create 
questionRoutes.post('/add', authMiddleware, questionsController.create);
//!Update 
questionRoutes.post('/update/:id', authMiddleware, questionsController.update);
//! Delete 
questionRoutes.delete('/:id', authMiddleware, questionsController.remove);

module.exports = questionRoutes;