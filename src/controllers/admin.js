const controller = {};
const pool = require('../database');
const validator = require('validator');

controller.listusers = async(req,res) => {
    req.app.locals.layout = 'admin';
    let id = 1;
    const listusers =await pool.query('SELECT id_usu,nom_usu, pri_nom , sec_nom, ape_pat, ape_mat, eda_usu, fdr_his FROM usuario NATURAL JOIN datosusuario NATURAL JOIN nombre NATURAL JOIN historial WHERE id_tdu = ?;', [id]);
    res.render('admin/listusers', {listusers});
}

controller.userdelete = async(req,res) => {
    req.app.locals.layout = 'admin';
    let {id} = req.params;
    await pool.query('DELETE FROM usuario WHERE id_usu = ?', [id]);
    req.flash('Success', 'Usuario eliminado con éxito');
    res.redirect('/admin/users');
}

controller.listfood = async (req,res) => {
    req.app.locals.layout = 'admin';
    const listfood = await pool.query('SELECT nga_gal,nda_ali,num_udm,id_ali FROM alimento  NATURAL JOIN agrupar_alimento NATURAL JOIN grupo_alimenticio NATURAL JOIN unidadmedida');
    res.render('admin/listfood', {listfood});
}

controller.listfood2 = async (req,res) => {
    req.app.locals.layout = 'admin';
    const listfood = await pool.query('SELECT nga_gal,nda_ali,num_udm,id_ali FROM alimento  NATURAL JOIN agrupar_alimento NATURAL JOIN grupo_alimenticio NATURAL JOIN unidadmedida WHERE nga_gal = "Fruta"');
    res.render('admin/listfood', {listfood});
}

controller.listfood3 = async (req,res) => {
    req.app.locals.layout = 'admin';
    const listfood = await pool.query('SELECT nga_gal,nda_ali,num_udm,id_ali FROM alimento  NATURAL JOIN agrupar_alimento NATURAL JOIN grupo_alimenticio NATURAL JOIN unidadmedida WHERE nga_gal = "Verdura"');
    res.render('admin/listfood', {listfood});
}

controller.listfood4 = async (req,res) => {
    req.app.locals.layout = 'admin';
    const listfood = await pool.query('SELECT nga_gal,nda_ali,num_udm,id_ali FROM alimento  NATURAL JOIN agrupar_alimento NATURAL JOIN grupo_alimenticio NATURAL JOIN unidadmedida WHERE nga_gal = "Leche y Sustitutos"');
    res.render('admin/listfood', {listfood});
}

controller.listfood5 = async (req,res) => {
    req.app.locals.layout = 'admin';
    const listfood = await pool.query('SELECT nga_gal,nda_ali,num_udm,id_ali FROM alimento  NATURAL JOIN agrupar_alimento NATURAL JOIN grupo_alimenticio NATURAL JOIN unidadmedida WHERE nga_gal = "Colacion"');
    res.render('admin/listfood', {listfood});
}

controller.listfood6 = async (req,res) => {
    req.app.locals.layout = 'admin';
    const listfood = await pool.query('SELECT nga_gal,nda_ali,num_udm,id_ali FROM alimento  NATURAL JOIN agrupar_alimento NATURAL JOIN grupo_alimenticio NATURAL JOIN unidadmedida WHERE nga_gal = "Origen Animal"');
    res.render('admin/listfood', {listfood});
}

controller.listfood7 = async (req,res) => {
    req.app.locals.layout = 'admin';
    const listfood = await pool.query('SELECT nga_gal,nda_ali,num_udm,id_ali FROM alimento  NATURAL JOIN agrupar_alimento NATURAL JOIN grupo_alimenticio NATURAL JOIN unidadmedida WHERE nga_gal = "Leguminosa"');
    res.render('admin/listfood', {listfood});
}

controller.listfood8 = async (req,res) => {
    req.app.locals.layout = 'admin';
    const listfood = await pool.query('SELECT nga_gal,nda_ali,num_udm,id_ali FROM alimento  NATURAL JOIN agrupar_alimento NATURAL JOIN grupo_alimenticio NATURAL JOIN unidadmedida WHERE nga_gal = "Grasa"');
    res.render('admin/listfood', {listfood});
}

