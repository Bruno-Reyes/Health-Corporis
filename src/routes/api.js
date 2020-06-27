const express = require('express');
const router = express.Router();
const pool = require('../../database');
const jwt = require('jsonwebtoken')
const { secret } = require('../lib/config')
const helpers = require('../lib/helpers')
const verifyToken = require('../lib/verifyTokens')
const age = require('../lib/age')

router.post('/login', async(req, res) => {
    let { user, password } = req.body
    let resjson = {}
    let rows1 = await pool.query('SELECT * FROM Usuario WHERE nom_usu = ?', [user])
    let exists = false;
    let data
    if (rows1.length > 0) {
        exists = true;
        data = rows1[0];
    } else if (exists == false) {
        let rows2 = await pool.query('SELECT * FROM Usuario WHERE email_usu = ?', [user])
        if (rows2.length > 0) {
            exists = true
            data = rows2[0]
        }
    }
    if (exists == false) {
        resjson.message = 'El usuario no existe'
        resjson.auth = false
    }

    if (!(data == undefined)) {
        const psw = await helpers.decrypt(data.psw_usu)
        if (password === psw) {

            const token = jwt.sign({
                id: data.id_usu
            }, secret, {
                expiresIn: 60 * 60 * 24 * 30
            })

            resjson.message = 'Sesion iniciada correctamente'
            resjson.auth = true
            resjson.token = token
        } else {
            resjson.message = 'La contraseña no coincide'
            resjson.auth = false
        }
    }

    res.json(resjson)


})

router.post('/verify', verifyToken, async(req, res) => {
    res.json({
        verify: true
    })
})

router.post('/me', verifyToken, async(req, res) => {
    //Priemero se debe verificar un token
    const data = await pool.query('SELECT * FROM Usuario WHERE id_usu=?', [req.userId])
    res.json({
        data: data[0]
    })
})

router.post('/infoCuenta', verifyToken, async(req, res) => {
    const data = await pool.query('select * from Usuario natural join Persona natural join Genero natural join Enfermedades natural join FrecuenciaEjercicio where id_usu=?', [req.userId])
    const info = {
        Usuario: data[0].nom_usu,
        Email: data[0].email_usu,
        Nombre: data[0].nombre + ' ' + data[0].apellido,
        Genero: data[0].nom_gen,
        Padecimientos: data[0].tip_enf
    }    
    res.json({
        data: info
    })
})

router.post('/newUsuario', verifyToken, async(req, res) => {
    const { New } = req.body
    await pool.query('update Usuario set nom_usu=? where id_usu=?', [New, req.userId])
    res.json({
        data: 'Se ha editado correctamente tu usuario'
    })
})

router.post('/newEmail', verifyToken, async(req, res) => {
    const { New } = req.body
    await pool.query('update Usuario set email_usu=? where id_usu=?', [New, req.userId])
    res.json({
        data: 'Se ha editado correctamente tu correo electronico'
    })
})

router.post('/newNombre', verifyToken, async(req, res) => {
    const { NewName } = req.body
    let id = await pool.query('SELECT id_per from Persona natural join Usuario WHERE id_usu=?', [req.userId])
    await pool.query('update Persona set nombre=? where id_usu=?', [NewName, id[0].id_per])
    res.json({
        data: 'Se ha editado correctamente tu nombre'
    })
})

router.post('/newApellido', verifyToken, async(req, res) => {
    const { NewLast } = req.body
    let id = await pool.query('SELECT id_per from Persona natural join Usuario WHERE id_usu=?', [req.userId])
    await pool.query('update Persona set apellido=? where id_per=?', [NewName, id[0].id_per])
    res.json({
        data: 'Se ha editado correctamente tu apellido'
    })
})

router.post('/newGenero', verifyToken, async(req, res) => {
    const { New } = req.body
    let id = await pool.query('SELECT id_per from Persona natural join Usuario WHERE id_usu=?', [req.userId])
    let id_gen = 0
    if (New === "Masculino") {
        id_gen = 1
    } else if (New === "Femenino") {
        id_gen = 2
    }
    await pool.query('update Persona set id_gen=? where id_per=?', [id_gen, id[0].id_per])
    res.json({
        data: 'Se ha editado correctamente tu genero'
    })
})

router.post('/newEnfermedad', verifyToken, async(req, res) => {
    const { New } = req.body
    console.log('asdasdahsgdasasdas adsd asdas dasdagd')
    let id = await pool.query('SELECT id_per from Persona natural join Usuario WHERE id_usu=?', [req.userId])
    let id_enf
    if (New === "Ninguna") {
        id_enf = 1
    } else if (New === "Cardiovascular") {
        id_enf = 2
    } else if (New === "Discapacidad Motriz") {
        id_enf = 3
    }
    await pool.query('update Persona set id_enf=? where id_per=?', [id_enf, id[0].id_per])
    res.json({
        data: 'Se ha editado correctamente tu padecimiento'
    })
})

router.post('/seguimiento', verifyToken, async(req, res) => {
    let info = await pool.query('SELECT imc_seg,fec_reg FROM Usuario natural join Persona natural join Seguimiento where id_usu = ?', [req.userId])    
    let imc=[]
    let date=[]

    for (let i = 0; i < info[0]; i++) {
        imc[i]=info[0].imc_seg
        date[i]=info[0].fec_reg
    }

    res.json({imc, date})
})

router.post('/rutina', verifyToken, async(req, res)=>{
    let frecuencias = await pool.query('select fre_rep, fre_opt from Persona natural join Usuario where id_usu = ?', [req.userId])  
    let message  
    frecuencias = frecuencias[0]
    if (frecuencias.fre_rep === '0' && frecuencias.fre_opt === '0') {
        message='Es necesario que ingreses tu frecuencia en reposo y el tipo de ejercico'
    } else {
        intensidad = await pool.query('select id_int from Usuario where id_usu=?', [req.userId])
        let exercises = await pool.query('SELECT nom_eje,img_eje,des_eje,series,cantidad,tip_med FROM Ejercicio natural join Medicion WHERE id_int=?', [intensidad[0].id_int])
        exercises = age.randomExercises(exercises)
                         
        res.json({
            data: exercises[0],
            message
        })
    }

})

module.exports = router;