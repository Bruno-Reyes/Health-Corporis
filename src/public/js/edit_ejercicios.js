function validarAll() {
    let nombre = document.getElementById("nomeje").value;
    let intensidad = document.getElementById("intensida").value;
    let series = document.getElementById("series").value;
    let cantidad = document.getElementById("cantidad").value;
    let descripcion = document.getElementById("description").value;
    let medicion = document.getElementById("medicion").value;

    if (validator.isEmpty(nombre, { ignore_whitespace: true }) == false || validator.isEmpty(intensidad, { ignore_whitespace: true }) == false || validator.isEmpty(series, { ignore_whitespace: true }) == false || validator.isEmpty(cantidad, { ignore_whitespace: true }) == false || validator.isEmpty(descripcion, { ignore_whitespace: true }) == false || validator.isEmpty(medicion, { ignore_whitespace: true }) == false) {
        if (intensidad == 2 || intensidad == 3 || intensidad == 4) {
            if (validator.isLength(nombre, { min: 3, max: 50 })) {
                if (validator.isLength(descripcion, { min: 5, max: 500 })) {
                    if (validator.isInt(series, { min: 2, max: 30 })) {
                        if (validator.isInt(cantidad, { min: 1, max: 30 })) {
                            if (medicion == 1 || medicion == 2 || medicion == 3) {
                                return true;
                            } else {
                                toastr.warning('Elige una medición valida');
                                return false;
                            }
                        } else {
                            toastr.warning('Rango no valido (1-30)');
                            return false;
                        }
                    } else {
                        toastr.warning('Rango no valido (2-30)');
                        return false;
                    }
                } else {
                    toastr.warning('Rango de caracteres no valido (5-500)');
                    return false;
                }
            } else {
                toastr.warning('Rango de caracteres no valido (3-50)');
                return false;
            }
        } else {
            toastr.warning('Elige una intensidad valida');
            return false;
        }
    } else {
        toastr.warning('Dejaste un campo vacio');
        return false;
    }
}