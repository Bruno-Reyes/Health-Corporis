const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const pool = require('../../database');
const validator = require('validator');
const multer = require('multer')
const path = require('path')
const  uuid = require('uuid/v1')
const fs = require('fs')


const storage = multer.diskStorage({
    destination : path.join(__dirname , '../public/img'),
    filename : (req,file,cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
})

const configMulter = multer({
    storage,
    fileFilter : (req,file,cb) => {
        const filetypes = /jpeg|jpg|png|gif/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname))
        if(mimetype && extname){
            return cb(null, true)
        }
        else{
            cb('Error el archivo debe ser una imagen valida')
        }
    }
}).single('image')

router.get('/exercises',isLoggedIn,async(req,res)=>{
    const exercises = await pool.query('select id_eje,nom_eje,img_eje,des_eje,series,cantidad,intensidad,tip_med from Ejercicio natural join Intensidad natural join Medicion;')
    req.app.locals.layouts = "admin"
    res.render('admin/exercises.hbs', {exercises})
})

router.get('/addExercises',isLoggedIn,async(req,res)=>{    
    req.app.locals.layouts = "admin";
    res.render('admin/addExercise.hbs')
    
})

router.post('/addExercise', isLoggedIn ,configMulter, async (req,res) =>{
    let { nomeje , description , series , cantidad , intensidad , medicion } = req.body
    
    let newExercise = {
        nom_eje : '',
        img_eje : '',
        des_eje : '',
        series : 0,
        cantidad : 0,
        id_int : 0,
        id_med : 0
    }

    newExercise.nom_eje = nomeje
    newExercise.img_eje = '/img/' +  req.file.filename
    newExercise.des_eje = description
    newExercise.series = series
    newExercise.cantidad = cantidad
    newExercise.id_int = intensidad
    newExercise.id_med = medicion
    
    
    await pool.query('insert into Ejercicio set ?',[newExercise])
    req.flash('Success', `El ejercicio ${newExercise.nom_eje} se agregó con éxito`);
    res.redirect('/admin/exercises')
})

router.get('/delete/exercise/:id', isLoggedIn , async (req,res) => {
    const { id } = req.params
    const dir_img = await pool.query('SELECT img_eje,nom_eje from Ejercicio where id_eje =?',[id])
    const dir = path.join(__dirname , '../public'+dir_img[0].img_eje )
    fs.unlink(dir, err => {
        if (err) throw err
    })
    await pool.query('DELETE FROM Ejercicio WHERE id_eje = ?',[id])
    req.flash('Success', `Ejercicio ${dir_img[0].nom_eje} eliminado correctamente`)
    res.redirect('/admin/exercises')
})

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
    req.app.locals.layouts = "admin"
    res.render('admin/usuarios.hbs', {usuarios})
});

module.exports = router;