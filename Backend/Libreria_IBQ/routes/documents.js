var express = require('express');
var router = express.Router();
const documents_db = require('../models/documents-mysql');

/* GET categories listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// Get all documents
router.get('/getAllDocuments', (req, res) => {
    try {
        documents_db.getAllDocuments((err, result) => {
            if (err) return res.status(500).json({ ok: false, message: err });

            return result.length === 0 ?
                res.status(200).json({ ok: false, documents: result }) :
                res.status(200).json({ ok: true, documents: result });

        });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error });
    }
});

router.post('/addNewDocument', (req, res) => {
    try {
        documents_db.addNewDocument(req.body, (err, result) => {
            if (err) return res.status(500).json({ ok: false, message: err });

            return res.status(200).json({ ok: true, message: result });
        });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error });
    }
});

router.post('/updateDocument', (req, res) => {
    try {
        const { dataDocument, idDocument } = req.body;

        documents_db.updateDocument(dataDocument, idDocument, (err, result) => {
            if (err) return res.status(500).json({ ok: false, message: err });

            return result.affectedRows === 0 ?
                res.status(404).json({ ok: false, message: 'document-not-found' }) :
                res.status(200).json({ ok: true, message: result });
        });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error });
    }
});

router.delete('/deleteDocument/:id', (req, res) => {
    try {
        documents_db.deleteDocument(req.params.id, (err, result) => {
            if (err) return res.status(500).json({ ok: false, message: err });

            return result.affectedRows === 0 ?
                res.status(404).json({ ok: false, message: 'document-not-found' }) :
                res.status(200).json({ ok: true, message: result });
        });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error });
    }
});

module.exports = router;