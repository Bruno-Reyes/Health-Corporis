document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

const editarNombre = () => {
    
    fetch('/user/editNombre',{
        method: 'POST',
        body : JSON.stringify({
            nombre : document.getElementById('nombre').value
        }),
        headers: {
            'Accept' : 'apliccation/json',
            'Content-type':'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        document.getElementById('container-nombre').innerHTML = res.data
        M.toast({html: res.message})
    })
}

const editarApellido = () => {
    
    fetch('/user/editApellido',{
        method: 'POST',
        body : JSON.stringify({
            apellido : document.getElementById('apellido').value
        }),
        headers: {
            'Accept' : 'apliccation/json',
            'Content-type':'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        document.getElementById('container-apellido').innerHTML = res.data
        M.toast({html: res.message})
    })
}

const editarFecha = () => {
    
    fetch('/user/editFecha',{
        method: 'POST',
        body : JSON.stringify({
            fecha : document.getElementById('fecha_nacimiento').value
        }),
        headers: {
            'Accept' : 'apliccation/json',
            'Content-type':'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        M.toast({html: res.message})
        setTimeout(() => {
            location.reload()
        }, 2000);
    })
}


const editarGenero = () => {
        
    fetch('/user/editGenero',{
        method: 'POST',
        body : JSON.stringify({
            genero : document.forms[0].Genero.value
        }),
        headers: {
            'Accept' : 'apliccation/json',
            'Content-type':'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        document.getElementById('container-genero').innerHTML = res.data
        M.toast({html: res.message})
        setTimeout(() => {
            location.reload()
        }, 2000);
    })
}

const editarEnfermedad = () => {
        
    fetch('/user/editEnfermedad',{
        method: 'POST',
        body : JSON.stringify({
            enfermedad : document.getElementById('Enfermedad').value
        }),
        headers: {
            'Accept' : 'apliccation/json',
            'Content-type':'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        M.toast({html: res.message})
        setTimeout(() => {
            location.reload()
        }, 2000);
    })
}

const editarFrecuencia = () => {
        
    fetch('/user/editFrecuencia',{
        method: 'POST',
        body : JSON.stringify({
            frecuencia : document.getElementById('Frecuencia').value
        }),
        headers: {
            'Accept' : 'apliccation/json',
            'Content-type':'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        document.getElementById('container-frecuencia').innerHTML = res.data
        M.toast({html: res.message})
    })
}


const editarEmail = () => {
        
    fetch('/user/editEmail',{
        method: 'POST',
        body : JSON.stringify({
            email : document.getElementById('email').value
        }),
        headers: {
            'Accept' : 'apliccation/json',
            'Content-type':'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        document.getElementById('container-email').innerHTML = res.data
        M.toast({html: res.message})
    })
}

const editarUsuario = () => {
        
    fetch('/user/editUsuario',{
        method: 'POST',
        body : JSON.stringify({
            usuario : document.getElementById('usuario').value
        }),
        headers: {
            'Accept' : 'apliccation/json',
            'Content-type':'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        document.getElementById('container-usuario').innerHTML = res.data
        M.toast({html: res.message})
    })
}


const editarPsw = () => {
        
    fetch('/user/editPassword',{
        method: 'POST',
        body : JSON.stringify({
            oldPassword : document.getElementById('psw').value,
            newPassword : document.getElementById('pswNew').value,
            confirmPassword : document.getElementById('pswConfirm').value
        }),
        headers: {
            'Accept' : 'apliccation/json',
            'Content-type':'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        M.toast({html: res.message})
    })
}