const conexion = require('./conexion');

const categories_q = {
    getAllCategories: (callback) => {
        conexion.query('SELECT * FROM categories', callback);
    },
    addNewCategory: (dataCategory, callback) => {
        conexion.query('INSERT INTO categories SET ?', [dataCategory], callback);
    },
    updateCategory: (dataCategory, id_category, callback) => {
        conexion.query('UPDATE categories SET ? WHERE id_category = ?', [dataCategory, id_category], callback);
    },
    deleteCategory: (id_category, callback) => {
        conexion.query('DELETE FROM categories WHERE id_category = ?', [id_category], (err, result) => {
            callback(err, result);
        });
    },
};

module.exports = categories_q;