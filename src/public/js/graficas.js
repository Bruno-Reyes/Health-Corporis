function numero1(){
    const $limpiar=document.querySelector(".getData");    
    const socket = io();
    console.log($limpiar);
    $limpiar.addEventListener('click',e=>{
        e.preventDefault()
        const holis="Yallegue"
        socket.emit('grafica:client',{prueba:holis})
    })
    
socket.on('grafica:datos',({dat1,dat2,dat3,dat4,})=>{
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        //voy a probar de barra

        var data = google.visualization.arrayToDataTable([
          ['Frecuencia Cardiaca (Latidos por minuto)', 'Rango'], 
          ['Menor a 60 latidos', dat2],
          ['Racional 60-100 latidos',  dat4],
          ['Mayor a 100 latidos', dat3],
        ]);
        
        var options = {
          title: 'Rango de usuarios con distintos niveles de frecuencia cardiaca'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }

      
})

socket.on('grafica:datos',({dat5,dat6,dat7,dat8,dat9,dat10,dat11,dat12})=>{
  google.charts.load('current', {'packages':['bar']});
  google.charts.setOnLoadCallback(drawIMC);

  function drawIMC(){
    var dataI = google.visualization.arrayToDataTable([
      ['Delgado muy severo','Delgado severo','Delgadez','Peso Saludable','Sobrepeso','Obesidad moderada', 'Obesidad severa','Obesidad muy severa'],
      [dat5,dat6,dat7,dat8,dat9,dat10,dat11,dat12]
    ]);
    
    var options = {
      title: 'Rango del indice de masa corporal'
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('piechartIMC'));

    chart.draw(dataI, options);
  }

})

//voy haciendo las consultas para estatyra y peso
socket.on('grafica:datos',({dat13,dat14,dat15,dat16})=>{
  google.charts.load('current', {'packages':['bar']});
  google.charts.setOnLoadCallback(drawAge);
  //esta grafica puede ser de barras
  function drawAge(){
    var dataA = google.visualization.arrayToDataTable([
      ['16-20 años', '20-30 años','30-40 años','40-50 años'],
      [dat13, dat14,dat15,dat16]
   ]);
    
    var options = {
      title: 'Rango de Edades'
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('graphAge'));

    chart.draw(dataA, options);
  }

})

socket.on('grafica:datos',({datE1,datE2,datE3,datE4,datE5,datE6,datE7})=>{
  google.charts.load('current', {'packages':['bar']});
  google.charts.setOnLoadCallback(drawPeso);

  function drawPeso(){
    var dataE = google.visualization.arrayToDataTable([
      ['1-1.20 mts','1.20-1.40 mts','1.40-1.60 mts','1.60-1.80 mts','1.80-2 mts','2-2.20 mts','2.20-2.50 mts'],
      [datE1,datE2,datE3,datE4,datE5,datE6,datE7]
    ]);
    
    var options = {
      title: 'Rango de estatura'
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('graphEst'));

    chart.draw(dataE, options);
  }

})

socket.on('grafica:datos',({datP1,datP2,datP3,datP4,datP5,datP6,datP7,datP8})=>{
  google.charts.load('current', {'packages':['bar']});
  google.charts.setOnLoadCallback(drawAge);
  //esta grafica puede ser de barras
  function drawAge(){
    var dataA = google.visualization.arrayToDataTable([
      ['30-49 kg','50-69 kg','70-89 kg','90-119 kg','110-129 kg','130-149 kg','150-169 kg','170-200 kg'],
      [datP1,datP2,datP3,datP4,datP5,datP6,datP7,datP8] 
   ]);
    
    var options = {
      title: 'Rango de Pesos'
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('graphPesoS'));

    chart.draw(dataA, options);
  }

})

socket.on('grafica:datos',({datIn1,datIn2,datIn3})=>{
  google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawStuff);

      function drawStuff() {
        var data = new google.visualization.arrayToDataTable([
          ['Intensidad', 'Porcentage'],
          ["Intensidad 50-69%", datIn1],
          ["Intensidad 70-79%", datIn2],
          ["Intensidad 80-100%", datIn3]
        ]);

        var options = {
          width: 800,
          legend: { position: 'none' },
          chart: {
            title: 'Rango de intensidad de ejercicios',
            subtitle: '' },
          axes: {
            x: {
              0: { side: 'top', label: 'White to move'} // Top x-axis.
            }
          },
          bar: { groupWidth: "90%" }
        };

        var chart = new google.charts.Bar(document.getElementById('graphInt'));
        // Convert the Classic options to Material options.
        chart.draw(data, google.charts.Bar.convertOptions(options));
      };
})

socket.on('grafica:datos',({datGE1,datGE2})=>{
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Genero', 'Porcentaje'],
      ['Hombre',     datGE1],
      ['Mujer',      datGE2]
    ]);

    var options = {
      title: 'Porcentajde usuarios dividido por genero',
      pieHole: 0.6,
    };

    var chart = new google.visualization.PieChart(document.getElementById('graphGen'));
    chart.draw(data, options);
  }
})
      
}

window.onload=numero1;

