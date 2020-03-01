const express = require('express');
const router = express.Router();
const pool = require('../database');
const validator = require('validator');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const path = require('path');
const  exercise  = require('../lib/exercises');

router.get('/editar', isLoggedIn, async (req, res) => {
    const datosusuario = await pool.query('select id_per,id_his,pri_nom, sec_nom, ape_pat, ape_mat, pes_his, est_his, id_ddu from usuario natural join datosusuario natural join nombre natural join historial WHERE id_usu = ?', [req.user.id_usu]);
    req.app.locals.layout = 'user';
    res.render('user/edit', { datosusuario });
});

router.get('/tips', isLoggedIn, async (req, res) => {
    const tips = await pool.query('SELECT * FROM consejos');
    req.app.locals.layout = 'user';
    res.render('tips', { tips });
});

router.post('/username/:id', isLoggedIn, async (req, res) => {
    let { id } = req.params;
    let { Username } = req.body;
    const EditUsername = {
        nom_usu: Username.replace(/ {2,}/g, " ")
    }
    //Inicia la validacion

    //validar nombre de usuario
    if (validator.isEmpty(Username, { ignore_whitespace: true }) == true) {
        req.flash('Error', 'El nombre no puede estar vácio');
        res.redirect('/user/editar');
        throw new Error('El nombre no puede estar vacio.');
    }
    else if (validator.isAlphanumeric(Username) == false) {
        req.flash('Error', 'El campo Usuario no permite Caracteres especiales');
        res.redirect('/user/editar');
        throw new Error('El campo Usuario no permite Caracteres especiales.');
    }
    else if (validator.isLength(Username, { min: 8, max: 20 }) == false) {
        req.flash('Error', 'El campo Usuario va del rango 8-20');
        res.redirect('/user/editar');
        throw new Error('El campo usuario va del rango 8-20.');
    } else {
        await pool.query('UPDATE usuario set ? WHERE id_usu = ?', [EditUsername, id]);
        req.flash('Success', 'Nombre de usuario editado correctamente');
        res.redirect('/user/editar');
    }
});


router.post('/firstname/:id', isLoggedIn, async (req, res) => {
    let { id } = req.params;
    let { FirstName } = req.body;
    const EditFirstname = {
        pri_nom: FirstName.replace(/ {2,}/g, " ")
    }
    //validar primer nombre
    let palabra = [];
    palabra = FirstName.split(" ");
    if (palabra.length > 1) {
        if (palabra[1].length > 0) {
            req.flash('Error', 'El campo primer nombre solo debe contener una palabra');
            res.redirect('/user/editar');
            throw new Error('El campo primer nombre solo debe de contener una palabra.');
        }
    }
    else if (validator.isEmpty(FirstName, { ignore_whitespace: true }) == true) {
        req.flash('Error', 'El campo Primer nombre esta vacio');
        res.redirect('/user/editar');
        throw new Error('El campo primer nombre esta vacio.');
    }
    else if (validator.isAlpha(FirstName) == false) {
        req.flash('Error', 'El campo primer nombre solo debe contener letras');
        res.redirect('/user/editar');
        throw new Error('El campo primer nombre solo debe de contener letras.');
    }
    else if (validator.isLength(FirstName, { min: 3, max: 20 }) == false) {
        req.flash('Error', 'El campo Primer nombre debe de ser de minimo 3 y mámixo 20 caracteres');
        res.redirect('/user/editar');
        throw new Error('El campo primer nombre debe de ser de minimo 3 y máximo 20 caracteres.');
    } else {
        await pool.query('UPDATE nombre set ? WHERE id_per = ?', [EditFirstname, id]);
        req.flash('Success', 'Tu primer nombre se editó correctamente');
        res.redirect('/user/editar');
    }
});

