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

controller.month = (mes) => {
    console.log(mes);
switch (mes) {
    case 'Jan':
        return 01;
    case 'Feb':
        return 02;
    case 'Mar':
        return 03;
    case 'Abr':
        return 04;
    case 'May':
        return 05;
    case 'Jun':
        console.log('Estoy en Junio');
        
        return 06;
    case 'Jul':
        return 07;
    case 'Ago':
        return 08;
    case 'Sep':
        return 09;
    case 'Oct':
        return 10;
    case 'Nov':
        return 11;
    case 'Dec':
        return 12;
    default:
        console.log('No estoy furulando');
        
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

const getRandomArbitrary = (min,max) => {
    return Math.random() * (max-min) + min
}

controller.randomExercises = (exercises) => {
    let contador = 0
    let personalizado = []
    let ejercicios=[];
    ejercicios.push(Math.round(getRandomArbitrary(0,exercises.length-1)));
    contador = contador +1
    while(contador<4){
        let random = Math.round(getRandomArbitrary(0,exercises.length-1));
        let paso = false;
            ejercicios.forEach(element => {
                if(random === element){
                    paso = true;
                    this.break;
                }
            }) 
            if(paso ==false){
                ejercicios.push(random);
                contador = contador+1;
            }
    }
    ejercicios.forEach(element => {
        personalizado.push(exercises[element])
    })
    
    
    return personalizado
}

module.exports = controller;

