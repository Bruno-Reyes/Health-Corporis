document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

const calculos = () => {
    let peso = document.getElementById('peso').value
    let estatura = document.getElementById('estatura').value
    let data = [true, {}]
    /*  Aqui se validan los datos si todo es correcto se modifica el valor de la posicion 0 en data a true*/

    if (data[0] == false) {
        data[1].message = 'Los datos son invalidos , intentalo de nuevo'
        M.toast({ html: data[1].message })
    } else {
        data[1].peso = peso
        data[1].estatura = estatura
        /* Calcular el imc */
        peso = parseInt(peso)
        estatura = parseInt(estatura) / 100
        let imc = peso / (estatura * estatura)
        imc = imc.toString().substring(0, 5)
        data[1].imc = imc
    }

    return data
}

const registrarSeguimiento = () => {
    let data = calculos()

    fetch('/user/registroSeguimiento', {
        method: 'POST',
        body: JSON.stringify(data[1]),
        headers: {
            'Accept': 'apliccation/json',
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => {
            M.toast({ html: res.message })
            drawChartFollow()
        })
}

const drawBackgroundColor = () => {
    dataToChart().then(rows => {
        for (let i = 0; i < rows.length; i++) {
            rows[i][0] = rows[i][0].substring(0, 10)
        }
        let data = new google.visualization.DataTable()
        data.addColumn('string', 'X')
        data.addColumn('number', 'IMC')
        data.addRows(rows)

        let options = {
            hAxis: {
                title: 'Fecha'
            },
            vAxis: {
                title: 'IMC'
            },
            backgroundColor: '#f1f8e9'
        }

        let chart = new google.visualization.LineChart(document.getElementById('chart_div'))
        chart.draw(data, options)
    })
}

const drawChartFollow = () => {
    google.charts.load('current', { packages: ['corechart', 'line'] })
    google.charts.setOnLoadCallback(drawBackgroundColor)
}

const dataToChart = () => {
    return fetch('/user/dataChart')
        .then(res => res.json())
        .then(res => {
            return res
        })

}

const dataTable = () => {
    return fetch('/user/dataTable')
        .then(res => res.json())
        .then(res => {
            return res
        })
}

const drawTable = () => {
    dataTable().then(data => {
        
        let table = `
        <table class="responsive-table">
        <thead>
          <tr>
              
              <th>Fecha</th>
              <th>Peso (kg)</th>
              <th>Estatura (cm)</th>
              <th>IMC</th>
          </tr>
        </thead>
        <tbody>`

        for (const obj of data) {
            table += `
            <tr>
            <td>${obj.fec_reg.substring(0,10).split('-').reverse().join('-')}</td>
            <td>${obj.peso}</td>
            <td>${obj.est_seg}</td>
            <td>${obj.imc_seg}</td>
            </tr>
            `
        }

        table += `
        </tbody>
        </table>`

        document.getElementById('datatable').innerHTML = table
    })
}

const initFuncion = () => {
    drawChartFollow()
    drawTable()
}

window.onload = initFuncion() 