controller.listfood9 = async (req,res) => {
    req.app.locals.layout = 'admin';
    const listfood = await pool.query('SELECT nga_gal,nda_ali,num_udm,id_ali FROM alimento  NATURAL JOIN agrupar_alimento NATURAL JOIN grupo_alimenticio NATURAL JOIN unidadmedida WHERE nga_gal = "cereal"');
    res.render('admin/listfood', {listfood});
}

controller.addfood = async(req,res) => {
    let { Alimento, GrupoAlimenticio, UnidadMedida } = req.body;
    //Aqui se debe validar el alimento 
    let aliblank=Alimento.replace(/ /g,'');
    if(validator.isEmpty(Alimento,{ignore_whitespace:true})==true){
        req.flash('Error','El campo Nombre del alimento esta vacio');
        res.redirect('/admin/food');
        throw new Error('El campo de nombre de alimento esta vacio');
    }
    else if(validator.isAlpha(aliblank)==false){
        req.flash('Error','El campo nombre del alimento solo debe contener letras');
        res.redirect('/admin/food');
        throw new Error('El campo nombre del alimento solo debe contener letras');
    }
    else if(validator.isLength(Alimento,{min:3,max:50})==false){
        req.flash('Error','El campo de alimento debe de ser de 3-50 caracteres');
        res.redirect('/admin/food');
        throw new Error('El campo de alimento debe de ser de 3-50 caracteres');
    }
    else if(validator.isLength(GrupoAlimenticio,{min:1,max:1})==false){
        req.flash('Error','El grupo alimenticio no es valido ó no selecciono.');
        res.redirect('/admin/food');
        throw new Error('El grupo alimenticio no es valido ó no selecciono.');
    }
    else if(validator.isNumeric(GrupoAlimenticio)==false){
        req.flash('Error','Elige una opción del Grupo Alimenticio.');
        res.redirect('/admin/food'); 
        throw new Error('Elige una opcion del grupo alimenticio.');   
    }   
    const newAlimento = {
        nda_ali : Alimento.replace(/ {2,}/g,' '),        
        id_udm : parseInt(UnidadMedida)
    }

    const newAgruparAlimento={
        id_gal : parseInt(GrupoAlimenticio),
        id_ali : ''
    }

    const idAlimento=await pool.query('INSERT INTO alimento set ?', [newAlimento]);
    newAgruparAlimento.id_ali=idAlimento.insertId;
    
    await pool.query('INSERT INTO agrupar_alimento set ?', [newAgruparAlimento]);
    req.flash('Success', `El alimento ${newAlimento.nda_ali} se agregó con éxito`);
    res.redirect('/admin/food');
}

controller.fooddelete = async(req,res) => {
    let {id} = req.params;
    await pool.query('DELETE FROM agrupar_alimento WHERE id_ali = ?', [id]);
    await pool.query('DELETE FROM alimento WHERE id_ali = ?', [id]);
    req.flash('Success', 'Alimento eliminado con éxito');
    res.redirect('/admin/food');
}

controller.foodeditrender = async(req,res) => {
    let {id} = req.params;
    const food = await pool.query('SELECT * FROM alimento  NATURAL JOIN agrupar_alimento NATURAL JOIN grupo_alimenticio NATURAL JOIN unidadmedida WHERE id_ali =?', [id]);
    req.app.locals.layout = 'admin';
    res.render('admin/edit', {food});
}

