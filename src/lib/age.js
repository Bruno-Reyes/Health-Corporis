const controller = {}

controller.age = (mes,ano) => {
    let fecha = new Date()
    fechaActual = [fecha.getDay()+1,fecha.getMonth()+1,fecha.getFullYear()]
    
    let age= {
        real : false,
        age : ''
    }
    
    if(fechaActual[2]<ano){
        return age
    }
    else{
        age.age = fechaActual[2] - ano
        if(mes > fechaActual[1]){
            age.age = age.age - 1
        }
        return age
    }
}

module.exports = controller

