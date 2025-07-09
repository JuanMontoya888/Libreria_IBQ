const conexion = require('./conexion');

const users_q = {
    getAllUsers: (callback) => {
        conexion.query('SELECT * FROM users', callback);
    },
    getUserByID: (id, callback) => {
        conexion.query('SELECT * FROM users WHERE id_account = ?', [id], callback);
    },
    getUserByUsername: (username, callback) => {
        conexion.query('SELECT * FROM users WHERE username = ?', [username], callback);
    },
    addNewUser: (dataUser, callback) => {
        conexion.query('INSERT INTO users SET ?', [dataUser], callback);
    },
    updateUser: (dataUser, id, callback) => {
        conexion.query('UPDATE users SET ? WHERE id_account = ?', [dataUser, id], callback);
    },
    deleteUser: (id, callback) => {
        conexion.query('DELETE FROM users WHERE id_account = ?', [id], (err, result) => {
            callback(err, result);
        });
    },
};

module.exports = users_q;