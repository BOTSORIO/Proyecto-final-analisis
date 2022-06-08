const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Si no esta logueado

router.get('/questionTwo', isLoggedIn, (req, res) => {
    res.render('preguntas/questionTwo')
});

router.post('/answerTwo', isLoggedIn, async (req, res) => {

    const {answer} = req.body;
    let respuesta = 0;
    let id = req.user.id;

    if(answer=="aprobado"){

        respuesta=5;
    }

    const answer2 = {
        pregunta2: respuesta
    };

    //Se insertan los datos en la BD, await es para procesar esta peticion al tiempo
    //debido a que se hace de manera asincrona
    await pool.query('UPDATE respuestas_test set ? WHERE id_usuario = ?', [answer2, id]);
    res.redirect('/test/questionThree');
});

module.exports = router;