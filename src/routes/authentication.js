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
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');
const { isNotLoggedIn } = require('../lib/auth');

/*
* Enrutador que carga la vista de registro en la aplicación
*/
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup')
});

/*
* Enrutador que registra al usuario en la aplicación
*/
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/signin',
    failureRedirect: '/signup',
    failureFlash: true
}));

/*
* Enrutador que carga la vista de inicio de sesión
*/
router.get('/signin', isNotLoggedIn, (req,res) => {
    res.render('auth/signin');
});

/*
* Enrutador que valida el inicio de sesión en la aplicacion
*/
router.post('/signin', isNotLoggedIn, (req,res,next) => {
    passport.authenticate('local.signin', {
        successRedirect: 'general',
        failureRedirect: '/signin',
        failureFlash: true
    })(req,res,next);
});

/*
* Enrutador que carga la vista general de la aplicación
*/
router.get('/general', (req, res) => {
    res.render('general')
});

/*
* Enrutador que cierra la sesión del usuario
*/
router.get('/logout', isLoggedIn , (req, res) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect('/');
      });
});

module.exports = router;