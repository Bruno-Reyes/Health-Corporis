const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
let controller = require('../controllers/auth');


router.get('/signup', isNotLoggedIn, controller.signuprender);
router.get('/login',isNotLoggedIn, controller.loginrender);

router.post('/signup',isNotLoggedIn, passport.authenticate('local.signup',{
    successRedirect : '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.post('/login' ,isNotLoggedIn,(req, res,next) => {
    passport.authenticate('local.login', {
        successRedirect : '/profile',
        failureRedirect: '/login',
        failureFlash : true
    })(req,res, next);
});

router.get('/profile',isLoggedIn , controller.profile);
router.get('/logout', controller.logout);

module.exports = router;