router.post('/secondname/:id', isLoggedIn, async (req, res) => {
    let { id } = req.params;
    let { SecondName } = req.body;

    const EditSecondname = {
        sec_nom: SecondName.replace(/ {2,}/g, " ")
    }

    //Validacion segundo nombre
    let palabra2 = [];
    palabra2 = SecondName.split(" ");
    if (palabra2.length == 2) {
        if (validator.isLength(palabra2[0], { min: 2, max: 3 }) == false) {
            req.flash('Error', 'El campo Segundo nombre es erroneo');
            res.redirect('/user/editar');
            throw new Error('El campo segunfo nombre es erroneo.');
        }
        if (validator.isLength(palabra2[1], { min: 4, max: 10 }) == false) {
            req.flash('Error', 'El campo Segundo nombre es erroneo');
            res.redirect('/user/editar');
            throw new Error('El campo segundo nombre es erroneo.');
        }
    }
    else if (palabra2.length > 2) {
        req.flash('Error', 'El campo Segundo nombre es erroneo');
        res.redirect('/user/editar');
        throw new Error('El campo segundo nombre es erroneo.');
    }
    else if (validator.isEmpty(SecondName, { ignore_whitespace: true }) == true) {
        req.flash('Error', 'El campo Segundo nombre esta vacio');
        res.redirect('/user/editar');
        throw new Error('El campo segundo nombre esta vacio.');
    }
    else if (validator.isAlpha(SecondName.replace(/ /g, "")) == false) {
        req.flash('Error', 'El campo Segundo nombre solo debe contener letras');
        res.redirect('/user/editar');
        throw new Error('El campo Segundo nombre solo debe contener letras.');
    }
    else if (validator.isLength(SecondName, { min: 3, max: 20 }) == false) {
        req.flash('Error', 'El campo Segundo nombre debe de ser de minimo 3 y mámixo 20 caracteres');
        res.redirect('/user/editar');
        throw new Error('El campo segundo nombre debe de ser de minimo 3 y máximo 20 caracteres.');
    }
    else {
        await pool.query('UPDATE nombre set ? WHERE id_per = ?', [EditSecondname, id]);
        req.flash('Success', 'Tu segundo nombre se editó correctamente');
        res.redirect('/user/editar');
    }
});

router.post('/paternname/:id', isLoggedIn, async (req, res) => {
    let { id } = req.params;
    let { PaternLastName } = req.body;
    const EditPatern = {
        ape_pat: PaternLastName.replace(/ {2,}/g, " ")
    }
    //Apellido paterno
    let palabra3 = [];
    palabra3 = PaternLastName.split(" ");
    if (palabra3.lenght == 2) {
        if (validator.isLength(palabra3[0], { min: 2, max: 3 }) == false) {
            req.flash('Error', 'El campo apellido paterno es erroneo');
            res.redirect('/user/editar');
            throw new Error('El campo apellido paterno es erroneo.');
        }
        if (validator.isLength(palabra3[1], { min: 4, max: 10 }) == false) {
            req.flash('Error', 'El campo apellido paterno es erroneo');
            res.redirect('/user/editar');
            throw new Error('El campo apellido paterno es erroneo.');
        }
    }
    else if (palabra3.lenght == 3) {
        if (validator.isLength(palabra3[0], { min: 2, max: 2 }) == false) {
            req.flash('Error', 'El campo apellido paterno es erroneo');
            res.redirect('/user/editar');
            throw new Error('El campo apellido paterno es erroneo.');
        }
        if (validator.isLength(palabra3[1], { min: 2, max: 2 }) == false) {
            req.flash('Error', 'El campo apellido paterno es erroneo');
            res.redirect('/user/editar');
            throw new Error('El campo apellido paterno es erroneo.');
        }
        if (validator.isLength(palabra3[2], { min: 4, max: 10 }) == false) {
            req.flash('Error', 'El campo apellido paterno es erroneo');
            res.redirect('/user/editar');
            throw new Error('El campo apellido paterno es erroneo.');
        }
    }
    else if (palabra3.length > 3) {
        req.flash('Error', 'El campo apellido paterno es erroneo');
        res.redirect('/user/editar');
        throw new Error('El campo apellido paterno es erroneo.');
    }
    else if (validator.isEmpty(PaternLastName, { ignore_whitespace: true }) == true) {
        req.flash('Error', 'El campo apellido paterno esta vacio');
        res.redirect('/user/editar');
        throw new Error('El campo apellido paterno esta vacio.');
    }
    else if (validator.isAlpha(PaternLastName.replace(/ /g, "")) == false) {
        req.flash('Error', 'El campo apellido paterno solo debe contener letras');
        res.redirect('/user/editar');
        throw new Error('El campo apellido paterno solo debe de contener letras.');
    }
    else if (validator.isLength(PaternLastName, { min: 4, max: 20 }) == false) {
        req.flash('Error', 'El campo apellido paterno debe de ser de minimo 3 y mámixo 20 caracteres');
        res.redirect('/user/editar');
        throw new Error('El campo apellido paterno deve de ser de minimo 3 y máximo 20 caracteres.');
    }
    else {
        //termina validacion
        await pool.query('UPDATE nombre set ? WHERE id_per = ?', [EditPatern, id]);
        req.flash('Success', 'Tu apellido paterno se editó correctamente');
        res.redirect('/user/editar');
    }
});

