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
* Enrutador que carga la vista de la pregunta 1 del test
*/
router.get('/questionOne', isLoggedIn, (req, res) => {
    res.render('preguntas/questionOne')
});

/*
* Enrutador que crea el registro de las preguntas del usuario que participa
* en el test y lo guarda en la base de datos junto con el resultado de la pregunta 1
*/
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
    res.redirect('/test/questionTwo');
});

module.exports = router;