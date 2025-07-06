const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'libreria_ibq'
});

conexion.connect((result) => {
    if(result) throw result;

    console.log('Connection stablished');
});

module.exports = conexion;