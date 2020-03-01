/*
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawFrequence);

 //Grafica Frecuencia

 const frecT = await pool.query('SELECT count(fre_rep) TOTAL FROM datosusuario');
 const frec1 = await pool.query('SELECT count(fre_rep) TOTAL FROM datosusuario WHERE fre_rep<60');
 const frec2 = await pool.query('SELECT count(fre_rep) TOTAL FROM datosusuario WHERE fre_rep>100');
 const frec3 = frecT-(frec1+frec2);

function drawFrequence() {

  var usersFrec = google.visualization.arrayToDataTable([
    ['m', 'B', 'MA'],
      [frec1,frec3,frec2]
      ]);
    var options = {
        legend: { position: 'bottom' },
        pointSize: 5,
        hAxis: {title: 'Meses', titleTextStyle: {color: '#0000FF'}},
        vAxis: {title: 'Número de Visitas', titleTextStyle: {color: '#0000FF'}},
        curveType: 'function',
        };

var graficaFrecuencia = new google.visualization.ColumnChart(document.getElementById('graficaFrec_div'));
graficaFrecuencia.draw(usersFrec, options);

}*/