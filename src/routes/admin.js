const express = require('express');
const router = express.Router();
const { isLoggedIn,isNotLoggedIn } = require('../lib/auth');
const admin = require('../controllers/admin');
router.get('/users',isLoggedIn, admin.listusers );
router.get('/users/delete/:id',isLoggedIn, admin.userdelete );
router.get('/food',isLoggedIn, admin.listfood );
router.get('/food2',isLoggedIn, admin.listfood2);
router.get('/food3',isLoggedIn, admin.listfood3);
router.get('/food4',isLoggedIn, admin.listfood4);
router.get('/food5',isLoggedIn, admin.listfood5);
router.get('/food6',isLoggedIn, admin.listfood6);
router.get('/food7',isLoggedIn, admin.listfood7);
router.get('/food8',isLoggedIn, admin.listfood8);
router.get('/food9',isLoggedIn, admin.listfood9);
router.post('/food/add',isLoggedIn, admin.addfood );
router.get('/food/delete/:id', isLoggedIn, admin.fooddelete);
router.get('/food/edit/:id' ,isLoggedIn, admin.foodeditrender);
router.post('/food/edit/:id' ,isLoggedIn, admin.foodedit);
router.get('/tips' ,isLoggedIn, admin.listtips);
router.get('/tips/add' ,isLoggedIn, admin.tipaddrender);
router.post('/tips/add' ,isLoggedIn, admin.tipadd);
router.get('/tips/edit/:id',isLoggedIn,admin.edittipsrender);
router.post('/tips/edit/:id',isLoggedIn,admin.edittips);
router.get('/tips/delete/:id', isLoggedIn, admin.deletetip);
router.get('/exercises', isLoggedIn, admin.listexercises);
router.get('/exercises/delete/:id', isLoggedIn, admin.deleteexercises);
router.get('/exercises/add', isLoggedIn, admin.exerciseaddrender);
router.post('/exercise/add',isLoggedIn,admin.exerciseadd);
router.get('/exercise/edit/:id',isLoggedIn,admin.editexerciserender);
router.post('/exercise/edit/:id',isLoggedIn,admin.editexercises);


module.exports = router;

//req.app.locals.layout = 'nokbre';