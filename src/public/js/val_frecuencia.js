function validarAll() {
    let intensidad = document.getElementById("IntensidadJS").value;
    let frecuencia = document.getElementById("FrecuenciaR").value;

    if (intensidad == 2 || intensidad == 3 || intensidad == 4) {
        if (validator.isEmpty(frecuencia, { ignore_whitespace: true }) == false) {
            if (validator.isInt(frecuencia, { min: 40, max: 120 })) {
                return true;
            } else {
                toastr.warning('El campo frecuencia va de 60-100');
                return false;
            }
        } else {
            toastr.warning('El campo frecuencia esta vacio');
            return false;
        }
    } else {
        toastr.warning('Elige una intensidad valida');
        return false;
    }
}