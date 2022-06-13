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
const { application, response } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

/*
* Función que obtiene todos los datos necesarios para mostrar las
* estadisticas del test en el perfil del usuario
*/
async function obtenerEstadisticas(id_usuario){

    let pregunta1 = await pool.query('select pregunta1 res1 from respuestas_test where id_usuario = ?', [id_usuario]);
    let pregunta2 = await pool.query('select pregunta2 res2 from respuestas_test where id_usuario = ?', [id_usuario]);
    let pregunta3 = await pool.query('select pregunta3 res3 from respuestas_test where id_usuario = ?', [id_usuario]);
    let pregunta4 = await pool.query('select pregunta4 res4 from respuestas_test where id_usuario = ?', [id_usuario]);
    let pregunta5 = await pool.query('select pregunta5 res5 from respuestas_test where id_usuario = ?', [id_usuario]);

    const respuestas = {
        respuesta1:pregunta1[0].res1,
        respuesta2:pregunta2[0].res2,
        respuesta3:pregunta3[0].res3,
        respuesta4:pregunta4[0].res4,
        respuesta5:pregunta5[0].res5
    }

    let can1 = await pool.query('select count(*) cant1 from respuestas_test where id_usuario= ? and pregunta1>0', [id_usuario]);
    let can2 = await pool.query('select count(*) cant2 from respuestas_test where id_usuario= ? and pregunta2>0', [id_usuario]);
    let can3 = await pool.query('select count(*) cant3 from respuestas_test where id_usuario= ? and pregunta3>0', [id_usuario]);
    let can4 = await pool.query('select count(*) cant4 from respuestas_test where id_usuario= ? and pregunta4>0', [id_usuario]);
    let can5 = await pool.query('select count(*) cant5 from respuestas_test where id_usuario= ? and pregunta5>0', [id_usuario]);

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

    let nota = await pool.query('select nota nota from respuestas_test where id_usuario = ?', [id_usuario]);
    
    const totales = {
        correctas: correctas,
        incorrectas: incorrectas,
        nota: nota[0].nota
    }

    let estadisticas=[respuestas,totales];

    return estadisticas;
}

/*
* Enrutador que carga la vista del perfil de usuario con los
* resutados obtenidos en el test
*/
router.get('/profileUser', isLoggedIn, async (req,res) => {
    
    let id = req.user.id;
    
    obtenerEstadisticas(id).then(resultados=>
    
        res.render('profileUser', {respuestas:resultados[0],totales:resultados[1]})
    );

});

/*
* Enrutador que obtiene el coeficiente de correlación entre los resultados de
* cualquier pregunta del test y cualquier pregunta de la encuesta de satisfacción.
*/
router.post('/profileUser', isLoggedIn, async (req, res) => {

    const { preguntaTest, preguntaEncuesta } = req.body;

    let datos = await pool.query('select rt.pregunta'+preguntaTest+' preguntaTest,en.pregunta'+preguntaEncuesta+' preguntaEncuesta from respuestas_test rt join encuesta en on rt.id_usuario=en.id_usuario');
    let promediox = await pool.query('select truncate(avg(pregunta'+preguntaTest+'),2) promedio from respuestas_test');
    let promedioy = await pool.query('select truncate(avg(pregunta'+preguntaEncuesta+'),2) promedio from encuesta');
    let sumatoriaNumerador=0;
    let sumatoriaDenominador1=0;
    let sumatoriaDenominador2=0;
    let coeficiente;
    var arr = Array.from(datos);

    for(let i=0;i<arr.length;i++){

        sumatoriaNumerador=sumatoriaNumerador+((datos[i].preguntaTest-promediox[0].promedio)*(datos[i].preguntaEncuesta-promedioy[0].promedio));
        sumatoriaDenominador1=sumatoriaDenominador1+Math.pow((datos[i].preguntaTest-promediox[0].promedio),2);
        sumatoriaDenominador2=sumatoriaDenominador2+Math.pow((datos[i].preguntaEncuesta-promedioy[0].promedio),2);
    }

    if(sumatoriaDenominador1!=0 && sumatoriaDenominador2!=0){
        
        coeficiente=sumatoriaNumerador/((Math.sqrt(sumatoriaDenominador1))*(Math.sqrt(sumatoriaDenominador2)));
        coeficiente=coeficiente.toFixed(2);
    }else{
        coeficiente='0';
    }

    obtenerEstadisticas(req.user.id).then(resultados=>
    
        res.render('profileUser', {respuestas:resultados[0],totales:resultados[1], coeficiente})
    );
});


module.exports = router;