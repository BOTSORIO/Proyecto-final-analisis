const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth'); //Si no esta logueado


router.get('/perfilUser', isLoggedIn, async (req,res) => {

    res.render('profileUser');
});


module.exports = router;