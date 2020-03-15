options = {
    format: 'yyyy/mm/dd',
    minDate: new Date(1970, 0, 0),
    maxDate: new Date(1990, 12, 0),
    defaultDate: new Date(1990, 1, 0)
}
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, options);
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});

//Aqui va la validación