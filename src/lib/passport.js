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
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');

/*
* Función de la librería passport que comprueba las credenciales
* ingresadas por el usuario para iniciar sesión en la aplicación
*/
passport.use('local.signin', new LocalStrategy({
    usernameField: 'fullname',
    passwordField: 'document',
    passReqToCallback: true
}, async (req,fullname,document,done) => {

    const rows = await pool.query('SELECT * FROM usuario WHERE fullname = ?', [fullname]);
    if(rows.length > 0) {
        const user = rows[0];

        if(user.document == document){
            done(null,user,req.flash('success','Bienvenido ' + user.fullname)); 
        }else{
            done(null,false,req.flash('message','El documento ingresado no es correcto'));       
        }
    }else{
        return done(null,false,req.flash('message','El usuario no existe'));
    }
}));

/*
* Función de la librería passport que registra las credenciales
* del usuario en la base de datos de la aplicación
*/
passport.use('local.signup', new LocalStrategy({
    usernameField: 'fullname',
    passwordField: 'document',
    passReqToCallback:true
}, async (req,fullname,document,done) => {
    const newUser = {
        fullname,
        document,
        administrador: false
    };
    
    const result = await pool.query('INSERT INTO usuario SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null,newUser);
}));

/*
* Función de la librería passport que serializa el objeto del usuario
* para ser usado en la aplicación
*/
passport.serializeUser((user,done) => {
  done(null,user.id);
});

/*
* Función de la librería passport que deserializa el objeto del usuario
* para ser usado en la aplicación
*/
passport.deserializeUser( async (id,done) =>{
    const rows = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
    done(null,rows[0]);
});
