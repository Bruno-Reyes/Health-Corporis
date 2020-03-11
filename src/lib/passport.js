const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../../database');
const helpers = require('./helpers');
const validator = require('validator');
const help = require('./age')

passport.use('local.login', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async(req,user, password, done) => {
    let pass1 = password;
    console.log(`Usuario: ${user} \n\r Contraseña: ${password}`)
    
    let rows1 = await pool.query('SELECT * FROM Usuario WHERE nom_usu = ?', [user]);
    let exists = false;
    let data;
    if(rows1.length > 0 ){
        exists = true;
        data = rows1[0];
    }
    else{
        let rows2 = await pool.query('SELECT * FROM Usuario WHERE email_usu = ?',[user])
        if(rows2.length > 0){
            exists = true;
            data = rows2[0]
        }
    }

    if(exists){
        let valid = false;
    
        if(user!="Administrador"){
            let pass2 = await helpers.decrypt(data.psw_usu)
            if(pass1===pass2){
                valid = true;
            }
            if(valid){
                done(null, data, req.flash('Exito', 'Bienvenido '));
            }else{
                done(null, false, req.flash('Error','Contraseña Incorrecta'));
            }
        }else if(nom_usu==='Administrador'){
            if(data.con_usu===pass1){
                done(null, data, req.flash('Exito', 'Bienvenido '));
            }else{
                done(null, false, req.flash('Error','Contraseña Incorrecta'));
            }
        }
    }else{
        return done(null, false, req.flash('Error','Usuario Inexistente'));
    }
    
}));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',    
    passReqToCallback: true
}, async(req,user, password, done) =>{
    console.log(req.body);
    
    let existentuser = await pool.query('SELECT * FROM Usuario WHERE nom_usu = ?', [user]);
    if(existentuser.length > 0){
        return done(null, false, req.flash('Error','El usuario ya existe'));
    }
    //Aquì se comienzan a ingresar los datos para registrar al usuario
    
    //Primero se crean todos los objetos para despuès rellenar.
    const newUser = {
        nom_usu : '',
        email_usu : '',
        psw_usu : '',
        id_per : '',
        id_int : 1
    }

    const newPerson = {
        nombre : '',
        apellido : '',
        fec_nac : '',
        fre_rep : 0,
        fre_opt : 0,
        id_gen : '',
        id_fre : '',
        id_enf : ''
    }

    const newSeguimiento = {
        peso : '',
        est_seg : '',
        imc_seg : '',
        fec_reg : '',
        id_per : ''
    }

    let {nombre,apellido,fecha_nacimiento,peso,estatura,email} = req.body
    let fecha = fecha_nacimiento.split('-')
    let edad = help.age(fecha[1],fecha[0])
    
    
    if(edad.age < 30){
        return done(null, false, req.flash('Error','El sistema no funciona con personas menores de 30 años'));
    }
    if(edad.real == false){
        return done(null, false, req.flash('Error','La fecha de nacimiento es incorrecta'));
    }

    newPerson.nombre = nombre
    newPerson.apellido = apellido
    newPerson.fec_nac = fecha_nacimiento
    
    
    if(req.body.Genero == undefined){
        return done(null, false, req.flash('Error','No se selecciono el genero'));
    }
    
    
    if(req.body.Genero == "Masculino"){
        newPerson.id_gen = 1;
    }else if(req.body.Genero == "Femenino"){
        newPerson.id_gen = 2;
    }
     
    let frecuencia = help.frecuencia(req.body.Frecuencia)
    newPerson.id_fre = frecuencia
    
    if(req.body.Enfermedad == undefined){
        return done(null, false, req.flash('Error','No se especifico si sufre alguna enfermedad'));
    }
    if(req.body.Enfermedad == "Ninguna"){
        newPerson.id_enf = 1;
    }else if(req.body.Enfermedad == "Cardiovascular"){
        newPerson.id_enf = 2;
    }else if(req.body.Enfermedad == "Discapacidad Motriz"){
        newPerson.id_enf = 3;
    }
    
    
    
    let persona = await pool.query('insert into Persona set ?', [newPerson]);
    
    newSeguimiento.id_per = persona.insertId
    newUser.id_per = persona.insertId


    newSeguimiento.peso = peso
    newSeguimiento.est_seg = estatura
    peso = parseFloat(peso)
    estatura = parseFloat(estatura)
    estatura = estatura/100
    let imc = peso / (estatura*estatura)
    let simc = imc.toString().substring(0,5);


    newSeguimiento.imc_seg = simc
    
    
    await pool.query('INSERT INTO Seguimiento (peso,est_seg,imc_seg,fec_reg,id_per) values(?,?,?,NOW(),?)', [newSeguimiento.peso,newSeguimiento.est_seg,newSeguimiento.imc_seg,newSeguimiento.id_per])
    
    newUser.nom_usu = user
    newUser.email_usu = email
    newUser.psw_usu = await helpers.encrypt(password)
    console.log(newUser)
    let rs = await pool.query('insert into Usuario set ?', [newUser])
    
    newUser.id_usu = rs.insertId;
    
    return done(null, newUser,  req.flash('Success','Tu registro ha sido exitoso, comienza a disfrutar de nuetro servicio'))
}))

passport.serializeUser((user , done) => {
    done(null, user.id_usu);
});

passport.deserializeUser(async (id , done) => {
    const row = await pool.query('SELECT * FROM Usuario WHERE id_usu = ?', [id]);
    done(null, row[0]);
});