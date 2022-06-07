const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Si no esta logueado


router.get('/encuesta', isLoggedIn, (req, res) => {
    res.render('preguntas/encuesta')
});

router.post('/encuesta', isLoggedIn, async (req, res) => {
    const { questionOne, questionTwo, questionThree} =req.body;
    const newEncuesta ={
        pregunta1:questionOne,
        pregunta2:questionTwo,
        pregunta3:questionThree,
        user_id: req.user.id
    };

    let id = req.user.id;

    await pool.query('INSERT INTO encuesta set ? WHERE id = ?', [newEncuesta,id]);

    res.redirect('/general');
});

module.exports = router;