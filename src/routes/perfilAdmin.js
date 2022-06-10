const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Si no esta logueado


router.get('/perfilAdmin', isLoggedIn, async (req,res) => {
    let prom1 = await pool.query('SELECT TRUNCATE(AVG(pregunta1),2) prom1 FROM respuestas_test');
    let prom2 = await pool.query('SELECT TRUNCATE(AVG(pregunta2),2) prom2 FROM respuestas_test');
    let prom3 = await pool.query('SELECT TRUNCATE(AVG(pregunta3),2) prom3 FROM respuestas_test');
    let prom4 = await pool.query('SELECT TRUNCATE(AVG(pregunta4),2) prom4 FROM respuestas_test');
    let prom5 = await pool.query('SELECT TRUNCATE(AVG(pregunta5),2) prom5 FROM respuestas_test');

    const promedios = {
        promedio1:prom1[0].prom1,
        promedio2:prom2[0].prom2,
        promedio3:prom3[0].prom3,
        promedio4:prom4[0].prom4,
        promedio5:prom5[0].prom5
    }

    let resCorrect1= await pool.query('select count(pregunta1) res1 from respuestas_test where pregunta1>0');
    let resCorrect2= await pool.query('select count(pregunta1) res2 from respuestas_test where pregunta1>0');
    let resCorrect3= await pool.query('select count(pregunta1) res3 from respuestas_test where pregunta1>0');
    let resCorrect4= await pool.query('select count(pregunta1) res4 from respuestas_test where pregunta1>0');
    let resCorrect5= await pool.query('select count(pregunta1) res5 from respuestas_test where pregunta1>0');

    const respuestasCorrect = {
        respuesta1: resCorrect1[0].res1,
        respuesta2: resCorrect2[0].res2,
        respuesta3: resCorrect3[0].res3,
        respuesta4: resCorrect4[0].res4,
        respuesta5: resCorrect5[0].res5
    }

   res.render('profileAdmin',{promedios:promedios,respuestasCorrect:respuestasCorrect});
});


module.exports = router;