router.post('/maternname/:id', isLoggedIn, async (req, res) => {
    let { id } = req.params;
    let { MaternLastName } = req.body;

    const EditMatern = {
        ape_mat: MaternLastName.replace(/ {2,}/g, " ")
    }
    //Apellido materno
    if (validator.isEmpty(MaternLastName, { ignore_whitespace: true }) == true) {
        req.flash('Error', 'El campo Apellido Materno esta vacio');
        res.redirect('/user/editar');
        throw new Error('El campo apellido materno no debe de estar vacio.');
    }
    else if (validator.isAlpha(MaternLastName) == false) {
        req.flash('Error', 'El campo Apellido Materno solo debe contener letras');
        res.redirect('/user/editar');
        throw new Error('El campo apellido materno solo debe de contener letras.');
    }
    else if (validator.isLength(MaternLastName, { min: 4, max: 20 }) == false) {
        req.flash('Error', 'El campo Apellido Materno debe de ser de minimo 3 y mámixo 20 caracteres');
        res.redirect('/user/editar');
        throw new Error('Apellido materno deve de ser de minimo 3 y máximo 20 caracteres.');
    } else {
        await pool.query('UPDATE nombre set ? WHERE id_per = ?', [EditMatern, id]);
        req.flash('Success', 'Tu apellido materno se editó correctamente');
        res.redirect('/user/editar');

    }
});

router.post('/age/:id', isLoggedIn, async (req, res) => {
    let { id } = req.params;
    let { AgePerson } = req.body;
    const EditAge = {
        eda_usu: AgePerson.replace(/ {2,}/g, " ")
    }
    //validar edad
    if (validator.isEmpty(AgePerson, { ignore_whitespace: true }) == true) {
        req.flash('Error', 'El Campo Edad no puede estar vacio');
        res.redirect('/user/editar');
        throw new Error('El campo edad no puede estar vacio.');
    }
    else if (validator.isInt(AgePerson, { min: 16, max: 50 }) == false) {
        req.flash('Error', 'La edad esta incorrecta, rango 16-50');
        res.redirect('/user/editar');
        throw new Error('La edad no uede estar vacio.');
    } else {
        //termina validacion
        await pool.query('UPDATE datosusuario set ? WHERE id_ddu = ?', [EditAge, id]);
        req.flash('Success', 'Tu edad se editó correctamente');
        res.redirect('/user/editar');
    }
});

router.post('/peso/:id', isLoggedIn, async (req, res) => {
    let { id } = req.params;
    let { Peso } = req.body;
    const EditPeso = {
        pes_his: Peso.replace(/ {2,}/g, "")
    }    
    if (validator.isEmpty(Peso, { ignore_whitespace: true }) == true) {
        req.flash('Error', 'El Campo Peso no puede estar vacio');
        res.redirect('/user/editar');
        throw new Error('El Campo Peso no puede estar vacio');
    }
    let punto = [];
    punto = Peso.toString().split(".");
    if (punto.length > 1) {
        if (validator.isFloat(Peso, { min: 30.00, max: 200.00 }) == false) {
            req.flash('Error', 'Los datos númericos del peso son equivocados rango 30.00-200.00 kilogramos.');
            res.redirect('/user/editar');
            throw new Error('Los datos númericos del peso son equivocados rango 30.00-200.00 kilogramos.');
        }
        if (punto[1].length > 2) {
            punto[1].substring(0, 2);
            Peso = punto[0] + '.' + punto[1];
        }
    } else if (punto.length == 1) {
        if (validator.isInt(Peso, { min: 30, max: 200 }) == false) {
            req.flash('Error', 'Los datos númericos del peso son equivocados rango 30.00-200.00 kilogramos');
            res.redirect('/user/editar');
            throw new Error('Los datos númericos del peso son equivocados rango 30.00-200.00 kilogramos');
        }
    }

    const estatura=await pool.query('SELECT est_his from historial WHERE id_his=?',[id]);
    let imc=parseInt(Peso)/Math.pow(parseInt(estatura),2);
    let imcc=[];
    imcc=imc.split(".");
    if(imcc.lenght===2){
        imcc[1].substring(0,2);
        let imcf=imcc[0]+'.'+imcc[1];
    }

    await pool.query('UPDATE historial SET ? WHERE id_his=?', [EditPeso, id]);
    await pool.query('UPDATE historial SET imc_his=? WHERE id_his=?', [imcf, id]);
    req.flash('Success', 'Tu Peso se editó correctamente');
    res.redirect('/user/editar');    
});

