const express = require('express');
const router = express.Router();
const pool = require('../../database');
const helpers = require('../lib/helpers');
const validator = require('validator');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const path = require('path');
const age = require('../lib/age')
const moment = require('moment');
const { log } = require('console');
const { Consejos } = require('../models')
moment.locale('es')

router.get('/chat/:nom_usu', async(req, res) => {
    req.app.locals.layout = 'user';
    const remitente = req.params.nom_usu;
    res.render('user/chat.hbs');
})

router.get('/exercises', isLoggedIn, async(req, res) => {

    let frecuencias = await pool.query('select fre_rep, fre_opt from Persona natural join Usuario where id_usu = ?', [req.user.id_usu])
    frecuencias = frecuencias[0]
    if (frecuencias.fre_rep === '0' && frecuencias.fre_opt === '0') {
        let exercises = []
        req.app.locals.layouts = "user"
        res.render('user/exercises.hbs', { exercises })
    } else {
        intensidad = await pool.query('select id_int from Usuario where id_usu=?', [req.user.id_usu])
        let exercises = await pool.query('SELECT nom_eje,img_eje,des_eje,series,cantidad,tip_med FROM Ejercicio natural join Medicion WHERE id_int=?', [intensidad[0].id_int])
        exercises = age.randomExercises(exercises)
        req.app.locals.layouts = "user"
        res.render('user/exercises.hbs', { exercises })
    }

})

router.get("/consejos", isLoggedIn, async(req, res) => {
    req.app.locals.layouts = "user";
    const notes = await Consejos.find()
    res.render("user/tips.hbs", { notes });
})

router.get('/seguimiento', isLoggedIn, (req, res) => {
    req.app.locals.layouts = "user";
    res.render('user/seguimiento.hbs');
})

router.post('/registroSeguimiento', isLoggedIn, async(req, res) => {
    let data = req.body

    let response = {}
    let fecha = await pool.query('select fec_reg from Seguimiento natural join Persona natural join Usuario where id_usu=?', [req.user.id_usu])

    let current = moment()
    let past = moment(fecha[fecha.length - 1].fec_reg)
    let time = current.diff(past, 'days')

    if (time > 15) {
        if (validator.isEmpty(data.peso, { ignore_whitespace: false }) == false || validator.isEmpty(data.estatura, { ignore_whitespace: false }) == false) {
            if (validator.isInt(data.peso, { min: 30, max: 200 }) == true) {
                if (validator.isInt(data.estatura, { min: 160, max: 210 }) == true) {
                    let id_per = await pool.query('SELECT id_per FROM Usuario WHERE id_usu = ?', [req.user.id_usu])
                    await pool.query('INSERT INTO Seguimiento(peso,est_seg,imc_seg,fec_reg,id_per) values(?,?,?,NOW(),?)', [data.peso, data.estatura, data.imc, id_per[0].id_per])
                    response.message = 'Tenemos tus datos vuelve en 15 dias'
                    res.json(response)
                } else {
                    response.message = 'Estatura va de 160-210'
                    res.json(response)
                }
            } else {
                response.message = 'Peso va de 30-200'
                res.json(response)
            }
        } else {
            response.message = 'Algun campo quedo vacio'
            res.json(response)
        }
    } else {
        response.message = 'Aun no es tiempo de registrar tus datos, vuelve después'
        res.json(response)
    }
    /* Aqui van validarse los datos  */

})

router.get('/dataChart', isLoggedIn, async(req, res) => {
    let data = await pool.query('SELECT imc_seg,fec_reg FROM Usuario natural join Persona natural join Seguimiento where id_usu = ?', [req.user.id_usu])
    let dataInformat = []
    for (let index = 0; index < data.length; index++) {
        dataInformat[index] = []
        dataInformat[index][0] = data[index].fec_reg
        dataInformat[index][1] = parseFloat(data[index].imc_seg)
    }
    res.json(dataInformat)
})

