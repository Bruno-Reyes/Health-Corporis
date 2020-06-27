const { Schema, model } = require("mongoose");

const TipSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    }
})

module.exports = model("Tip", TipSchema)

/*
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
}*/














/*

function Tip(){
    let cabeza = document.getElementById('Titulo').value;
    let cuerpo = document.getElementById('Descripcion').value;

    if(validator.isEmpty(cabeza)==true){
        toastr.warning('El titulo del tip no puede estar vacio');
        return false;
    }else if(validator.isEmpty(cuerpo)==true){
        toastr.warning('La descripcion del tip no puede estar vacio');
        return false;
    }else if(validator.isLength(cuerpo, {min:10,max:250})==false){
        toastr.warning('La descripcion no puede ser menor de 10 caracteres y mayor que 250');
        return false;
    }else if(validator.isLength(cabeza, {min:5,max:40})==false){
        toastr.warning('El titulo del tip no puede ser menor de 5 mayor que 40.');
        return false;
    }
}

*/