const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Si no esta logueado


router.get('/encuesta', isLoggedIn, (req, res) => {
    res.render('preguntas/encuesta')
});

router.post('/encuesta', isLoggedIn, async (req, res) => {
    
    const { questionOne, questionTwo, questionThree} = req.body;

    const newEncuesta ={
        pregunta1:questionOne,
        pregunta2:questionTwo,
        pregunta3:questionThree,
        id_usuario: req.user.id
    };

    await pool.query('INSERT INTO encuesta set ?', [newEncuesta]);

    res.redirect('/profileUser');
});

module.exports = router;