router.get('/dataTable', isLoggedIn, async(req, res) => {
    let data = await pool.query('SELECT peso,est_seg,imc_seg,fec_reg FROM Usuario natural join Persona natural join Seguimiento where id_usu = ?', [req.user.id_usu])
    res.json(data)
})

router.get('/frecuencia', isLoggedIn, (req, res) => {
    req.app.locals.layouts = "user";
    res.render('user/frecuencia.hbs');
})

router.get('/editprofile', isLoggedIn, async(req, res) => {
    infoUser = await pool.query('select * from Usuario natural join Persona natural join Genero natural join Enfermedades natural join FrecuenciaEjercicio where id_usu=?', [req.user.id_usu]);
    req.app.locals.layouts = "user";
    res.render('user/editProfile.hbs', { infoUser });
})

//Aqui se van a editar todos los datos del usuario
router.post('/editNombre', isLoggedIn, async(req, res) => {
    const { nombre } = req.body
    const id = req.user.id_usu    
    if (validator.isEmpty(nombre, { ignore_whitespace: true }) == true) {
        return done(null, false, req.flash('Error', 'El campo nombre esta vacio'));
    }
    if (validator.isAlpha(nombre.replace(/ /g, "")) == false) {
        return done(null, false, req.flash('Error', 'El campo primer nombre solo debe contener letras'));
    }
    if (validator.isLength(nombre, { min: 3, max: 25 }) == false) {
        return done(null, false, req.flash('Error', 'El campo Primer nombre debe de ser de minimo 3 y mámixo 25 caracteres'));
    }
    let palabra = [];
    palabra = nombre.split(" ");
    if (palabra.length > 1) {
        if (palabra[1].length > 0) {
            return done(null, false, req.flash('Error', 'El campo primer nombre solo debe contener una palabra'));
        }
    } else {
        
        let id_per=await pool.query('SELECT id_per from Persona natural join Usuario WHERE id_usu=?', [id])       
        await pool.query('update Persona set nombre=? where id_per=?', [nombre, id_per[0].id_per])
        res.json({
            message: 'Se ha editado correctamente el nombre',
            data: nombre
        })
    }
})

router.post('/editApellido', isLoggedIn, async(req, res) => {
    const { apellido } = req.body
    const id = req.user.id_usu

    let id_per=await pool.query('SELECT id_per from Persona natural join Usuario WHERE id_usu=?', [id])       
    await pool.query('update Persona set apellido=? where id_per=?', [apellido, id_per[0].id_per])
    res.json({
        message: 'Se ha editado correctamente el apellido',
        data: apellido
    })
})

router.post('/editFecha', isLoggedIn, async(req, res) => {
    const { fecha } = req.body
    const id = req.user.id_usu
    let id_per=await pool.query('SELECT id_per from Persona natural join Usuario WHERE id_usu=?', [id])
    await pool.query('update Persona set fec_nac=? where id_per=?', [fecha, id_per[0].id_per])
    res.json({
        message: 'Se ha editado correctamente tu fecha de nacimiento',
        data: fecha
    })
})

router.post('/editGenero', isLoggedIn, async(req, res) => {
    const { genero } = req.body
    const id = req.user.id_usu
    let id_gen
    if (genero === "Masculino") {
        id_gen = 1
    } else if (genero === "Femenino") {
        id_gen = 2
    }
    let id_per=await pool.query('SELECT id_per from Persona natural join Usuario WHERE id_usu=?', [id])
    await pool.query('update Persona set id_gen=? where id_usu=?', [id_gen, id_per[0].id_per])
    res.json({
        message: 'Se ha editado correctamente tu genero',
        data: genero
    })
})

