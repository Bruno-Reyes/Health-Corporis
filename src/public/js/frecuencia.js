
const start = () => {
    fetch('/user/requestFre')
    .then(res => res.json())
    .then(data => {
        document.getElementById('Reposo').innerHTML = `Tu frecuencia en reposo es : ${data.data.fre_rep}`
        document.getElementById('Optima').innerHTML = `La frecuencia que debes tener al hacer ejercicio es: ${data.data.fre_opt}`
        document.getElementById('Intensidad').innerHTML = `Trabajaras con tu cuerpo a una intesidad de tipo: ${data.data.intensidad}`
    })
}

window.onload = start()