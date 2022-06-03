const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Si no esta logueado
const { isNotLoggedIn } = require('../lib/auth');

router.get('/questionFive', isLoggedIn, (req, res) => {
    res.render('preguntas/questionFive')
});

router.post('/answerFive', isLoggedIn, async (req, res) => {

    const {answer} = req.body;
    let respuesta = false;
    let id = req.user.id;

    if(answer=="aprobado"){

        respuesta=true;
    }

    const answer5 = {
        pregunta5: respuesta
    };

    //Se insertan los datos en la BD, await es para procesar esta peticion al tiempo
    //debido a que se hace de manera asincrona
    await pool.query('UPDATE respuestas_test set ? WHERE id = ?', [answer5, id]);
    //req.flash('success', 'Link guardado exitosamente');
    res.redirect('/test/questionFive');
});

module.exports = router;