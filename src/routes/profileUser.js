const { application } = require('express');
const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


router.get('/profileUser', isLoggedIn, async (req,res) => {
    
    let id = req.user.id;
    let pregunta1 = await pool.query('select pregunta1 res1 from respuestas_test where id_usuario = ?', [id]);
    let pregunta2 = await pool.query('select pregunta2 res2 from respuestas_test where id_usuario = ?', [id]);
    let pregunta3 = await pool.query('select pregunta3 res3 from respuestas_test where id_usuario = ?', [id]);
    let pregunta4 = await pool.query('select pregunta4 res4 from respuestas_test where id_usuario = ?', [id]);
    let pregunta5 = await pool.query('select pregunta5 res5 from respuestas_test where id_usuario = ?', [id]);

    const respuestas = {
        respuesta1:pregunta1[0].res1,
        respuesta2:pregunta2[0].res2,
        respuesta3:pregunta3[0].res3,
        respuesta4:pregunta4[0].res4,
        respuesta5:pregunta5[0].res5
    }

    let can1 = await pool.query('select count(*) cant1 from respuestas_test where id_usuario= ? and pregunta1>0', [id]);
    let can2 = await pool.query('select count(*) cant2 from respuestas_test where id_usuario= ? and pregunta2>0', [id]);
    let can3 = await pool.query('select count(*) cant3 from respuestas_test where id_usuario= ? and pregunta3>0', [id]);
    let can4 = await pool.query('select count(*) cant4 from respuestas_test where id_usuario= ? and pregunta4>0', [id]);
    let can5 = await pool.query('select count(*) cant5 from respuestas_test where id_usuario= ? and pregunta5>0', [id]);

    let total = [can1[0].cant1,can2[0].cant2,can3[0].cant3,can4[0].cant4,can5[0].cant5];
    
    let correctas = 0;
    let incorrectas = 0;

    for (let i = 0; i < total.length; i++) {
        if(total[i] == 1){
            correctas += 1;
        }else{
            incorrectas += 1;
        }
    }

    let nota = await pool.query('select nota nota from respuestas_test where id_usuario = ?', [id]);
    
    const totales = {
        correctas: correctas,
        incorrectas: incorrectas,
        nota: nota[0].nota
    }

    res.render('profileUser', {respuestas:respuestas,totales:totales});
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