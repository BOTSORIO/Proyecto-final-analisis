const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');

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

passport.serializeUser((user,done) => {
  done(null,user.id);
});

passport.deserializeUser( async (id,done) =>{
    const rows = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
    done(null,rows[0]);
});
