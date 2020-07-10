function drawChartGender() {
    getGender().then(rows => {
        let m = 0
        let f = 0
        for (const item of rows) {
            if (item.id_gen == 1) {
                m++
            } else if (item.id_gen == 2) {
                f++
            }
        }
        let data = google.visualization.arrayToDataTable([
            ['Genero', 'Personas'],
            ['Masculino', m],
            ['Femenino', f]
        ]);

        let options = {
            title: 'Genero',
            colors: ['#662d91','#005693']
        };

        let chart = new google.visualization.PieChart(document.getElementById('chartGender'));
        chart.draw(data, options);
    })
}

function drawChartAges() {
    getAges().then(rows => {
        const current = moment()
        let ages = []
        for (const item of rows) {
            let past = moment(item.fec_nac)
            ages.push(current.diff(past, 'years'))
        }
        let r2735 = 0
        let r3540 = 0
        let r4045 = 0
        let r4560 = 0

        ages.forEach(e => {
            if (e >= 28 && e <= 35) {
                r2735++
            } else if (e > 35 && e <= 40) {
                r3540++
            } else if (e > 40 && e <= 45) {
                r4045++
            } else if (e > 45 && e <= 60) {
                r4560++
            }
        })
        let data = google.visualization.arrayToDataTable([
            ['Rango', 'No. Personas'],
            ['27-35 años', r2735],
            ['35-40 años', r3540],
            ['40-45 años', r4045],
            ['45-60 años', r4560]
        ]);

        let options = {
            title: 'Rangos de edades de usuarios',
            is3D: true,
            colors: ['#662d91','#005693','#f37021','#e31f26']
        };

        let chart = new google.visualization.PieChart(document.getElementById('chartAges'));
        chart.draw(data, options);
    })
}

function drawChartFrecuency() { 
    getFrecuency().then(row => {
        let under = 0
        let over = 0
        let regular = 0
        let sr = 0
        for (const item of row) {
            if (item.fre_rep < 60 && item.fre_rep > 39) {
                under++
            } else if (item.fre_rep > 100 && item.fre_rep < 121) {
                over++
            } else if (item.fre_rep >= 60 && item.fre_rep <= 100) {
                regular++
            } else if (item.fre_rep == 0) {
                sr++
            }
        }
        let data = google.visualization.arrayToDataTable([
            ['Rango de frecuencia', 'No. Personas'],
            ['40-60', under],
            ['60-100', regular],
            ['100-120', over],
            ['Sin registrar', sr]
        ]);

        var options = {
            title: 'Anormalidades en frecuencias cardiacas en reposo',
            pieHole: 0.4,
            colors: ['#662d91','#005693','#a3238e','#e31f26']
        }

        let chart = new google.visualization.PieChart(document.getElementById('chartFrecuency'));
        chart.draw(data, options)
    })
}

function drawChartEnfermedades() {


    getEnfermedades().then(row => {

        let ninguna = 0
        let cardiovascular = 0
        let respiratoria = 0
        for (const item of row) {
            if (item.id_enf == 1) {
                ninguna++
            } else if (item.id_enf == 2) {
                cardiovascular++
            } else if (item.id_enf == 3) {
                respiratoria++
            }
        }
        let data = google.visualization.arrayToDataTable([
            ['Enfermedad', 'Cantidad de personas', { role: 'style' }],
            ['Ninguna', ninguna, '#662d91'],
            ['Cardiovascular', cardiovascular, '#005693'],
            ['Respiratoria', respiratoria, '#a3238e']
        ])

        let options = {
            title: "Enfermedades que padecen los usuarios"
        }

        let chart = new google.visualization.ColumnChart(document.getElementById('chartSicks'));
        chart.draw(data, options)
    })
}



function drawChartEjercicios() {

    getEjercicios().then(row => {

        let nunca = 0
        let raramente = 0
        let ocasionalmente = 0
        let generalmente = 0
        let siempre = 0
        for (const item of row) {
            if (item.id_fre == 1) {
                nunca++
            } else if (item.id_fre == 2) {
                raramente++
            } else if (item.id_fre == 3) {
                ocasionalmente++
            } else if (item.id_fre == 4) {
                generalmente++
            } else if (item.id_fre == 5) {
                siempre++
            }
        }
        let data = google.visualization.arrayToDataTable([
            ['Cantidad de ejercicio', 'Num. Personas', { role: 'style' }],
            ['Nunca', nunca, '#662d91'],
            ['Raramente', raramente, '#005693'],
            ['Ocasionalmente', ocasionalmente, '#a3238e'],
            ['Generalmente', generalmente, '#e31f26'],
            ['Siempre', siempre, '#00a651']
        ])

        let options = {
            title: "Cantidad de ejercicio que realizan los usuarios"
        }
        let chart = new google.visualization.ColumnChart(document.getElementById('chartExercises'));
        chart.draw(data, options)
    })
}

function eliminarObjetosDuplicados(arr, prop) {
    var nuevoArray = [];
    var lookup = {};

    for (var i in arr) {
        lookup[arr[i][prop]] = arr[i];
    }

    for (i in lookup) {
        nuevoArray.push(lookup[i]);
    }

    return nuevoArray;
}

function drawChartImc() {

    getImc().then(row => {

        console.log(row)
        let IMC = []
        let nuevo = eliminarObjetosDuplicados(row, 'id_per')
        let infrapeso = 0
        let normal = 0
        let sobrepeso = 0
        let obesidad = 0

        for (let item of nuevo) {
            if (parseInt(item.imc_seg) < 18.50) {
                infrapeso++
            } else if (parseInt(item.imc_seg) >= 18.50 && parseInt(item.imc_seg) < 25) {
                normal++
            } else if (parseInt(item.imc_seg) >= 25 && parseInt(item.imc_seg) < 30) {
                sobrepeso++
            } else if (parseInt(item.imc_seg) >= 30 && parseInt(item.imc_seg) < 40) {
                obesidad++
            }
        }

        let data = google.visualization.arrayToDataTable([
            ['Estado de salud', 'No. Personas'],
            ['Infrapeso', infrapeso],
            ['Normal', normal],
            ['sobrepeso', sobrepeso],
            ['Obesidad', obesidad]
        ])

        var options = {
            title: 'Estado de la salud',
            pieHole: 0.6,
            colors: ['#662d91','#005693','#a3238e','#e31f26']
        }

        var chart = new google.visualization.PieChart(document.getElementById('chartImc'));
        chart.draw(data, options);



    })
}


const chartGender = () => {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChartGender);
}

const chartAges = () => {
    google.charts.load("current", { packages: ["corechart"] })
    google.charts.setOnLoadCallback(drawChartAges)
}

const chartFrecuency = () => {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChartFrecuency);
}

const chartEnfermedades = () => {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChartEnfermedades)
}

const chartEjercicios = () => {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChartEjercicios)
}

const chartImc = () => {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChartImc)
}

const users = () => {
    getUsers().then(data => {
        document.getElementById('total').innerHTML += data.quantity
    })
}

const start = () => {
    users()
    chartGender()
    chartAges()
    chartFrecuency()
    chartEnfermedades()
    chartEjercicios()
    chartImc()
}

window.onload = start()