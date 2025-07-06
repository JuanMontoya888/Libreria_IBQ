const conexion = require('./conexion');

const documentos_q = {
    getAllDocuments: (callback) => {
        conexion.query('SELECT * FROM documents', callback);
    },
    addNewDocument: (dataDocument, callback) => {
        conexion.query('INSERT INTO documents SET ?', [dataDocument], callback);
    },
    updateDocument: (dataDocument, id_document, callback) => {
        conexion.query('UPDATE documents SET ? WHERE id_document = ?', [dataDocument, id_document], callback);
    },
    deleteDocument: (id_document, callback) => {
        conexion.query('DELETE FROM documents WHERE id_document = ?', [id_document], (err, result) => {
            callback(err, result);
        });
    },
};

module.exports = documentos_q;