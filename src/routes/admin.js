const express = require('express');
const router = express.Router();
const { isLoggedIn,isNotLoggedIn } = require('../lib/auth');
const pool = require('../../database');
const validator = require('validator');

router.get('/exercises',isLoggedIn,async(req,res)=>{
    //const exercises = await pool.query('Select nom_eje, img_eje, des_eje, series, cantidad, intensidad, tip_med from ejercicio natural join intensidad natural join medicion')
    req.app.locals.layouts = "admin";
    res.render('admin/exercises.hbs')
});

router.get('/addExercises',isLoggedIn,async(req,res)=>{    
    req.app.locals.layouts = "admin";
    res.render('admin/addExercise.hbs')
});

router.get('/consejos',isLoggedIn,async(req,res)=>{    
    req.app.locals.layouts = "admin";
    res.render('admin/tips.hbs')
});

router.get('/addConsejos',isLoggedIn,async(req,res)=>{    
    req.app.locals.layouts = "admin";
    res.render('admin/addTip.hbs')
});

router.get('/graficas',isLoggedIn,async(req,res)=>{    
    req.app.locals.layouts = "admin";
    res.render('admin/graficas.hbs')
});

router.get('/usuarios',isLoggedIn,async(req,res)=>{   
    let usuarios=await pool.query('SELECT * FROM Usuario natural join Persona natural join Genero natural join FrecuenciaEjercicio natural join Enfermedades WHERE id_tdu = 2')    
    req.app.locals.layouts = "admin";
    res.render('admin/usuarios.hbs', {usuarios})
});

module.exports = router;