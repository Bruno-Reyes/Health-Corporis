const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const pool = require('../database');
const path = require('path');

router.get('/',isNotLoggedIn, (req, res) => {
    req.app.locals.layout= 'main';
    res.render('index');
});

router.get('/tips', isNotLoggedIn, async (req, res) => {
    const tips = await pool.query('SELECT * FROM consejos');
    req.app.locals.layout= 'main';
    res.render('tips', {tips});
});

router.post('/prueba',isNotLoggedIn, (req,res) => {
    let { pulso } = req.body;
    console.log(pulso);
});

router.get('/terminos', isNotLoggedIn, (req,res) => {
    res.download(path.join(__dirname, '../docs/Aviso de privacidad.pdf'), (err) => {
        if (err) {
            console.log('Error');
        } else {
            console.log('Descarga de aviso de privacidad finalizada');
        }
    });
});

module.exports = router;