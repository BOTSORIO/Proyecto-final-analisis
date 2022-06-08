const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Si no esta logueado


router.get('/questionFive', isLoggedIn, (req, res) => {
    res.render('preguntas/questionFive')
});

router.post('/answerFive', isLoggedIn, async (req, res) => {

    const {answer} = req.body;
    let respuesta = 0;
    let id = req.user.id;

    if(answer=="aprobado"){

        respuesta=5;
    }

    const answer5 = {
        pregunta5: respuesta
    };

    //Se insertan los datos en la BD, await es para procesar esta peticion al tiempo
    //debido a que se hace de manera asincrona
    await pool.query('UPDATE respuestas_test set ? WHERE id_usuario = ?', [answer5, id]);
    res.redirect('/test/encuesta');
});

module.exports = router;