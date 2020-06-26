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
}, async(req, user, password, done) => {
    let pass1 = password;
    console.log(`Usuario: ${user} Contraseña: ${password}`)

    let rows1 = await pool.query('SELECT * FROM Usuario WHERE nom_usu = ?', [user]);
    let exists = false;
    let data;
    if (rows1.length > 0) {
        exists = true;
        data = rows1[0];
    } else {
        let rows2 = await pool.query('SELECT * FROM Usuario WHERE email_usu = ?', [user])
        if (rows2.length > 0) {
            exists = true;
            data = rows2[0]
        }
    }

    if (exists) {
        let valid = false;
        let pass2 = await helpers.decrypt(data.psw_usu)
        if (user != "Administrador") {
            if (pass1 === pass2) {
                valid = true;
            }
            if (valid) {
                done(null, data, req.flash('Exito', 'Bienvenido '));
            } else {
                done(null, false, req.flash('Error', 'Contraseña Incorrecta'));
            }
        } else if (user === 'Administrador') {
            if (pass1 === pass2) {
                done(null, data, req.flash('Exito', 'Bienvenido '));
            } else {
                done(null, false, req.flash('Error', 'Contraseña Incorrecta'));
            }
        }
    } else {
        return done(null, false, req.flash('Error', 'Usuario Inexistente'));
    }

}));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, user, password, done) => {
    console.log(req.body);

    let existentuser = await pool.query('SELECT * FROM Usuario WHERE nom_usu = ?', [user]);
    if (existentuser.length > 0) {
        return done(null, false, req.flash('Error', 'El usuario ya existe'));
    }

    /*if (validator.isEmpty(conPass) == true) {
        return done(null, false, req.flash('Error', 'El campo confirmar contraseña no puede estar vacio'));
    }

    if (validator.equals(conPass, password) == false) {
        return done(null, false, req.flash('Error', 'Las contraseñas no coinciden.'));
    } */


    //Aquì se comienzan a ingresar los datos para registrar al usuario

    //Primero se crean todos los objetos para despuès rellenar.

    const newUser = {
        nom_usu: '',
        email_usu: '',
        psw_usu: '',
        id_per: '',
        id_int: 1,
        id_tdu: 2
    }

    const newPerson = {
        nombre: '',
        apellido: '',
        fec_nac: '',
        fre_rep: 0,
        fre_opt: 0,
        id_gen: '',
        id_fre: '',
        id_enf: ''
    }

    const newSeguimiento = {
        peso: '',
        est_seg: '',
        imc_seg: '',
        fec_reg: '',
        id_per: ''
    }

    let { nombre, apellido, fecha_nacimiento, peso, estatura, email } = req.body
    let userJS = req.body.user
    let passwordJS = req.body.password
    let confirmPasswordJS = req.body.confirm_password
    let fecha = fecha_nacimiento.split('-')
    let edad = help.age(fecha[1], fecha[0])
    console.log(fecha_nacimiento)

    //validaciones del usuario
    if (validator.isEmpty(userJS, { ignore_whitespace: true }) == true) {
        return done(null, false, req.flash('Error', 'El campo Usuario no puede estar vacio'));
    }
    if (validator.isAlphanumeric(userJS) == false) {
        return done(null, false, req.flash('Error', 'El campo Usuario no permite Caracteres especiales'));
    }
    if (validator.isLength(userJS, { min: 5, max: 20 }) == false) {
        return done(null, false, req.flash('Error', 'El campo Usuario va del rango 5-20'));
    }

    //validaciones de la contraseña
    if (validator.isEmpty(passwordJS, { ignore_whitespace: true }) == true) {
        return done(null, false, req.flash('Error', 'El campo contraseña no puede estar vacio'));
    }
    if (validator.isLength(passwordJS, { min: 8, max: 16 }) == false) {
        return done(null, false, req.flash('Error', 'El campo contraseña debe contener de 8 a 16 caracteres'));
    }
    if (validator.isAlphanumeric(passwordJS) == false) {
        return done(null, false, req.flash('Error', 'El campo contraseña no permite Caracteres especiales'));
    }

    //Validacion de la segunda contraseña
    if (validator.isEmpty(confirmPasswordJS) == true) {
        return done(null, false, req.flash('Error', 'El campo confirmar contraseña no puede estar vacio'));
    }
    if (validator.equals(confirmPasswordJS, password) == false) {
        return done(null, false, req.flash('Error', 'Las contraseñas no coinciden.'));
    }

    //validaciones de nombre
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
    }

    //validaciones de apellido
    if (validator.isEmpty(apellido) == true) {
        return done(null, false, req.flash('Error', 'El campo apellido esta vacio'));
    }

    if (validator.isAlpha(apellido.replace(/ /g, "")) == false) {
        return done(null, false, req.flash('Error', 'EL campo apellido solo admite letras.'));
    }

    if (validator.isLength(apellido, { min: 3, max: 25 }) == false) {
        return done(null, false, req.flash('Error', 'El campo apellido debe contener minimo 3 y máximo 25 caracteres'));
    }

    let palabra1 = [];
    palabra1 = apellido.split(" ");
    if (palabra1.length > 1) {
        if (palabra1[1].length > 0) {
            return done(null, false, req.flash('Error', 'El campo apellido debe contener una palabra'));
        }
    }


    //validaciones de peso
    if (validator.isEmpty(peso, { ignore_whitespace: true }) == true) {
        return done(null, false, req.flash('Error', 'El campo peso no puede estar vacio'));
    }
    let punto = [];
    punto = peso.toString().split(".");
    if (punto.length > 1) {
        if (validator.isFloat(peso, { min: 30.00, max: 200.00 }) == false) {
            return done(null, false, req.flash('Error', 'Los datos númericos del peso son equivocados rango 30.00-200.00 kilogramos'));
        }
        if (punto[1].length > 2) {
            punto[1].substring(0, 2);
            peso = punto[0] + '.' + punto[1];
        }
    } else if (punto.length == 1) {
        if (validator.isInt(peso, { min: 30, max: 200 }) == false) {
            return done(null, false, req.flash('Error', 'Los datos númericos del peso son equivocados rango 30.00-200.00 kilogramos'));
        }
    }

    //validaciones de estatura
    if (validator.isEmpty(estatura, { ignore_whitespace: true }) == true) {
        return done(null, false, req.flash('Error', 'El campo Estatura no puede estar vacio'));
    }
    /* let punto2 = [];
    punto2 = estatura.toString().split(".");
    if (punto2.length > 1) {
        if (validator.isFloat(estatura, { min: 1.0, max: 2.5 }) == false) {
            return done(null, false, req.flash('Error', 'Los datos númericos de la estatura son equivocados rango 1.00-2.50 metros'));
        }
        if (punto2[1].length > 2) {
            punto2[1].substring(0, 2);
            peso = punto2[0] + '.' + punto2[1];
        }
    } else if (punto2.length == 1) {
        if (validator.isInt(estatura, { min: 1, max: 2 }) == false) {
            return done(null, false, req.flash('Error', 'Los datos númericos de la estatura son equivocados rango 1.00-2.50 metros'));
        }
    } */


    //validaciones de email
    if (validator.isEmpty(email, { ignore_whitespace: true }) == true) {
        return done(null, false, req.flash('Error', 'El campo email no puede estar vacio'));
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
        return done(null, false, req.flash('Error', 'El campo email no puede tener mas de un arroba o no tener'));
    }
    if (contP > 4 || contP < 1) {
        return done(null, false, req.flash('Error', 'El campo email no puede tener mas de 4 puntos o no tener'));
    }
    if (validator.isLength(email, { min: 8, max: 40 }) == false) {
        return done(null, false, req.flash('Error', 'El campo email va del rango 8-40'));
    }

    //validaciones de edad
    if (edad.age < 30) {
        return done(null, false, req.flash('Error', 'El sistema no funciona con personas menores de 30 años'));
    }
    if (edad.real == false) {
        return done(null, false, req.flash('Error', 'La fecha de nacimiento es incorrecta'));
    }


    //Fin de la validacion del registro
    newPerson.nombre = nombre;
    newPerson.apellido = apellido;
    newPerson.fec_nac = fecha_nacimiento;


    if (req.body.Genero == undefined) {
        return done(null, false, req.flash('Error', 'No se selecciono el genero'));
    }

    if (req.body.Genero == "Masculino") {
        newPerson.id_gen = 1;
    } else if (req.body.Genero == "Femenino") {
        newPerson.id_gen = 2;
    }

    let frecuencia = help.frecuencia(req.body.Frecuencia)
    newPerson.id_fre = frecuencia

    if (req.body.Enfermedad == undefined) {
        return done(null, false, req.flash('Error', 'No se especifico si padece de alguna enfermedad'));
    }
    if (req.body.Enfermedad == "Ninguna") {
        newPerson.id_enf = 1;
    } else if (req.body.Enfermedad == "Cardiovascular") {
        newPerson.id_enf = 2;
    } else if (req.body.Enfermedad == "Discapacidad Motriz") {
        newPerson.id_enf = 3;
    }



    let persona = await pool.query('insert into Persona set ?', [newPerson]);

    newSeguimiento.id_per = persona.insertId
    newUser.id_per = persona.insertId


    newSeguimiento.peso = peso
    newSeguimiento.est_seg = estatura
    peso = parseFloat(peso)
    estatura = parseFloat(estatura)
    estatura = estatura / 100
    let imc = peso / (estatura * estatura)
    let simc = imc.toString().substring(0, 5);


    newSeguimiento.imc_seg = simc


    await pool.query('INSERT INTO Seguimiento (peso,est_seg,imc_seg,fec_reg,id_per) values(?,?,?,NOW(),?)', [newSeguimiento.peso, newSeguimiento.est_seg, newSeguimiento.imc_seg, newSeguimiento.id_per])

    newUser.nom_usu = user
    newUser.email_usu = email
    newUser.psw_usu = await helpers.encrypt(password)
    console.log(newUser)
    let rs = await pool.query('insert into Usuario set ?', [newUser])

    newUser.id_usu = rs.insertId;

    return done(null, newUser, req.flash('Success', 'Tu registro ha sido exitoso, comienza a disfrutar de nuetro servicio'))
}))

passport.serializeUser((user, done) => {
    done(null, user.id_usu);
});

passport.deserializeUser(async(id, done) => {
    let row
    if (id === 1) {
        row = await pool.query('SELECT * FROM Usuario where id_usu = ?', [id])
    } else {
        row = await pool.query('SELECT * FROM Usuario natural join Persona natural join Genero WHERE id_usu = ?', [id]);
    }

    if (row[0].id_tdu === 2) {
        if (row[0].nom_gen === "Femenino") {
            delete row[0].nom_gen
        }
    }
    done(null, row[0]);
});