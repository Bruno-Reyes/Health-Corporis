const express = require('express');
const router = express.Router();
const { isNotLoggedIn } = require('../lib/auth');
const { Chat, ChatPrivado, Consejos } = require("../models")

router.get('/', isNotLoggedIn, (req, res) => {
    req.app.locals.layouts = 'main';
    res.render('index.hbs');
})

router.get('/tips', async(req, res) => {
    req.app.locals.layout = 'main';
    const notes = await Consejos.find();
    res.render('tips.hbs', { notes });
});

module.exports = router