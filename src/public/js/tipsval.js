$('#Descripcion').val('New Text');
M.textareaAutoResize($('#Descripcion'));

function Tip() {
    let cabeza = document.getElementById('Titulo').value;
    let cuerpo = document.getElementById('Descripcion').value;

    if (validator.isEmpty(cabeza) == true) {
        toastr.warning('El titulo del tip no puede estar vacio');
        return false;
    } else if (validator.isEmpty(cuerpo) == true) {
        toastr.warning('La descripcion del tip no puede estar vacio');
        return false;
    } else if (validator.isLength(cuerpo, { min: 10, max: 250 }) == false) {
        toastr.warning('La descripcion no puede ser menor de 10 caracteres y mayor que 250');
        return false;
    } else if (validator.isLength(cabeza, { min: 5, max: 40 }) == false) {
        toastr.warning('El titulo del tip no puede ser menor de 5 mayor que 40.');
        return false;
    }
}