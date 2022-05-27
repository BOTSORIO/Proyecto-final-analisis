const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Si no esta logueado
const { isNotLoggedIn } = require('../lib/auth');

router.get('/questionOne', isLoggedIn, (req, res) =>{
    res.render('preguntas/questionOne')
});

module.exports = router;