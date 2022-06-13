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
* Enrutador que carga la vista del perfil del administrador de la aplicación
* con todas las estadisticas de los usuarios que participaron en el test que
* extrae de la base de datos
*/
router.get('/profileAdmin', isLoggedIn, async (req,res) => {

    let prom1 = await pool.query('SELECT TRUNCATE(AVG(pregunta1),1) prom1 FROM respuestas_test');
    let prom2 = await pool.query('SELECT TRUNCATE(AVG(pregunta2),1) prom2 FROM respuestas_test');
    let prom3 = await pool.query('SELECT TRUNCATE(AVG(pregunta3),1) prom3 FROM respuestas_test');
    let prom4 = await pool.query('SELECT TRUNCATE(AVG(pregunta4),1) prom4 FROM respuestas_test');
    let prom5 = await pool.query('SELECT TRUNCATE(AVG(pregunta5),1) prom5 FROM respuestas_test');

    const promedios = {
        promedio1:prom1[0].prom1,
        promedio2:prom2[0].prom2,
        promedio3:prom3[0].prom3,
        promedio4:prom4[0].prom4,
        promedio5:prom5[0].prom5
    }

    let resCorrect1= await pool.query('select count(pregunta1) res1 from respuestas_test where pregunta1>0');
    let resCorrect2= await pool.query('select count(pregunta2) res2 from respuestas_test where pregunta2>0');
    let resCorrect3= await pool.query('select count(pregunta3) res3 from respuestas_test where pregunta3>0');
    let resCorrect4= await pool.query('select count(pregunta4) res4 from respuestas_test where pregunta4>0');
    let resCorrect5= await pool.query('select count(pregunta5) res5 from respuestas_test where pregunta5>0');

    const respuestasCorrect = {
        respuesta1: resCorrect1[0].res1,
        respuesta2: resCorrect2[0].res2,
        respuesta3: resCorrect3[0].res3,
        respuesta4: resCorrect4[0].res4,
        respuesta5: resCorrect5[0].res5
    }

    let resIncorrect1= await pool.query('select count(pregunta1) inc1 from respuestas_test where pregunta1=0');
    let resIncorrect2= await pool.query('select count(pregunta2) inc2 from respuestas_test where pregunta2=0');
    let resIncorrect3= await pool.query('select count(pregunta3) inc3 from respuestas_test where pregunta3=0');
    let resIncorrect4= await pool.query('select count(pregunta4) inc4 from respuestas_test where pregunta4=0');
    let resIncorrect5= await pool.query('select count(pregunta5) inc5 from respuestas_test where pregunta5=0');

    const incorrect = {
        incorrecta1: resIncorrect1[0].inc1,
        incorrecta2: resIncorrect2[0].inc2,
        incorrecta3: resIncorrect3[0].inc3,
        incorrecta4: resIncorrect4[0].inc4,
        incorrecta5: resIncorrect5[0].inc5
    }

    let promE1 = await pool.query('SELECT TRUNCATE(AVG(pregunta1),1) promE1 FROM encuesta');
    let promE2 = await pool.query('SELECT TRUNCATE(AVG(pregunta2),1) promE2 FROM encuesta');
    let promE3 = await pool.query('SELECT TRUNCATE(AVG(pregunta3),1) promE3 FROM encuesta');

    const promediosEncuestas = {
        promedioE1:promE1[0].promE1,
        promedioE2:promE2[0].promE2,
        promedioE3:promE3[0].promE3,
    }

    const users = await pool.query('select * from usuario u left join respuestas_test rt on u.id = rt.id_usuario where not administrador=true order by rt.nota desc');

   res.render('profileAdmin',{promedios:promedios,respuestasCorrect:respuestasCorrect, incorrect:incorrect, promediosEncuestas:promediosEncuestas, users:users});
});


module.exports = router;