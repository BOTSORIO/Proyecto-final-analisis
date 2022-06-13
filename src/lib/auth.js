/*
* Proyecto final de la asignatura Analisis de algoritmos
* Elaborado por:
* Braian Camilo Piedrahita Rodriguez
* Sebastian Quintero Osorio
* Melissa Ortiz Perez
*/

/*
* Modulo que exporta las funciones que comprueban la sesión del
* usuario en la aplicación
*/
module.exports = {
    isLoggedIn(req,res,next) {
        if(req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    },

    isNotLoggedIn(req,res,next) {
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/general');
    }
};