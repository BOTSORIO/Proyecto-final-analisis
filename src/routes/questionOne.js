const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Si no esta logueado


router.get('/questionOne', isLoggedIn, (req, res) => {
    res.render('preguntas/questionOne')
});

router.post('/answerOne', isLoggedIn, async (req, res) => {

    const {answer} = req.body;
    let respuesta = 0;

    if(answer=="aprobado"){

        respuesta=5;
    }

    const answer1 = {
        pregunta1: respuesta,
        id_usuario: req.user.id
    };

    //Se insertan los datos en la BD, await es para procesar esta peticion al tiempo
    //debido a que se hace de manera asincrona
    await pool.query('INSERT INTO respuestas_test set ?', [answer1]);
    //req.flash('success', 'Link guardado exitosamente');
    res.redirect('/test/questionTwo');
});

module.exports = router;