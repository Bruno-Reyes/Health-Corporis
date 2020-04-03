const express = require('express');
const router = express.Router();
const pool = require('../../database');
const helpers = require('../lib/helpers');
const validator = require('validator');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const path = require('path');

router.get('/exercises', isLoggedIn, (req, res) => {
    req.app.locals.layouts = "user";
    res.render('user/exercises.hbs');
});

router.get('/seguimiento', isLoggedIn, (req, res) => {
    req.app.locals.layouts = "user";
    res.render('user/seguimiento.hbs');
})

router.post('/registroSeguimiento' ,isLoggedIn, async (req,res) => {
    let data = req.body
    
    let response = {}
    /* Aqui van validarse los datos  */
    let id_per = await pool.query('SELECT id_per FROM Usuario WHERE id_usu = ?',[req.user.id_usu])
    await pool.query('INSERT INTO seguimiento(peso,est_seg,imc_seg,fec_reg,id_per) values(?,?,?,NOW(),?)', [data.peso,data.estatura,data.imc,id_per[0].id_per])
    response.message = 'Tenemos tus datos vuelve en 15 y 20 dias'
    res.json(response)
})

router.get('/dataChart', isLoggedIn , async (req,res) =>{
    let data = await pool.query('SELECT imc_seg,fec_reg FROM usuario natural join persona natural join seguimiento where id_usu = ?',[req.user.id_usu])
    let dataInformat = []
    for (let index = 0; index < data.length; index++) {
        dataInformat[index] = []
        dataInformat[index][0] = data[index].fec_reg
        dataInformat[index][1] = parseFloat(data[index].imc_seg)
    }
    res.json(dataInformat)
})

router.get('/dataTable', isLoggedIn, async (req,res) => {
    let data = await pool.query('SELECT peso,est_seg,imc_seg,fec_reg FROM usuario natural join persona natural join seguimiento where id_usu = ?',[req.user.id_usu])
    res.json(data)
})

router.get('/frecuencia', isLoggedIn, (req, res) => {
    req.app.locals.layouts = "user";
    res.render('user/frecuencia.hbs');
})

router.get('/editprofile', isLoggedIn, async (req, res) => {
    infoUser = await pool.query('select * from usuario natural join persona natural join genero natural join enfermedades natural join seguimiento natural join frecuenciaejercicio where id_usu=?', [req.user.id_usu]);    
    req.app.locals.layouts = "user";
    res.render('user/editProfile.hbs', { infoUser });
})

//Aqui se van a editar todos los datos del usuario
router.post('/editNombre', isLoggedIn, async (req, res) => {
    const { nombre } = req.body
    const id = req.user.id_usu
    await pool.query('update persona set nombre=? where id_per=?', [nombre, id])
    res.json({
        message: 'Se ha editado correctamente el nombre',
        data : nombre
    })
})

router.post('/editApellido', isLoggedIn, async (req, res) => {
    const { apellido } = req.body
    const id = req.user.id_usu
    await pool.query('update persona set apellido=? where id_per=?', [apellido, id])
    res.json({
        message: 'Se ha editado correctamente el apellido',
        data : apellido
    })
})

router.post('/editFecha', isLoggedIn, async (req, res) => {
    const { fecha } = req.body
    const id = req.user.id_usu
    await pool.query('update persona set fec_nac=? where id_per=?', [fecha, id])
    res.json({
        message: 'Se ha editado correctamente tu fecha de nacimiento',
        data : fecha
    })
})

router.post('/editGenero', isLoggedIn, async (req, res) => {
    const { genero } = req.body
    const id = req.user.id_usu
    let id_gen    
    if(genero === "Masculino"){
        id_gen = 1
    }else if(genero === "Femenino"){
        id_gen = 2
    }
    await pool.query('update persona set id_gen=? where id_per=?', [id_gen, id])
    res.json({
        message: 'Se ha editado correctamente tu genero',
        data : genero
    })
})

router.post('/editEnfermedad',isLoggedIn, async(req,res)=>{
    const {enfermedad} = req.body
    const id = req.user.id_usu
    let id_enf
    if(enfermedad==="Ninguna"){
        id_enf=1
    }else if(enfermedad==="Cardiovascular"){
        id_enf=2
    }else if(enfermedad==="Discapacidad Motriz"){
        id_enf=3
    }
    await pool.query('update persona set id_enf=? where id_per=?', [id_enf, id])
    res.json({
        message: 'Se ha editado correctamente tu padecimiento medico',
        data : enfermedad
    })
})

router.post('/editFrecuencia',isLoggedIn, async(req,res)=>{
    const {frecuencia} = req.body
    const id = req.user.id_usu
    let id_fre
    if(frecuencia==="Nunca"){
        id_fre=1
    }else if(frecuencia==="Raramente"){
        id_fre=2
    }else if(frecuencia==="Ocasionalmente"){
        id_fre=3
    }else if(frecuencia==="Generalmente"){
        id_fre=4
    }else if(frecuencia==="Siempre"){
        id_fre=5
    }
    await pool.query('update persona set id_fre=? where id_per=?', [id_fre, id])
    res.json({
        message: 'Se ha editado correctamente la frecuencia de ejercicio',
        data : frecuencia
    })
})

router.post('/editEmail', isLoggedIn, async (req, res) => {
    const { email } = req.body
    const id = req.user.id_usu
    await pool.query('update usuario set email_usu=? where id_per=?', [email, id])
    res.json({
        message: 'Se ha editado correctamente tu correo electronico',
        data : email
    })
})

router.post('/editUsuario',isLoggedIn,async(req,res)=>{
    const { usuario } = req.body
    const id = req.user.id_usu
    await pool.query('update usuario set nom_usu=? where id_usu=?', [usuario, id])
    res.json({
        message: 'Se ha editado correctamente tu usuario',
        data : usuario
    })
})

router.post('/editPassword',isLoggedIn,async(req,res)=>{
    const { oldPassword, newPassword, confirmPassword } = req.body
    const id = req.user.id_usu    
    const psw=await pool.query('select psw_usu from usuario where id_usu=?', [id])
    if(await helpers.decrypt(psw[0].psw_usu)===oldPassword){
        if(newPassword===confirmPassword){   
            const superNew=await helpers.encrypt(newPassword)         
            await pool.query('update usuario set psw_usu=? where id_usu=?',[superNew, id])
            res.json({
                message : 'La contraseña se ha actualizado correctamente, ahora no la olvides.'
            })
        }
        else{
            res.json({
                message : 'La confirmación de la contraseña y la nueva contraseña no coinciden.'
            })            
        }
    }else{
        res.json({
            message : 'La contraseña actual que ingresaste no coincide con nuestros registros.'
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



module.exports = router;