const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Si no esta logueado
const { isNotLoggedIn } = require('../lib/auth');

router.get('/questionTwo', isLoggedIn, (req, res) => {
    res.render('preguntas/questionTwo')
});

module.exports = router;