controller.foodedit = async(req,res) => {
    let {id} = req.params;
    let { Alimento, GrupoAlimenticio, UnidadMedida } = req.body;    
    Alimento=Alimento.replace(/ {2,}/g,' ');
    let aliblank=Alimento.replace(/ /g,'');
    if(validator.isEmpty(Alimento,{ignore_whitespace:true})==true){
        req.flash('Error','El campo Alimento esta vacio');
        res.redirect('/admin/food');
        throw new Error('El campo Alimento esta vacio.');
    }

    if(validator.isAlpha(aliblank)==false){
        req.flash('Error','El campo Nombre del Alimento solo debe contener letras.');
        res.redirect('/admin/food');
        throw new Error('Elija una opcion del grupo alimenticio.');        
    }

    if(validator.isLength(Alimento, {min:3,max:50})==false){
        req.flash('Error','El campo Nombre del Alimento solo debe contener de 3 a 50 caracteres.');
        res.redirect('/admin/food');
        throw new Error('El campo del nombre de alimento solo debe de contener de 3 a 50 caracteres.');
    }

    //Se hace la consulta a las tablas del grupo alienticio y de la Unidad para sacar el id
    let GrupoId = await pool.query('SELECT id_gal FROM grupo_alimenticio WHERE nga_gal = ?',[GrupoAlimenticio]);    
    let UnidadId = await pool.query('SELECT id_udm FROM unidadmedida WHERE num_udm = ?',[UnidadMedida]);    
    let AgruparAliId = await pool.query('SELECT id_ada FROM agrupar_alimento WHERE id_ali = ?',[id]);    
    GrupoId = GrupoId[0];
    UnidadId = UnidadId[0];
    AgruparAliId = AgruparAliId[0];
    const editedAlimento = {
        nda_ali : Alimento,        
        id_udm : UnidadId.id_udm
    }

    const editedAgruparAlimento={
        id_gal : GrupoId.id_gal        
    }

    await pool.query('UPDATE alimento set ? WHERE id_ali = ?', [editedAlimento,id]);
    await pool.query('UPDATE agrupar_alimento set ? WHERE id_ada=?',[editedAgruparAlimento,AgruparAliId.id_ada]);
    req.flash('Success', `El alimento ${editedAlimento.nda_ali} se editado con éxito`);
    res.redirect('/admin/food');
}

controller.listtips = async(req,res) => {
    const tips =await pool.query('SELECT * FROM consejos');
    req.app.locals.layout = 'admin';
    res.render('admin/listtips', {tips});
}

controller.tipaddrender = (req,res) => {
    req.app.locals.layout = 'admin';
    res.render('admin/addtip');
}

controller.tipadd = async(req,res) => {
    let { Titulo, Descripcion } = req.body;

    if (validator.isEmpty(Titulo, {ignore_whitespace:true})==true){
        req.flash('Error','El titulo del tip no puede estar vacio.');
        res.redirect('/admin/tips');
        throw new Error('El Titulo del tip no puede estar vacio.');
    }
    if(validator.isLength(Titulo, {min:5,max:40})==false){
        req.flash('Error','El titulo del tip no puede ser menor que 5 y mayor que 40.');
        res.redirect('/admin/tips');
        throw new Error('El Titulo del tip no puede ser menor que 5 y mayor que 40.');
    }
    if(validator.isEmpty(Descripcion, {ignore_whitespace:true})==true){
        req.flash('Error','La descripción del tip no puede estar vacio.');
        res.redirect('/admin/tips');
        throw new Error('La descripión del tip no puede estar vacio.');
    }
    if(validator.isLength(Descripcion, {min:10,max:250})==false){
        req.flash('Error','La descripcion del tip no puede ser menor que 10 y mayor 250.');
        res.redirect('/admin/tips');
        throw new Error('La descripcion del tip no puede ser menor que 10 y mayor 250.');
    }

    let newCon = {
        tit_con : Titulo,
        des_con : Descripcion
    }
    await pool.query('INSERT INTO consejos set ?',[newCon]);
    req.flash('Exito', 'Gracias, has agregado un nuevo consejo. ♥');
    res.redirect('/admin/tips');
}

controller.deletetip = async(req,res) => {
    let {id} = req.params;
    await pool.query('DELETE FROM consejos WHERE id_con = ?', [id]);
    req.flash('Success', 'Consejo eliminado con éxito');
    res.redirect('/admin/tips');
}

