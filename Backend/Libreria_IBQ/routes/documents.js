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


module.exports = router;