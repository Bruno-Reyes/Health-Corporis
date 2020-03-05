const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const pool = require('../database');
const path = require('path');

router.get('/',isNotLoggedIn, (req, res) => {
    req.app.locals.layout= 'main';
    res.render('index');
});

module.exports = router