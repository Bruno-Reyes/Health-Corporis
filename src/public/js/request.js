const getGender = () => {
    return fetch('/admin/charts/gender')
        .then(res => res.json())
        .then(res => {
            return res
        })
}

const getAges = () => {
    return fetch('/admin/charts/ages')
        .then(res => res.json())
        .then(res => {
            return res
        })
}

const getUsers = () => {
    return fetch('/admin/charts/users')
        .then(res => res.json())
        .then(res => {
            return res
        })
}
const getFrecuency = () => {
    return fetch('/admin/charts/frecuencias')
        .then(res => res.json())
        .then(res => {
            return res
        })
}

const getEnfermedades = () => {
    return fetch('/admin/charts/enfermedades')
        .then(res => res.json())
        .then(res => {
            return res
        })
}

const getEjercicios = () => {
    return fetch('/admin/charts/ejercicios')
        .then(res => res.json())
        .then(res => {
            return res
        })
}

const getImc = () => {
    return fetch('/admin/charts/imc')
        .then(res => res.json())
        .then(res => {
            return res
        })
}