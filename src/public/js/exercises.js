function load(){
    let intensity = document.getElementById('intensidad').value;
    let pm = document.getElementById('frecuency').value;
    let ages = document.getElementById('age').innerHTML;
    
    //Se hace la aplicación de la formula de Karvonen
    //FCM = Frecuencia Cardiaca Máxima
    if(intensity === ""){
        document.getElementById('recomendada').innerHTML = `Recuerda: Debes asegurarte de ingresar la intensidad de ejercicio a la que deseas trabajar`;
    }else if( pm===""){
        document.getElementById('recomendada').innerHTML = `Recuerda: Debes asegurarte de registrar tu frecuencia cardiaca en reposo de forma manual o con la aplicación mobile`;
    }else{
        let FCM = 220-ages;
    intensity = intensity/100;
    pm = parseInt(pm);
    let activityzone = FCM - pm;
    activityzone = activityzone*intensity;
    activityzone = activityzone + pm;
    activityzone = Math.round(activityzone);
    document.getElementById('recomendada').innerHTML += `${activityzone}`;
    }
}

window.onload = load;