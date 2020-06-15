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
        age.real = true
        return age
        
    }
}

controller.frecuencia= frec => {
    let intervalo;
    frec=parseInt(frec)
    if(frec === 0 ){
        intervalo=1;//nunca
    }else if(frec >=1 && frec<=2){
        intervalo=2;//raramente
    }else if(frec >=3 && frec<=4){
        intervalo=3;//ocasionalmente
    }else if(frec >=5 && frec<=6){
        intervalo=4;//generalmente
    }else if(frec === 7){
        intervalo=5;//siempre
    }
    return intervalo
}

module.exports = controller;

