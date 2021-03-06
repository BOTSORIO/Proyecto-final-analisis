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
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const { database } = require('./keys');

/*
* Inicializaciones para la ejecución del servidor
*/
const app = express();
require('./lib/passport');

/*
* Configuraciones del servidor
*/
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout : 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

/*
* Middlewares usados para el servidor
*/
app.use(session({
    secret: 'testsession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

/*
* Variables globales usadas en el servidor
*/
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next(); //Para continuar con el resto del codigo

});

/*
* Rutas (URLs del servidor)
*/
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use(require('./routes/profileAdmin'));
app.use(require('./routes/profileUser'));
app.use('/test', require('./routes/questionOne'));
app.use('/test', require('./routes/questionTwo'));
app.use('/test', require('./routes/questionThree'));
app.use('/test', require('./routes/questionFour'));
app.use('/test', require('./routes/questionFive'));
app.use('/test', require('./routes/encuesta'));

/*
* Ruta de la carpeta public que usará la aplicación
*/
app.use(express.static(path.join(__dirname, 'public')));

/*
* Ejecución del servidor
*/
app.listen(app.get('port'), ()=>{
    console.log('Server ejecutandose en el puerto', app.get('port'));
});