const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const { jwtSecret } = require('../config/app');


let { User } = require('../models');


//! Registration
const register = async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некоректні дані при реєстрації"
            })
        }
        const { name, email, password } = req.body;
        const candidateName = await User.findOne({ name });
        const candidateEmail = await User.findOne({ email });
        if (candidateName) {
            return res.status(409).json({ message: "Таке ім'я уже існує" });
        }
        if (candidateEmail) {
            return res.status(409).json({ message: "Така скринька  уже існує" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "Реєстрація пройшла успішно" });

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
};

//! Login
const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Некоректні дані при вході"
            })
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Такий користувач відсутній' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Невірний пароль' })
        }

        const token = jwt.sign(
            {
                urerdId: user._id,
                userName: user.name
            },
            jwtSecret
        )
        res.status(200).json({ token: `Bearer ${token}`, message: "Авторизація пройшла успішно" });
    } catch (e) {
        res.status(500).json({ message: 'Логінізація не вдалася, спробуйте знову' })
    }
};

module.exports = {
    register,
    login
}