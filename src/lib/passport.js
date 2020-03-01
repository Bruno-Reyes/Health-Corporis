const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');
const validator = require('validator');
passport.use('local.login', new LocalStrategy({
    usernameField: 'nom_usu',
    passwordField: 'con_usu',
    passReqToCallback: true
}, async(req,nom_usu, con_usu, done) => {
    let pass1 = con_usu;
    console.log(`Usuario: ${nom_usu} \n\r Contraseña: ${con_usu}`)
    let rows = await pool.query('SELECT * FROM usuario WHERE nom_usu = ?', [nom_usu]);
    if(rows.length > 0 ){
        let valid = false;
        const user = rows[0];
        
        if(nom_usu!="Administrador"){
            let pass2 = await helpers.decrypt(user.con_usu)
            if(pass1===pass2){
                valid = true;
            }
            if(valid){
                done(null, user, req.flash('Exito', 'Bienvenido '));
            }else{
                done(null, false, req.flash('Error','Contraseña Incorrecta'));
            }
        }else if(nom_usu==='Administrador'){
            if(user.con_usu===pass1){
                done(null, user, req.flash('Exito', 'Bienvenido '));
            }else{
                done(null, false, req.flash('Error','Contraseña Incorrecta'));
            }
        }        
    }else{
        return done(null, false, req.flash('Error','Usuario Inexistente'));
    }
}));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'nom_usu',
    passwordField: 'con_usu',    
    passReqToCallback: true
}, async(req,nom_usu, con_usu, done) =>{
    
    //Se crea objeto para insertar los datos del usuario
    let newData = {
        id_per : '',
        id_gen : '',
        id_his: '',
        id_seg: '',
        eda_usu: 0,
        cal_nec: 2000
    }
    let { primero, segundo, paterno, materno, edad, peso , estatura } = req.body;
    let termino = req.body.Terminos;
    if(!(termino==="Aceptado")){
        return done(null, false, req.flash('Error','Debes aceptar los terminos y condiciones'));
    }
    //Se crean e insertan los nombres del usuario
    
    
    let newPerson = {
        
        pri_nom: primero.replace(/ {2,}/g," "),
        sec_nom: '',
        ape_pat: paterno.replace(/ {2,}/g," "),
        ape_mat: materno.replace(/ {2,}/g," ")
    }

    if(segundo.length > 0){
        newPerson.sec_nom = segundo.replace(/ {2,}/g," ");
    }
    
    //validar primer nombre
    if(validator.isEmpty(primero,{ignore_whitespace:true})==true){
        return done(null, false, req.flash('Error','El campo Primer nombre esta vacio'));
    }
    if(validator.isAlpha(primero.replace(/ /g,""))==false){
        return done(null, false, req.flash('Error','El campo primer nombre solo debe contener letras'));
    }
    if(validator.isLength(primero,{min:3,max:25})==false){
        return done(null, false, req.flash('Error','El campo Primer nombre debe de ser de minimo 3 y mámixo 25 caracteres'));
    }    
    let palabra=[];
    palabra=primero.split(" ");    
    if(palabra.length>1){
        if(palabra[1].length>0){
            return done(null, false, req.flash('Error','El campo primer nombre solo debe contener una palabra'));
        }
    }
    //segundo nombre
    if(segundo.length>0){
        if(validator.isEmpty(segundo,{ignore_whitespace:true})==true){
            return done(null, false, req.flash('Error','El campo Segundo nombre esta vacio'));
        }
        if(validator.isAlpha(segundo.replace(/ /g,""))==false){
            return done(null, false, req.flash('Error','El campo Segundo nombre solo debe contener letras'));
        }
        if(validator.isLength(segundo,{min:3,max:20})==false){
            return done(null, false, req.flash('Error','El campo Segundo nombre debe de ser de minimo 3 y mámixo 20 caracteres'));
        }    
        let palabra2=[];
        palabra2=segundo.split(" ");            
        if(palabra2.length==2){
            if(validator.isLength(palabra2[0],{min:2,max:3})==false){
                return done(null, false, req.flash('Error','El campo Segundo nombre es erroneo'));
            }
            if(validator.isLength(palabra2[1],{min:4,max:10})==false){
                return done(null, false, req.flash('Error','El campo Segundo nombre es erroneo'));
            }
        }
        if(palabra2.length>2){
            return done(null, false, req.flash('Error','El campo Segundo nombre es erroneo'));
        }        
    }
    //Apellido paterno
    if(validator.isEmpty(paterno,{ignore_whitespace:true})==true){
        return done(null, false, req.flash('Error','El campo apellido paterno esta vacio'));
    }
    if(validator.isAlpha(paterno.replace(/ /g,""))==false){
        return done(null, false, req.flash('Error','El campo apellido paterno solo debe contener letras'));
    }
    if(validator.isLength(paterno,{min:4,max:20})==false){
        return done(null, false, req.flash('Error','El campo apellido paterno debe de ser de minimo 3 y mámixo 20 caracteres'));
    }        
    let palabra3=[];
    palabra3=paterno.split(" ");    
    if(palabra3.lenght==2){
        if(validator.isLength(palabra3[0],{min:2,max:3})==false){
            return done(null, false, req.flash('Error','El campo apellido paterno es erroneo'));
        }
        if(validator.isLength(palabra3[1],{min:4,max:10})==false){
            return done(null, false, req.flash('Error','El campo apellido paterno es erroneo'));
        }
    }    
    if(palabra3.lenght==3){
        if(validator.isLength(palabra3[0],{min:2,max:2})==false){
            return done(null, false, req.flash('Error','El campo apellido paterno es erroneo'));
        }
        if(validator.isLength(palabra3[1],{min:2,max:2})==false){
            return done(null, false, req.flash('Error','El campo apellido paterno es erroneo'));
        }
        if(validator.isLength(palabra3[2],{min:4,max:10})==false){
            return done(null, false, req.flash('Error','El campo apellido paterno es erroneo'));
        }
    }
    if(palabra3.length>3){
        return done(null, false, req.flash('Error','El campo apellido paterno es erroneo'));
    }

    //Apellido materno
    if(validator.isEmpty(materno,{ignore_whitespace:true})==true){
        return done(null, false, req.flash('Error','El campo Apellido Materno esta vacio'));
    }
    if(validator.isAlpha(materno.replace(/ /g,""))==false){
        return done(null, false, req.flash('Error','El campo Apellido Materno solo debe contener letras'));
    }
    if(validator.isLength(materno,{min:4,max:20})==false){
        return done(null, false, req.flash('Error','El campo Apellido Materno debe de ser de minimo 3 y mámixo 20 caracteres'));
    }    
    
    //Edad
    if(validator.isEmpty(edad,{ignore_whitespace:true})==true){
        return done(null, false, req.flash('Error','El Campo Edad no puede estar vacio'));
    }
    if(validator.isInt(edad,{min:18,max:50})==false){
        return done(null, false, req.flash('Error','La edad esta incorrecta, rango 18-50'));
    }
    
    //Peso
    if(validator.isEmpty(peso,{ignore_whitespace:true})==true){
        return done(null, false, req.flash('Error','El Campo Peso no puede estar vacio'));
    }    
    let punto=[];
    punto=peso.toString().split(".");
    if(punto.length>1){
        if(validator.isFloat(peso,{min:30.00, max:200.00})==false){
            return done(null, false, req.flash('Error','Los datos númericos del peso son equivocados rango 30.00-200.00 kilogramos'));
        }
        if(punto[1].length>2){
            punto[1].substring(0,2);
            peso=punto[0]+'.'+punto[1];
        }
    }else if(punto.length==1){
        if(validator.isInt(peso,{min:30, max:200})==false){
            return done(null, false, req.flash('Error','Los datos númericos del peso son equivocados rango 30.00-200.00 kilogramos'));
        }
    }

    //estatura
    if(validator.isEmpty(estatura,{ignore_whitespace:true})==true){
        return done(null, false, req.flash('Error','El campo Estatura no puede estar vacio'));
    }
    let punto2=[];
    punto2=estatura.toString().split(".");
    if(punto2.length>1){
        if(validator.isFloat(estatura,{min:1.00, max:2.50})==false){
            return done(null, false, req.flash('Error','Los datos númericos de la estatura son equivocados rango 1.00-2.50 metros'));
        }
        if(punto2[1].length>2){
            punto2[1].substring(0,2);
            peso=punto2[0]+'.'+punto2[1];
        }
    }else if(punto2.length==1){
        if(validator.isInt(estatura,{min:1, max:2})==false){
            return done(null, false, req.flash('Error','Los datos númericos de la estatura son equivocados rango 1.00-2.50 metros'));
        }
    }
    
    //Nombre de usuario
    if(validator.isEmpty(nom_usu,{ignore_whitespace:true})==true){
        return done(null, false, req.flash('Error','El campo Usuario no puede estar vacio'));
    }
    if(validator.isAlphanumeric(nom_usu)==false){
        return done(null, false, req.flash('Error','El campo Usuario no permite Caracteres especiales'));
    }
    if(validator.isLength(nom_usu,{min:8,max:20})==false){
        return done(null, false, req.flash('Error','El campo Usuario va del rango 8-20'));
    } 
    //peña    
    if(validator.isEmpty(con_usu,{ignore_whitespace:true})==true){
        return done(null, false, req.flash('Error','El campo Contraseña no puede estar vacio'));
    } 
    if(validator.isLength(con_usu,{min:8,max:20})==false){
        return done(null, false, req.flash('Error','El campo Contraseña va del rango 8-20'));
    }
    //usuraio con el mismo nombre
    let existentuser = await pool.query('SELECT * FROM usuario WHERE nom_usu = ?', [nom_usu]);
    if(existentuser.length > 0){
        return done(null, false, req.flash('Error','El usuario ya existe'));
    }

    //aqui termina la validacion♥♥ \(^u^)/  UWU 

    const persona = await pool.query('insert into nombre set ?', [newPerson]);
    //Se recupera el id del insert
    newData.id_per = persona.insertId;

    //Insertar genero
    
    if(req.body.customRadio == null){
        return done(null, false, req.flash('Error','No se selecciono el genero'));
    }
    if(req.body.customRadio == "Masculino"){
        newData.id_gen = 1;
    }else if(req.body.customRadio == "Femenino"){
        newData.id_gen = 2;
    }

    //Insertar en historial y en seguimiento
    let newHis = {
        pes_his: '',
        est_his: '',
        imc_his: '',
        fdr_his: '',
    }
    let newSeg = {
        pes_usu: '',
        est_usu: '',
        imc_usu: '',
        fdr_usu: '',
    }
    let fpeso = parseFloat(peso);
    let festatura = parseFloat(estatura);
    let imc = (fpeso) / (festatura*festatura);
    let simc = imc.toString().substring(0,5);
    
    newHis.pes_his = peso.replace(/ /g,"");
    newHis.est_his = estatura.replace(/ /g,"");
    newHis.imc_his = simc;
    newSeg.pes_usu = peso.replace(/ /g,"");
    newSeg.est_usu = estatura.replace(/ /g,"");
    newSeg.imc_usu = simc;

    
    //Se obtiene la fecha y se compone en formato para mysql
    let date = new Date();
    let fecha = date.getFullYear() + "/" + (date.getMonth() +1) + "/" + date.getDate()
    newHis.fdr_his = fecha;
    newSeg.fdr_usu = fecha;
    const idhistorial = await pool.query('insert into historial (pes_his, est_his, imc_his, fdr_his) values (?,?,?,?)', [newHis.pes_his,newHis.est_his,newHis.imc_his,newHis.fdr_his]);
    const idseguimiento = await pool.query('insert into seguimiento (pes_usu, est_usu, imc_usu, fdr_usu) values (?,?,?,?)', [newSeg.pes_usu,newSeg.est_usu,newSeg.imc_usu,newSeg.fdr_usu]);
    newData.id_his = idhistorial.insertId;
    newData.id_seg = idseguimiento.insertId;
    //Insertar edad
    newData.eda_usu = parseInt(edad);
    
    //Se deben calcular las kilocalorias e insertar en la tabl

    //Se insertan los datos del usuario en la tabla datosusuario
    const iddatosusuario = await pool.query('INSERT INTO datosusuario set ?', [newData]);

    const newUser = {
        nom_usu : nom_usu,
        con_usu: '',
        id_tdu: 2,
        id_ddu: ''
    };
    newUser.id_ddu = iddatosusuario.insertId;
    newUser.con_usu = await helpers.encrypt(con_usu);
    const rs = await pool.query('insert into usuario (nom_usu,con_usu,id_tdu,id_ddu) values(?,?,?,?);', [newUser.nom_usu,newUser.con_usu,newUser.id_tdu,newUser.id_ddu]);
    newUser.id_usu = rs.insertId;
    return done(null, newUser,  req.flash('Success','Tu registro ha sido exitoso, comienza a disfrutar de nuetro servicio'));
}));

passport.serializeUser((user , done) => {
    done(null, user.id_usu);
});

passport.deserializeUser(async (id , done) => {
    const row = await pool.query('SELECT * FROM usuario WHERE id_usu = ?', [id]);
    done(null, row[0]);
});