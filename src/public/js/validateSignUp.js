function validarAll(){
    let pmnom = document.getElementById("prNom").value;
    let secnom = document.getElementById("secNom").value;
    let appat = document.getElementById("patA").value;
    let apmat = document.getElementById("matA").value;
    let age = document.getElementById("idedad").value;
    let pso = document.getElementById("idpeso").value;
    let height = document.getElementById("idheight").value;
    let user = document.getElementById('nom_usu').value;
    let con = document.getElementById('con_usu').value;
    let isChecked = document.getElementById('chequeo1').checked;

    if(validator.isEmpty(pmnom)==true){
        toastr.warning('El campo El Primer nombre no puede estar vacio.');
        return false;
    }else if(validator.isEmpty(appat)==true){
        toastr.warning('El campo El Apellido paterno no puede estar vacio.');
        return false;
    }else if(validator.isEmpty(apmat)==true){
        toastr.warning('El campo El Apellido materno no puede estar vacio.');
        return false;
    }else if(validator.isEmpty(age)==true){
        toastr.warning('El campo La edad no puede estar vacio.');
        return false;
    }else if(validator.isEmpty(pso)==true){
        toastr.warning('El campo El peso no puede estar vacio.');
        return false;
    }else if(validator.isEmpty(height)==true){
        toastr.warning('El campo La estatura no puede estar vacio.');
        return false;
    }else if(validator.isEmpty(user)==true){
        toastr.warning('El campo usuario no puede estar vacio.');
        return false;
    }else if(validator.isEmpty(con)==true){
        toastr.warning('El campo contraseña no puede estar vacio.');
        return false;
    }else if(validator.isAlpha(pmnom)==false){
        toastr.warning('El Campo Primer nombre solo debe de contener letras');
        return false;
    }/* else if(validator.isAlpha(secnom)==false){
        toastr.warning('El Campo Segundo nombre solo debe de contener letras');
        return false;
    } */else if(validator.isAlpha(appat)==false){
        toastr.warning('El Campo Apellido paterno solo debe de contener letras');
        return false;
    }else if(validator.isAlpha(apmat)==false){
        toastr.warning('El Campo Apellido materno solo debe de contener letras');
        return false;
    }else if(validator.isNumeric(age,{no_symbols: false})==false){
        toastr.warning('El campo edad solo debe de contener numeros enteros');
        return false;
    }else if(validator.isInt(age,{min:18,max:50})== false){
        toastr.warning('La edad debe de ser de 18 a 50');
        return false;
    }else if(validator.isNumeric(pso)==false){
        toastr.warning('El campo peso solo debe de contener numeros');
        return false;
    }else if(validator.isNumeric(height)==false){
        toastr.warning('El campo de estatura solo debe de contener numeros');
        return false;
    }else if(validator.isAlphanumeric(user)==false){
        toastr.warning('El campo de nombre de usuario solo debe de contener letras y numeros.');
        return false
    }else if(validator.isAlphanumeric(con)==false){
        toastr.warning('EL campo de contraseña solo debe de contener letras y numeros.');
        return false;
    }else if(validator.islength(pmnom,{min:3,max:20})==false){
        toastr.warning('El campo primer nombre debe de ser de minimo 3 y maximo 20');
        return false;
    }else if(validator.islength(apmat,{min:4,max:20})==false){
        toastr.warning('El campo primer nombre debe de ser de minimo 3 y maximo 20');
        return false;
    }else if(validator.islength(appat,{min:4,max:20})==false){
        toastr.warning('El apellido paterno nombre debe de ser de minimo 3 y maximo 20');
        return false;
    }else if(validator.islength(age,{min:1,max:2})==false){
        toastr.warning('El edad nombre debe de ser de minimo 1 y maximo 2');
        return false;
    }else if(validator.islength(height,{min:2,max:4})==false){
        toastr.warning('El campo estatura debe de ser de minimo 2 y maximo 4');
        return false;
    }else if(validator.islength(pso,{min:2,max:5})==false){
        toastr.warning('El campo peso debe de ser de minimo 2 y maximo 5');
        return false;
    }else if(validator.islength(con,{min:8,max:20})==false){
        toastr.warning('El campo contraseña debe de ser de minimo 8 y maximo 20');
        return false;
    }else if(isChecked!=true){
        toastr.warning('No has aceptado los terminos y condiciones');
        return false;
    }else if(validator.islength(user,{min:8,max:20})==false){
        toastr.warning('El campo usuario debe de ser de minimo 8 y maximo 20');
        return false;
    }
}
