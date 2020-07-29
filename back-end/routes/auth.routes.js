const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const authController = require('../controllers/auth.controller');


router.post('/register',
    [
        check('email', 'Некоректна е-пошта').isEmail(),
        check('password', 'мінімальний пароль 6 символів')
            .isLength({ min: 6 })
    ],
    authController.register

)

router.post('/login',
    [
        check('email', 'Введіть корректну е-пошту').normalizeEmail().isEmail(),
        check('password', 'Ведіть пароль').exists()
    ],
    authController.login

);

module.exports = router;