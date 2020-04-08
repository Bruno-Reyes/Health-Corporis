function validarAll() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let fecha = document.getElementById("date").value;
    let peso = document.getElementById("peso").value;
    let email = document.getElementById("email").value;
    let estatura = document.getElementById("estatura").value;
    let user = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;
    let conPassword = document.getElementById("conPass").value;

    let palabra = [];
    palabra = nombre.split(" ");

    let palabra1 = [];
    palabra1 = apellido.split(" ");

    let punto = [];
    punto = peso.toString().split(".");

    let punto2 = [];
    punto2 = estatura.toString().split(".");

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

    //validaciones de nombre
    if (validator.isEmpty(nombre, { ignore_whitespace: true }) == true) {
        toastr.warning('Campo nombre esta vacío.');
        return false;
    } else if (validator.isAlpha(nombre.replace(/ /g, "")) == false) {
        toastr.warning('El campo nombre solo debe de contener letras');
        return false;
    } else if (validator.isLength(nombre, { min: 3, max: 25 }) == false) {
        toastr.warning('El campo Primer nombre debe de ser de minimo 3 y mámixo 25 caracteres');
        return false;
    } else if (palabra.length > 1) {
        if (palabra[1].length > 0) {
            toastr.warning('El campo primer nombre solo debe contener una palabra');
            return false;
        }
    }

    //validaciones de apellido
    else if (validator.isEmpty(apellido) == true) {
        toastr.warning('El campo apellido esta vacio');
        return false;
    } else if (validator.isAlpha(apellido.replace(/ /g, "")) == false) {
        toastr.warning('EL campo apellido solo admite letras.');
        return false;
    } else if (validator.isLength(apellido, { min: 3, max: 25 }) == false) {
        toastr.warning('El campo apellido debe contener minimo 3 y máximo 25 caracteres');
        return false;
    } else if (palabra1.length > 1) {
        if (palabra1[1].length > 0) {
            toastr.warning('El campo apellido debe contener una palabra');
            return false;
        }
    }
    //validaciones del usuario
    else if (validator.isEmpty(user, { ignore_whitespace: true }) == true) {
        toastr.warning('El campo Usuario no puede estar vacio');
        return false;
    } else if (validator.isAlphanumeric(user) == false) {
        toastr.warning('El campo Usuario no permite Caracteres especiales');
        return false;
    } else if (validator.isLength(user, { min: 5, max: 20 }) == false) {
        toastr.warning('El campo Usuario va del rango 5-20');
        return false;
    }
    //validaciones de la contraseña
    else if (validator.isEmpty(password, { ignore_whitespace: true }) == true) {
        toastr.warning('El campo contraseña no puede estar vacio');
        return false;
    } else if (validator.isLength(password, { min: 8, max: 16 }) == false) {
        toastr.warning('El campo contraseña debe contener de 8 a 16 caracteres');
        return false;
    } else if (validator.isAlphanumeric(password) == false) {
        toastr.warning('El campo contraseña no permite Caracteres especiales');
        return false;
    }
    //Validacion de la segunda contraseña
    else if (validator.isEmpty(conPassword) == true) {
        toastr.warning('El campo confirmar contraseña no puede estar vacio');
        return false;
    } else if (validator.equals(conPassword, password) == false) {
        toastr.warning('Las contraseñas no coinciden.');
        return false;
    }
    //peso
    else if (validator.isEmpty(peso, { ignore_whitespace: true }) == true) {
        toastr.warning('El campo peso no puede estar vacio');
        return false;
    } else if (punto.length > 1) {
        if (validator.isFloat(peso, { min: 30.00, max: 200.00 }) == false) {
            toastr.warning('Los datos númericos del peso son equivocados rango 30.00-200.00 kilogramos');
            return false;
        }
        if (punto[1].length > 2) {
            punto[1].substring(0, 2);
            peso = punto[0] + '.' + punto[1];
        }
    } else if (punto.length == 1) {
        if (validator.isInt(peso, { min: 30, max: 200 }) == false) {
            toastr.warning('Los datos númericos del peso son equivocados rango 30.00-200.00 kilogramos');
            return false;
        }
    }
    //validaciones de email
    else if (validator.isEmpty(email, { ignore_whitespace: true }) == true) {
        toastr.warning('El campo email no puede estar vacio');
        return false;
    } else if (contA > 1 || contA <= 0) {
        toastr.warning('El campo email no puede tener mas de un arroba o no tener');
        return false;
    } else if (contP > 4 || contP <= 0) {
        toastr.warning('El campo email no puede tener mas de 4 puntos o no tener');
        return false;
    } else if (validator.isLength(email, { min: 8, max: 40 }) == false) {
        toastr.warning('El campo email contiene de 8 a 40 caracteres.');
        return false;
    }
    //validaciones de estatura
    else if (validator.isEmpty(estatura, { ignore_whitespace: true }) == true) {
        toastr.warning('El campo Estatura no puede estar vacio');
        return false;
    } else if (punto2.length > 1) {
        if (validator.isFloat(estatura, { min: 1.0, max: 2.5 }) == false) {
            toastr.warning('Los datos númericos de la estatura son equivocados rango 1.00-2.50 metros');
            return false;
        }
        if (punto2[1].length > 2) {
            punto2[1].substring(0, 2);
            peso = punto2[0] + '.' + punto2[1];
        }
    } else if (punto2.length == 1) {
        if (validator.isInt(estatura, { min: 1, max: 2 }) == false) {
            toastr.warning('Los datos númericos de la estatura son equivocados rango 1.00-2.50 metros');
            return false;
        }
    } else {
        return true;
    }

}