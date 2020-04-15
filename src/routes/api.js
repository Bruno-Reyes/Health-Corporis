const express = require('express');
const router = express.Router();
const pool = require('../../database');
const jwt = require('jsonwebtoken')
const { secret } = require('../lib/config')
const helpers = require('../lib/helpers')
const verifyToken = require('../lib/verifyTokens')

router.post('/login', async (req, res) => {
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
                expiresIn: 60 * 60
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

router.post('/me', verifyToken, async (req, res) => {
    //Priemero se debe verificar un token
    const data = await pool.query('SELECT * FROM Usuario WHERE id_usu=?', [req.userId])
    res.json({
        data: data[0]
    })
})

router.post('/infoCuenta', verifyToken, async(req, res)=>{
    const data = await pool.query('select * from Usuario natural join Persona natural join Genero natural join Enfermedades natural join FrecuenciaEjercicio where id_usu=?', [req.userId])    
    const info={
        Usuario: data[0].nom_usu,
        Email: data[0].email_usu,
        Nombre: data[0].nombre+' '+data[0].apellido,        
        Genero: data[0].nom_gen,
        Padecimientos:data[0].tip_enf
    }       
    res.json({
        data:info
    })
})

module.exports = router;
