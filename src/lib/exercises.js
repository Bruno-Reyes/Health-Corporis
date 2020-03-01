const exercise = {};

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

exercise.random = (ejerciciosArray) => {
    let contador = 0;
    let personalizado = [];
    let ejercicios=[];
    ejercicios.push(Math.round(getRandomArbitrary(0,ejerciciosArray.length)));
    contador = contador +1;
    while(contador<5){
        let random = Math.round(getRandomArbitrary(0,ejerciciosArray.length));
        let paso = false;
            ejercicios.forEach(element => {
                if(random === element){
                    paso = true;
                    this.break;
                }
            }); 
            if(paso ==false){
                ejercicios.push(random);
                contador = contador+1;
            }
    }
    ejercicios.forEach(element => {
        personalizado.push(ejerciciosArray[element]);
    });
    return personalizado;
}

exercise.empty = () => {
    let personalizado=[];
    const empty = {
        img_eje: '',
        nom_eje: 'Malas noticias',
        des_eje: 'No tenemos registros que hayas ingresado tus datos de frecuencia cardiaca y/o la intensidad a la que deseas trabajar por favor hazlo para poder continuar'
    }
    personalizado.push(empty);
    return personalizado;
};




module.exports = exercise;