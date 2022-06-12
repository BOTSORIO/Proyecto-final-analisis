const { application } = require('express');
const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Si no esta logueado


router.get('/profileUser', isLoggedIn, async (req,res) => {

    res.render('profileUser');
});

router.post('/profileUser', isLoggedIn, async (req, res) => {

    const { preguntaTest, preguntaEncuesta } = req.body;

    let datos = await pool.query('select rt.pregunta'+preguntaTest+' preguntaTest,en.pregunta'+preguntaEncuesta+' preguntaEncuesta from respuestas_test rt join encuesta en on rt.id_usuario=en.id_usuario');
    let promediox = await pool.query('select truncate(avg(pregunta'+preguntaTest+'),2) promedio from respuestas_test');
    let promedioy = await pool.query('select truncate(avg(pregunta'+preguntaEncuesta+'),2) promedio from encuesta');
    let sumatoriaNumerador=0;
    let sumatoriaDenominador1=0;
    let sumatoriaDenominador2=0;
    var arr = Array.from(datos);

    for(let i=0;i<arr.length;i++){

        sumatoriaNumerador=sumatoriaNumerador+((datos[i].preguntaTest-promediox[0].promedio)*(datos[i].preguntaEncuesta-promedioy[0].promedio));
        sumatoriaDenominador1=sumatoriaDenominador1+Math.pow((datos[i].preguntaTest-promediox[0].promedio),2);
        sumatoriaDenominador2=sumatoriaDenominador2+Math.pow((datos[i].preguntaEncuesta-promedioy[0].promedio),2);
    }

    let coeficiente=sumatoriaNumerador/(Math.sqrt(sumatoriaDenominador1)*Math.sqrt(sumatoriaDenominador2));
    coeficiente=coeficiente.toFixed(2);

    res.render('profileUser', {coeficiente});
});


module.exports = router;