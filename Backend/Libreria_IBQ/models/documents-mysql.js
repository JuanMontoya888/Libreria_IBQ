const conexion = require('./conexion');

const documentos_q = {
    getAllDocuments: (callback) => {
        conexion.query('SELECT * FROM documents', callback);
    },
    getDocumentByID: (idDocument, callback) => {
        conexion.query('SELECT * FROM documents WHERE id_document = ?', [idDocument], callback);
    },
    addNewDocument: (dataDocument, callback) => {
        conexion.query('INSERT INTO documents SET ?', [dataDocument], callback);
    },
    updateDocument: (dataDocument, idDocument, callback) => {
        conexion.query('UPDATE documents SET ? WHERE id_document = ?', [dataDocument, idDocument], callback);
    },
    deleteDocument: (idDocument, callback) => {
        conexion.query('DELETE FROM documents WHERE id_document = ?', [idDocument], (err, result) => {
            callback(err, result);
        });
    },
};

module.exports = documentos_q;