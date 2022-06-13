/*
* Proyecto final de la asignatura Analisis de algoritmos
* Elaborado por:
* Braian Camilo Piedrahita Rodriguez
* Sebastian Quintero Osorio
* Melissa Ortiz Perez
*/

/*
* Constantes usadas para la ejecucion de la aplicación
*/
const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Si no esta logueado

/*
* Enrutador que carga la vista de la pregunta 5 del test
*/
router.get('/questionFive', isLoggedIn, (req, res) => {
    res.render('preguntas/questionFive')
});

/*
* Enrutador que guarda el resultado de la pregunta 5 del test
* en la base de datos junto con la nota del test en general
*/
router.post('/answerFive', isLoggedIn, async (req, res) => {

    const {answer} = req.body;
    let respuesta = 0;
    let id = req.user.id;
    let registro = await pool.query('select * from respuestas_test WHERE id_usuario = ?', [id]);

    if(answer=="aprobado"){

        respuesta=5;
    }

    let nota = (registro[0].pregunta1+registro[0].pregunta2+registro[0].pregunta3+registro[0].pregunta4+respuesta)/5;

    const answer5 = {
        pregunta5: respuesta,
        nota
    };

    //Se insertan los datos en la BD, await es para procesar esta peticion al tiempo
    //debido a que se hace de manera asincrona
    await pool.query('UPDATE respuestas_test set ? WHERE id_usuario = ?', [answer5, id]);
    res.redirect('/test/encuesta');
});

module.exports = router;