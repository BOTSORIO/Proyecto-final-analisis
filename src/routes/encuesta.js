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
const { isLoggedIn } = require('../lib/auth');

/*
* Enrutador que carga la vista de la encuesta de satisfacción
* de la aplicación
*/
router.get('/encuesta', isLoggedIn, (req, res) => {
    res.render('preguntas/encuesta')
});

/*
* Enrutador que almacena los datos de la encuesta de satisfacción del usuario
* en la base de datos de la aplicación
*/
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