router.post('/editEnfermedad', isLoggedIn, async(req, res) => {
    const { enfermedad } = req.body
    const id = req.user.id_usu
    let id_enf
    if (enfermedad === "Ninguna") {
        id_enf = 1
    } else if (enfermedad === "Cardiovascular") {
        id_enf = 2
    } else if (enfermedad === "Discapacidad Motriz") {
        id_enf = 3
    }
    let id_per=await pool.query('SELECT id_per from Persona natural join Usuario WHERE id_usu=?', [id])
    await pool.query('update Persona set id_enf=? where id_per=?', [id_enf, id_per[0].id_per])
    res.json({
        message: 'Se ha editado correctamente tu padecimiento medico',
        data: enfermedad
    })
})

router.post('/editFrecuencia', isLoggedIn, async(req, res) => {
    const { frecuencia } = req.body
    const id = req.user.id_usu
    let id_fre
    if (frecuencia === "Nunca") {
        id_fre = 1
    } else if (frecuencia === "Raramente") {
        id_fre = 2
    } else if (frecuencia === "Ocasionalmente") {
        id_fre = 3
    } else if (frecuencia === "Generalmente") {
        id_fre = 4
    } else if (frecuencia === "Siempre") {
        id_fre = 5
    }
    let id_per=await pool.query('SELECT id_per from Persona natural join Usuario WHERE id_usu=?', [id])
    await pool.query('update Persona set id_fre=? where id_per=?', [id_fre, id_per[0].id_per])
    res.json({
        message: 'Se ha editado correctamente la frecuencia de ejercicio',
        data: frecuencia
    })
})

router.post('/editEmail', isLoggedIn, async(req, res) => {
    const { email } = req.body
    const id = req.user.id_usu

    if (validator.isEmpty(email, { ignore_whitespace: true }) == true) {
        res.json({
            message: 'Campo vacio.'
        })
    }
    let contA = 0;
    let contP = 0;
    for (let i = 0; i < email.length; i++) {
        if (email.charAt(i) == '@') {
            contA++;
        }
        if (email.charAt(i) == '.') {
            contP++;
        }
    }
    if (contA > 1 || contA < 1) {
        res.json({
            message: 'El campo email no puede tener mas de un arroba o no tener.'
        })
    }
    if (contP > 4 || contP < 1) {
        res.json({
            message: 'El campo email no puede tener mas de 4 puntos o no tener.'
        })
    }
    if (validator.isLength(email, { min: 8, max: 40 }) == false) {
        res.json({
            message: 'El campo email va del rango 8-40'
        })
    } else {
        await pool.query('update Usuario set email_usu=? where id_usu=?', [email, id])
        res.json({
            message: 'Se ha editado correctamente tu correo electronico',
            data: email
        })
    }
})

router.post('/editUsuario', isLoggedIn, async(req, res) => {
    const { usuario } = req.body
    const id = req.user.id_usu

    if (validator.isEmpty(usuario, { ignore_whitespace: true }) == true) {
        res.json({
            message: 'El campo Usuario no puede estar vacio'
        })
    }
    if (validator.isAlphanumeric(usuario) == false) {
        res.json({
            message: 'El campo Usuario no permite Caracteres especiales'
        })
    }
    if (validator.isLength(usuario, { min: 5, max: 20 }) == false) {
        res.json({
            message: 'El campo Usuario va del rango 5-20'
        })
    } else {
        await pool.query('update Usuario set nom_usu=? where id_usu=?', [usuario, id])
        res.json({
            message: 'Se ha editado correctamente tu usuario',
            data: usuario
        })
    }
})