router.post('/estatura/:id', isLoggedIn, async (req,res)=>{
    let { id } = req.params;
    let { Estatura } = req.body;
    const EditEstatura = {
        est_his:Estatura.replace(/ {2,}/g,"")
    }

    if(validator.isEmpty(Estatura,{ignore_whitespace:true})==true){
        req.flash('Error','El campo Estatura no puede estar vacio');
        res.redirect('/user/editar');
        throw new Error('El campo Estatura no puede estar vacio');
    }
    let punto2=[];
    punto2=Estatura.toString().split(".");
    if(punto2.length>1){
        if(validator.isFloat(Estatura,{min:1.00, max:2.50})==false){
            req.flash('Error','Los datos númericos de la estatura son equivocados rango 1.00-2.50 metros');
            res.redirect('/user/editar');
            throw new Error('Los datos númericos de la estatura son equivocados rango 1.00-2.50 metros');
        }
        if(punto2[1].length>2){
            punto2[1].substring(0,2);
            peso=punto2[0]+'.'+punto2[1];
        }
    }else if(punto2.length==1){
        if(validator.isInt(Estatura,{min:1, max:2})==false){
            req.flash('Error','Los datos númericos de la estatura son equivocados rango 1.00-2.50 metros');
            res.redirect('/user/editar');
            throw new Error('Los datos númericos de la estatura son equivocados rango 1.00-2.50 metros');
        }
    }
    const peso=await pool.query('SELECT pes_his from historial WHERE id_his=?',[id]);
    let imc=parseInt(peso)/Math.pow(parseInt(Estatura),2);
    let imcc=[];
    imcc=imc.split(".");
    if(imcc.lenght===2){
        imcc[1].substring(0,2);
        let imcf=imcc[0]+'.'+imcc[1];
    }
    await pool.query('UPDATE historial SET ? WHERE id_his=?',[EditEstatura,id]);
    await pool.query('UPDATE historial SET imc_his=? WHERE id_his=?',[imcf,id]);
    req.flash('Succes','Tu estatura se edito correctamente');
    res.redirect('/user/editar');
});

router.get('/exercises', isLoggedIn,async (req, res) => {
    req.app.locals.layout = 'user';
    let intensity = await pool.query('SELECT ren_dep FROM usuario natural join datosusuario WHERE id_usu = ?', [req.user.id_usu]); 
    let pm = await pool.query('SELECT fre_rep FROM usuario natural join datosusuario WHERE id_usu = ?', [req.user.id_usu]); 
    let age = await pool.query('SELECT eda_usu FROM usuario natural join datosusuario WHERE id_usu = ?', [req.user.id_usu]);     
    res.render('user/exercises', {intensity:intensity,pm:pm,age:age});
});

router.get('/pdf', isLoggedIn, (req,res) => {
    res.download(path.join(__dirname, '../docs/Frecuencia-Cardiaca-y-Ejercicio-Fisico.pdf'), (err) => {
        if (err) {
            console.log('Error');
        } else {
            console.log('Descarga finalizada');
        }
    });
});

