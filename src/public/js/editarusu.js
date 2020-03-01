function validarUsuario(){
    var nombre=document.getElementById("txtnombre").value;
    if(validator.isEmpty(nombre,{ignore_whitespace:true})==true){
        toastr.warning("El nombre no puede estar vácio");
        return false;    
    }
    else if(validator.isAlphanumeric(nombre)==false){
        toastr.warning('El campo Usuario no permite Caracteres especiales');
        return false; 
    }
    else if(validator.isLength(nombre,{min:8,max:20})==false){
        toastr.warning('El campo usuario va del rango 8-20.');
        return false; 
    }
    else{
        return true;
    }
}
function validarPassword(){
    let contraseña=document.getElementById("txtContra").value;
    if(validator.isEmpty(contraseña,{ignore_whitespace:true})==true){
        toastr.warning('El campo Contraseña no puede estar vacio');
        return false;
    } 
    if(validator.isLength(contraseña,{min:8,max:20})==false){
        toastr.warning('El campo Contraseña va del rango 8-20');
        return false;
    }
}
function validarNombre(){
    var nombre=document.getElementById("txtprinom").value;
    let palabra=[];
    palabra=nombre.split(" ");    
    if(palabra.length>1){
        if(palabra[1].length>0){
            toastr.warning('El campo primer nombre solo debe de contener una palabra.');
            return false;
        }}
        else if(validator.isEmpty(nombre,{ignore_whitespace:true})==true){
            toastr.warning('El campo primer nombre esta vacio.');
            return false;
        }
        else if(validator.isAlpha(nombre)==false){
            toastr.warning('El campo primer nombre solo debe de contener letras.');
            return false;
        }
        else if(validator.isLength(nombre,{min:3,max:20})==false){
            toastr.warning('El campo primer nombre debe de ser de minimo 3 y máximo 20 caracteres.');
            return false;
        }else{      
            return true;
    }
}
function validarSegNom(){
    var segundo=document.getElementById("txtSegNom").value;
    let palabra2=[];
    palabra2=segundo.split(" ");            
    if(palabra2.length==2){
        if(validator.isLength(palabra2[0],{min:2,max:3})==false){
            toastr.warning('El campo segunfo nombre es erroneo.');
            return false;
        }
        if(validator.isLength(palabra2[1],{min:4,max:10})==false){
            toastr.warning('El campo segundo nombre es erroneo.');
            return false;
        }
        }
        else if(palabra2.length>2){
            toastr.warning('El campo segundo nombre es erroneo.');
            return false;
        } 
        else if(validator.isEmpty(segundo,{ignore_whitespace:true})==true){
            toastr.warning('El campo segundo nombre esta vacio.');
            return false;
        }
        else if(validator.isAlpha(segundo.replace(/ /g,""))==false){
            toastr.warning('El campo Segundo nombre solo debe contener letras.');
            return false;
        }
        else if(validator.isLength(segundo,{min:3,max:20})==false){
            toastr.warning('El campo segundo nombre debe de ser de minimo 3 y máximo 20 caracteres.');
            return false;
        }           
        else{
            return true;
        }
}
function validarApPaterno(){
    var paterno=document.getElementById("txtApPaterno").value;
    let palabra3=[];
    palabra3=paterno.split(" ");    
    if(palabra3.lenght==2){
        if(validator.isLength(palabra3[0],{min:2,max:3})==false){
            toastr.warning('El campo apellido paterno es erroneo.');
            return false;
        }
        if(validator.isLength(palabra3[1],{min:4,max:10})==false){
            toastr.warning('El campo apellido paterno es erroneo.');
            return false;
        }
        }    
        else if(palabra3.lenght==3){
            if(validator.isLength(palabra3[0],{min:2,max:2})==false){
                toastr.warning('El campo apellido paterno es erroneo.');
                return false;
            }
            if(validator.isLength(palabra3[1],{min:2,max:2})==false){
                toastr.warning('El campo apellido paterno es erroneo.');
                return false;
            }
            if(validator.isLength(palabra3[2],{min:4,max:10})==false){
                toastr.warning('El campo apellido paterno es erroneo.');
                return false;
            }
        }
        else if(palabra3.length>3){
            toastr.warning('El campo apellido paterno es erroneo.');
            return false;
        }
        else if(validator.isEmpty(paterno,{ignore_whitespace:true})==true){
            toastr.warning('El campo apellido paterno esta vacio.');
            return false;
        }
        else if(validator.isAlpha(paterno.replace(/ /g,""))==false){
            toastr.warning('El campo apellido paterno solo debe de contener letras.');
            return false;
        }
        else if(validator.isLength(paterno,{min:4,max:20})==false){
            toastr.warning('El campo apellido paterno deve de ser de minimo 3 y máximo 20 caracteres.');
            return false;
        }        
        else{
        return true;
        }
    }
function validarApMaterno(){
    var materno=document.getElementById("txtApMaterno").value;
    if(validator.isEmpty(materno,{ignore_whitespace:true})==true){
        toastr.warning('El campo apellido materno no debe de estar vacio.');
        return false;
    }
    else if(validator.isAlpha(materno)==false){
        toastr.warning('El campo apellido materno solo debe de contener letras.');
        return false;
    }
    else if(validator.isLength(materno,{min:4,max:20})==false){
        toastr.warning('Apellido materno deve de ser de minimo 3 y máximo 20 caracteres.');
        return false;
    }else{  
    return true;    
    }
}
function validarPeso(){
    let peso=document.getElementById('txtPeso').value;
    if(validator.isEmpty(peso,{ignore_whitespace:true})==true){
        toastr.warning('El Campo Peso no puede estar vacio');
        return false;
    }    
    let punto=[];
    punto=peso.toString().split(".");
    if(punto.length>1){
        if(validator.isFloat(peso,{min:30.00, max:200.00})==false){
            toastr.warning('Los datos númericos del peso son equivocados rango 30.00-200.00 kilogramos');
            return false;
        }
        if(punto[1].length>2){
            punto[1].substring(0,2);
            peso=punto[0]+'.'+punto[1];
        }
    }else if(punto.length==1){
        if(validator.isInt(peso,{min:30, max:200})==false){
            toastr.warning('Los datos númericos del peso son equivocados rango 30.00-200.00 kilogramos');
            return false;
        }
    }
}
function validarEstatura(){
    let estatura=document.getElementById('txtEstatura').value;    
    if(validator.isEmpty(estatura,{ignore_whitespace:true})==true){
        toastr.warning('El campo Estatura no puede estar vacio');
        return false;
    }
    let punto2=[];
    punto2=estatura.toString().split(".");
    if(punto2.length>1){
        if(validator.isFloat(estatura,{min:1.00, max:2.50})==false){
            toastr.warning('Los datos númericos de la estatura son equivocados rango 1.00-2.50 metros');
            return false;
        }
        if(punto2[1].length>2){
            punto2[1].substring(0,2);
            peso=punto2[0]+'.'+punto2[1];
        }
    }else if(punto2.length==1){
        if(validator.isInt(estatura,{min:1, max:2})==false){
            toastr.warning('Los datos númericos de la estatura son equivocados rango 1.00-2.50 metros');
            return false;
        }
    }
}