router.post('/editPassword', isLoggedIn, async(req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body
    const id = req.user.id_usu
    const psw = await pool.query('select psw_usu from Usuario where id_usu=?', [id])
    if (await helpers.decrypt(psw[0].psw_usu) === oldPassword) {
        if (newPassword === confirmPassword) {
            const superNew = await helpers.encrypt(newPassword)
                //validaciones de la contraseña
            if (validator.isEmpty(oldPassword, { ignore_whitespace: true }) == true) {
                res.json({
                    message: 'El campo contraseña no puede estar vacio'
                })
            }
            if (validator.isLength(oldPassword, { min: 8, max: 16 }) == false) {
                res.json({
                    message: 'El campo contraseña debe contener de 8 a 16 caracteres'
                })
            }
            if (validator.isAlphanumeric(oldPassword) == false) {
                res.json({
                    message: 'El campo contraseña no permite Caracteres especiales'
                })
            }

            if (validator.isEmpty(newPassword, { ignore_whitespace: true }) == true) {
                res.json({
                    message: 'El campo contraseña no puede estar vacio'
                })
            }
            if (validator.isLength(newPassword, { min: 8, max: 16 }) == false) {
                res.json({
                    message: 'El campo contraseña debe contener de 8 a 16 caracteres'
                })
            }
            if (validator.isAlphanumeric(newPassword) == false) {
                res.json({
                    message: 'El campo contraseña no permite Caracteres especiales'
                })
            }

            //Validacion de la segunda contraseña
            if (validator.isEmpty(confirmPassword) == true) {
                res.json({
                    message: 'El campo confirmar contraseña no puede estar vacio'
                })
            } else {
                await pool.query('update Usuario set psw_usu=? where id_usu=?', [superNew, id])
                res.json({
                    message: 'La contraseña se ha actualizado correctamente, ahora no la olvides.'
                })
            }

        } else {
            res.json({
                message: 'La confirmación de la contraseña y la nueva contraseña no coinciden.'
            })
        }
    } else {
        res.json({
            message: 'La contraseña actual que ingresaste no coincide con nuestros registros.'
        })
    }


})

router.get('/pdffrecuencia', isLoggedIn, (req, res) => {
    res.download(path.join(__dirname, '../docs/Pulsaciones_Por_Minuto.pdf'), (err) => {
        if (err) {
            console.log('Error');
        } else {
            console.log('Descarga finalizada');
        }
    });
});

router.get('/pdf', isLoggedIn, (req, res) => {
    res.download(path.join(__dirname, '../docs/Frecuencia-Cardiaca-y-Ejercicio-Fisico.pdf'), (err) => {
        if (err) {
            console.log('Error');
        } else {
            console.log('Descarga finalizada');
        }
    });
});

router.post('/frecuencia', isLoggedIn, async(req, res) => {
    let { Intensidad, FrecuenciaR } = req.body



    let fecha = await pool.query('SELECT fec_nac FROM Persona natural join Usuario WHERE id_usu = ?', [req.user.id_usu])
    let nacimiento = fecha[0].fec_nac
    let f = new Date()
    let edad = await pool.query('Select DATEDIFF(?,?)', [f, nacimiento])
    let days = 0
    for (const prop in edad[0]) {
        days = edad[0][prop]
    }
    days = days / 365
    let edadReal = days.toString().substring(0, 2)
    edadReal = parseInt(edadReal)
    let freOpt = 220 - edadReal
    let id_per = await pool.query('select id_per from Persona natural join Usuario where id_usu=?', req.user.id_usu)

    if (Intensidad == 2 || Intensidad == 3 || Intensidad == 4) {
        if (validator.isInt(FrecuenciaR, { min: 40, max: 120 })) {
            await pool.query('UPDATE Usuario SET id_int = ? WHERE id_usu = ?', [Intensidad, req.user.id_usu])
            await pool.query('UPDATE Persona SET fre_rep = ?, fre_opt = ? WHERE id_per = ?', [FrecuenciaR, freOpt, id_per[0].id_per])
            req.flash("Success", `Datos guardados correctamente!`)
            res.redirect('/user/exercises')
        } else {
            req.flash("Error", `La frecuencia en reposo es de 60-100`)
            res.redirect('/user/frecuencia');
        }
    } else {
        req.flash("Error", `Elige una intensidad valida`)
        res.redirect('/user/frecuencia');
    }
})

router.get('/requestFre', isLoggedIn, async(req, res) => {
    let data = await pool.query('Select fre_rep, fre_opt, intensidad from Persona natural join Usuario natural join Intensidad where id_usu = ?', [req.user.id_usu])
    res.json({ data: data[0] })
})


module.exports = router;