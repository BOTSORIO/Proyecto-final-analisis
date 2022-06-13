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
const pool = require('../database');
const router = express.Router();

/*
* Enrutador que carga la vista inicial de la aplicación
*/
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;