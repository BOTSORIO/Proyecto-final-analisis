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
* Enrutador que carga la vista de la pregunta 3 del test
*/
router.get('/questionThree', isLoggedIn, (req, res) => {
    res.render('preguntas/questionThree')
});

/*
* Enrutador que guarda el resultado de la pregunta 3 del test
* en la base de datos
*/
router.post('/answerThree', isLoggedIn, async (req, res) => {

    const {answer} = req.body;
    let respuesta = 0;
    let id = req.user.id;

    if(answer=="aprobado"){

        respuesta=5;
    }

    const answer3 = {
        pregunta3: respuesta
    };

    //Se insertan los datos en la BD, await es para procesar esta peticion al tiempo
    //debido a que se hace de manera asincrona
    await pool.query('UPDATE respuestas_test set ? WHERE id_usuario = ?', [answer3, id]);
    res.redirect('/test/questionFour');
});

module.exports = router;