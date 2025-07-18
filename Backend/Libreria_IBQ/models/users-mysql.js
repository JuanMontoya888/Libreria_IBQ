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
        conexion.query('SELECT id FROM users WHERE id = ?', [dataUser.id], (err, result) => {
            if (err) return callback(err, { success: false, message: `error-server` });
            if (result.length > 0) return callback(null, { success: false, message: `user-exists` });

            // Si no existe, insertamos el usuario
            conexion.query('INSERT INTO users SET ?', [dataUser], (err, result) => {
                if (err) return callback(err, { success: false, message: `error-server` });

                return callback(null, {
                    success: true,
                    message: `was-created`,
                    insertId: result.insertId
                });
            });
        });
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