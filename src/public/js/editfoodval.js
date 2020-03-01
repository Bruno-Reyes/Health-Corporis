function comida() {
   let name = document.getElementById('food').value;
   let grup = document.getElementById('inputGroupSelect01').value;
   let measure = document.getElementById('inputGroupSelect02').value;
   let aliblank=name.replace(/ /g,'');
   if (validator.isEmpty(name, { ignore_whitespace: true }) == true) {
      toastr.warning('Elige el nombre del alimento que va a agregar');
      return false;
   } else if (validator.isEmpty(grup, { ignore_whitespace: true }) == true) {
      toastr.warning('Elige una opcion del grupo alimenticio');
      return false;
   } else if (validator.isEmpty(measure, { ignore_whitespace: true }) == true) {
      toastr.warning('Elige una opcion del tipo de unidad de medida');
      return false;
   } else if (validator.isAlpha(aliblank) == false) {
      toastr.warning('EL nombre del alimento solo  deben de ser letras.');
      return false;
   } else if (validator.isLength(name, { min: 3, max: 50 }) == false) {
      toastr.warning('EL nombre del alimento debe de ser de 3 a 50 caracteres.');
      return false;
   } 
}