router.post('/exercises/intensity', isLoggedIn, async(req,res) => {
    let { Intensity } = req.body;

    //Validar la intensidad de 50 a 100 ya
    if(validator.isEmpty(Intensity,{ignore_whitespace:true})==true){
        req.flash('Error', 'Dejo en blanco el campo de Intesidad.');
        res.redirect('/user/exercises');
        throw new Error('Dejo en blanco el campo de Intesidad.');  
    }else if(validator.isInt(Intensity,{gt:49,lt:101})==false){
        req.flash('Error', 'La intensidad solo puede ir de 50 a 100.');
        res.redirect('/user/exercises');
        throw new Error('La intensidad solo puede ir de 50 a 100.'); 
    }else if(validator.isLength(Intensity,{min:2,max:3})==false){
        req.flash('Error', 'La intensidad solo puede tener de 2 a 3 digitos.');
        res.redirect('/user/exercises');
        throw new Error('La intensidad solo puede tener de 2 a 3 digitos.'); 
    }
{

}    let id = await pool.query('SELECT id_ddu FROM usuario natural join datosusuario WHERE id_usu = ?', [req.user.id_usu]);
    
        await pool.query('UPDATE datosusuario set ren_dep=? WHERE id_ddu =?',[Intensity,id[0].id_ddu]);
        res.redirect('/user/exercises');
});

router.post('/exercises/pm', isLoggedIn, async(req,res) => {
    let { Frecuency } = req.body;

    //Validar la frecuencia cardiaca en reposo
    if(validator.isEmpty(Frecuency,{ignore_whitespace:true})==true){
        req.flash('Error', 'Dejo en blanco el campo de frecuencia cardiaca en reposo.');
        res.redirect('/user/exercises');
        throw new Error('Dejo en blanco el campo de frecuencia cardiaca en reposo.');  
    }else if(validator.isNumeric(Frecuency)==false){
        req.flash('Error','Los datos en el campo de frecuencia cardiaca en reposo no son de tipo numerico por favor cambielos.');
        res.redirect('/user/exercises');
        throw new Error('Los datos en el campo de frecuencuia cardiaca en reposo no son de tipo numerico por favor cambielos');
    }else if(validator.isLength(Frecuency,{min:2,max:3})==false){
        req.flash('Error','EL minimo y maximo de digitos que se pueden insertar en la frecuencia en reposo es de 2 a 3.');
        res.redirect('/user/exercises');
        throw new Error('EL minimo y maximo de digitos que se pueden insertar en la frecuencia en reposo es de 2 a 3');
    }

    let id = await pool.query('SELECT id_ddu FROM usuario natural join datosusuario WHERE id_usu = ?', [req.user.id_usu]);
    await pool.query('UPDATE datosusuario set fre_rep=? WHERE id_ddu =?',[Frecuency,id[0].id_ddu]);
    res.redirect('/user/exercises');
});

router.get('/pdffrecuencia', isLoggedIn, (req,res) => {
    res.download(path.join(__dirname, '../docs/Pulsaciones_Por_Minuto.pdf'), (err) => {
        if (err) {
            console.log('Error');
        } else {
            console.log('Descarga finalizada');
        }
    });
});

router.get('/doexercises', isLoggedIn,async (req,res) => {
    req.app.locals.layout = 'user';
    let personalizado;
    let intensidad = await pool.query('SELECT ren_dep FROM usuario natural join datosusuario WHERE id_usu=?',[req.user.id_usu]);
    let reposo = await pool.query('SELECT fre_rep FROM usuario natural join datosusuario WHERE id_usu=?',[req.user.id_usu]);
    let nivel;
    if(parseInt(intensidad[0].ren_dep) >79 && parseInt(intensidad[0].ren_dep)<101){
        nivel = 3;
    }else if(parseInt(intensidad[0].ren_dep) >69 && parseInt(intensidad[0].ren_dep)<81){
        nivel = 2;
    }else if(parseInt(intensidad[0].ren_dep) >49 && parseInt(intensidad[0].ren_dep)<71){
        nivel = 1;
    }    
    let ejercicios = await pool.query('SELECT * FROM AgruparEjercicio NATURAL JOIN ejercicios WHERE id_tde =?',[nivel]);
    if(intensidad[0].ren_dep === null||reposo[0].fre_rep ===null){
        personalizado = exercise.empty();    
    }
    else{
        personalizado = exercise.random(ejercicios);
    }
    res.render('user/doexercises', {personalizado});
});

router.get('/seguimientoUsu', isLoggedIn, (req,res)=>{
    req.app.locals.layout = 'user';
    res.redirect('user/seguimientoUsu');
});

router.get('/tracing', isLoggedIn ,(req,res) => {
    req.app.locals.layout = 'user'
    res.render('user/tracing')
})

module.exports = router;