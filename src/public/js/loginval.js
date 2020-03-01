function cositas(){
    var nom = document.getElementById('user').value;
    var con = document.getElementById('password').value;

    if(validator.isEmpty(nom)==true){
        toastr.warning('El nombre de usuario no puede estar vacio.');
        return false;
    }else if(validator.isEmpty(con)==true){
        toastr.warning('La contraseña no puede estar vacia.');
        return false;
    }else if(validator.isAlphanumeric(nom)==false){
        toastr.warning('No debes meter esos signos malevolos.');
        return false;
    }else{
        return true;
    }
}

