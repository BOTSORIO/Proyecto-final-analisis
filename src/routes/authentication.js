const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');
const { isNotLoggedIn } = require('../lib/auth');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup')
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/signin',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req,res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req,res,next) => {
    passport.authenticate('local.signin', {
        successRedirect: 'general',
        failureRedirect: '/signin',
        failureFlash: true
    })(req,res,next);
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile')
});

router.get('/general', (req, res) => {
    res.render('general')
});

router.get('/logout', isLoggedIn , (req, res) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect('general');
      });
});

module.exports = router;