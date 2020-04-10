const express = require('express');
const router = express.Router();
const pool = require('../../database');
const jwt = require('jsonwebtoken')
const { secret } = require('../lib/config')
const helpers = require('../lib/helpers')

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

    if (data.nom_usu) {
        const psw = await helpers.decrypt(data.psw_usu)
        if (password === psw) {

            const token = jwt.sign({
                id : data.id_usu
            }, secret , {
                expiresIn : 5
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

router.post('/me', (req,res) => {
    //Priemero se debe verificar un token

    const { token } = req.body
    console.log(token)

    const decoded = jwt.verify(token , secret)
    console.log(decoded)


    res.json({
        message : 'Building'
    })
    
})

module.exports = router;