controller.edittipsrender =  async(req,res) => {
    let {id} = req.params;
    const tip = await pool.query('SELECT * FROM consejos WHERE id_con =?', [id]);
    
    req.app.locals.layout = 'admin';
    res.render('admin/edittips', {tip});
}
controller.edittips= async(req,res)=>{
    let{id}=req.params;
    let {Titulo,Descripcion}=req.body;

    if (validator.isEmpty(Titulo, {ignore_whitespace:true})==true){
        req.flash('Error','El titulo del tip no puede estar vacio.');
        res.redirect('/admin/tips');
        throw new Error('El Titulo del tip no puede estar vacio.');
}
if(validator.isLength(Titulo, {min:5,max:40})==false){
        req.flash('Error','El titulo del tip no puede ser menor que 5 y mayor que 40.');
        res.redirect('/admin/tips');
        throw new Error('El Titulo del tip no puede ser menor que 5 y mayor que 40.');
}
if(validator.isEmpty(Descripcion, {ignore_whitespace:true})==true){
        req.flash('Error','La descripción del tip no puede estar vacio.');
        res.redirect('/admin/tips');
        throw new Error('La descripión del tip no puede estar vacio.');
}
if(validator.isLength(Descripcion, {min:10,max:250})==false){
        req.flash('Error','La descripcion del tip no puede ser menor que 10 y mayor 250.');
        res.redirect('/admin/tips');
        throw new Error('La descripcion del tip no puede ser menor que 10 y mayor 250.');
}

    const edittip={
        tit_con: Titulo,
        des_con: Descripcion
    }
    await pool.query('UPDATE consejos set ? WHERE id_con=?',[edittip,id]);
    req.flash('Success', `El consejo se edito de forma correcta`);
    res.redirect('/admin/tips');
}

controller.listexercises = async (req,res) => {
    const exercises = await pool.query('SELECT * FROM ejercicios');
    req.app.locals.layout = 'admin';
    res.render('admin/listexercises', {exercises});
}

controller.deleteexercises = async (req,res) => {
    let {id} = req.params;
    await pool.query('DELETE FROM ejercicios WHERE id_eje = ?', [id]);
    req.flash('Success', 'Ejercicio eliminado con éxito');
    res.redirect('/admin/exercises');
}

controller.exerciseaddrender = (req,res) => {
    req.app.locals.layout = 'admin';
    res.render('admin/addexercise');
}

controller.exerciseadd = async (req,res) => {
    let { Titulo, Descripcion, Intensidad } = req.body;

    //Validar ejercicio 

    /* if(validator.isEmpty(Titulo,{ignore_whitespace:true})==true){
        req.flash('Error','El titulo del Ejercicio no puede estar vacio.');
        res.redirect('/admin/exercises');
}
    } */

    /* if(validator.isEmpty(Titulo,{ignore_whitespace:true})==true){
        req.flash('Error','El titulo del Ejercicio no puede estar vacio.');
        res.redirect('/admin/exercises');
        throw new Error('El titulo del Ejercicio no puede estar vacio.');
    }else if(validator.isEmpty(Descripcion,{ignore_whitespace:true})==true){
        req.flash('Error','La descripcion del ejercicio no puede estar vacio.');
        res.redirect('/admin/exercises');
        throw new Error('La descripcion del ejercicio no puede estar vacio.');
    }else if(validator.isAlphaNumeric()){
    } */

    if(validator.isEmpty(Titulo)==true){
        req.flash('Error','El titulo del Ejercicio no puede estar vacio.');
        res.redirect('/admin/exercises');
        throw new Error('El titulo del Ejercicio no puede estar vacio.');
    }else if(validator.isEmpty(Descripcion)==true){
        req.flash('Error','La descripcion del ejercicio no puede estar vacio.');
        res.redirect('/admin/exercises');
        throw new Error('La descripcion del ejercicio no puede estar vacio.');
    }else if(validator.isLength(Titulo,{min:5,max:20})==false){
        req.flash('Error','El titulo solo acepta de 5 a 20 caracteres.');
        res.redirect('/admin/exercises');
        throw new Error('El titulo solo acepta de 5 a 20 caracteres.');
    }else if(validator.isLength(Descripcion,{min:20,max:1000})==false){
        req.flash('Error','La descripcion solo acepta de 20 a 1000 caracteres.');
        res.redirect('/admin/exercises');
        throw new Error('La descripcion solo acepta de 20 a 1000 caracteres.');
    }else if(validator.isInt(Intensidad,{gt:1,lt:3})==false){
        req.flash('Error','Seleccione una intensidad.');
        res.redirect('/admin/exercises');
        throw new Error('Seleccione una intensidad.');
    }
    
    
    let newEje = {
       nom_eje : Titulo,
        des_eje : Descripcion,
        img_eje : '/img/rollbacks.png'
    }

    let newAGE = {
        id_tde : parseInt(Intensidad),
        id_eje : '',
    }

    let ejercicio = await pool.query('INSERT INTO ejercicios set ?',[newEje]);

    newAGE.id_eje = parseInt(ejercicio.insertId);
    await pool.query('INSERT INTO agruparejercicio set ?',[newAGE]);
    console.log(newEje,newAGE);
    req.flash('Exito', 'Gracias, has contribuido con un ejercicio más');
    res.redirect('/admin/exercises');
}

