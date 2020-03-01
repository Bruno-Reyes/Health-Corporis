function ejers(){
    let fren = document.getElementById('frecuency').value;

    if(validator.isEmpty(fren)==true){
        toastr.warning('Ingresa un dato númerico en la fecuencia cardiaca en reposo.');
      return false;
    }else if(validator.isNumeric(fren)==false){
        toastr.warning('Ingrese un dato numerico valido.');
        return false;
    }else if(validator.isLength(fren,{min:2,max:3})==false){
        toastr.warning('El maximo numero de datos en frecuencia cardiaca en reposo va de los 2 a los 3 digitos.');
        return false;
    }

}

function inten(){
    let inten = document.getElementById('intensidad').value;

    if(validator.isEmpty(inten,{ignore_whitespace:true})==true){
        toastr.warning( 'Dejo en blanco el campo de Intensidad.');
        return false;
          
    }else if(validator.isNumeric(inten)==false){
        toastr.warning('Los datos en el campo de Intensidad no son de tipo numerico por favor cambielos.');
        return false;
        
    }else if(validator.isLength(inten,{min:2,max:3})==false){
        toastr.warning('EL minimo y maximo de digitos que se pueden insertar en la frecuencia en reposo es de 2 a 3.');
        return false;
        
    }else if(validator.isInt(inten,{gt:50,lt:100})==false){
        toastr.warning('La intensidad solo puede ir de 50 a 100.');
        return false;
    }

}