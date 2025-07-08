const conexion = require('./conexion');

const categories_q = {
    getAllCategories: (callback) => {
        conexion.query('SELECT * FROM categories', callback);
    },
    getCategoryByID: (id_category, callback) => {
        conexion.query('SELECT * FROM categories WHERE id_category = ?', [id_category], callback);
    },
    addNewCategory: (dataCategory, callback) => {
        conexion.query('INSERT INTO categories SET ?', [dataCategory], callback);
    },
    updateCategory: (dataCategory, idCategory, callback) => {
        conexion.query('UPDATE categories SET ? WHERE id_category = ?', [dataCategory, idCategory], callback);
    },
    deleteCategory: (id_category, callback) => {
        conexion.query('DELETE FROM categories WHERE id_category = ?', [id_category], callback);
    },
};

module.exports = categories_q;