controller.editexerciserender = async (req,res) => {
    let {id} = req.params;
    const exercise = await pool.query('SELECT * FROM ejercicios WHERE id_eje =?', [id]);
    req.app.locals.layout = 'admin';
    res.render('admin/editexercise', {exercise});
}

controller.editexercises= async(req,res)=>{
    let{id}=req.params;
    let {Titulo,Descripcion}=req.body;



    /* if (validator.isEmpty(Titulo, {ignore_whitespace:true})==true){
        req.flash('Error','El titulo del tip no puede estar vacio.');
        res.redirect('/admin/tips');
        throw new Error('El Titulo del tip no puede estar vacio.');
    }
    if(validator.isLength(Titulo, {min:5,max:40})==false){
        req.flash('Error','El titulo del tip no puede ser menor que 5 y mayor que 40.');
        res.redirect('/admin/tips');
        throw new Error('El Titulo del tip no puede ser menor que 5 y mayor que 40.');
    }
    if(validator.isEmpty(Descripcion, {ignore_whitespace:true})==true){
        req.flash('Error','La descripción del tip no puede estar vacio.');
        res.redirect('/admin/tips');
        throw new Error('La descripión del tip no puede estar vacio.');
    }
    if(validator.isLength(Descripcion, {min:10,max:250})==false){
        req.flash('Error','La descripcion del tip no puede ser menor que 10 y mayor 250.');
        res.redirect('/admin/tips');
        throw new Error('La descripcion del tip no puede ser menor que 10 y mayor 250.');
    } */

    if(validator.isEmpty(Titulo,{ignore_whitespace:true})==true){
        req.flash('Error','El titulo del Ejercicio no puede estar vacio.');
        res.redirect('/admin/exercises');
        throw new Error('El titulo del Ejercicio no puede estar vacio.');
    }else if(validator.isEmpty(Descripcion,{ignore_whitespace:true})==true){
        req.flash('Error','La descripcion del ejercicio no puede estar vacio.');
        res.redirect('/admin/exercises');
        throw new Error('La descripcion del ejercicio no puede estar vacio.');
    }else if(validator.isAlphanumeric(Titulo)==false){
        req.flash('Error','El titulo solo acepta letras y numeros.');
        res.redirect('/admin/exercises');
        throw new Error('El titulo solo acepta letras y numeros.');
    }else if(validator.isAlphanumeric(Descripcion)==false){
        req.flash('Error','La descripcion solo acepta letras y numeros.');
        res.redirect('/admin/exercises');
        throw new Error('La descripcion solo acepta letras y numeros.');
    }else if(validator.isLength(Titulo,{min:5,max:20})==false){
        req.flash('Error','El titulo solo acepta de 5 a 20 caracteres.');
        res.redirect('/admin/exercises');
        throw new Error('El titulo solo acepta de 5 a 20 caracteres.');
    }else if(validator.isLenght(Descripcion,{min:20,max:1000})==false){
        req.flash('Error','La descripcion solo acepta de 20 a 1000 caracteres.');
        res.redirect('/admin/exercises');
        throw new Error('La descripcion solo acepta de 20 a 1000 caracteres.');
    }    
    const editExercise={
        nom_eje: Titulo,
        des_eje: Descripcion,
        img_eje: '/img/rollbacks.png'
    };
    await pool.query('UPDATE ejercicicios set ? WHERE id_eje=?',[editExercise,id]);
    req.flash('Success', `El ejercicio se edito de forma correcta`);
    res.redirect('/admin/exercises');
}



module.exports = controller;