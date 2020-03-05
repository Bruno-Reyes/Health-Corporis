const mysql = require('mysql');
const { promisify } = require('util');

const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code  === 'PROTOCOL_CONNECTION_LOST'){
            console.error('SE HA PERDIDO LA CONEXIÓN A LA BASE DE DATOS :(');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE DEMASIADAS CONEXIONES ☻');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('LA BASE DE DATOS RECHAZÓ LA CONEXION F EN EL CHAT');
        }
    }
    if(connection) connection.release();
    console.log('DB CONNECTED ♥');
    return;
});
//CONVERTIR PROMESAS
pool.query = promisify(pool.query);
module.exports = pool;