var express = require('express');
var router = express.Router();
const documents_db = require('../models/documents-mysql');
const fs = require('fs');

// multer para guardar datos
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext)
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9_.-]/g, '');

        const finalName = `${baseName}${ext}`;
        cb(null, finalName);
    }
});

const upload = multer({ storage });


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

router.post('/addNewDocument', upload.single('document'), (req, res) => {
    try {
        const file = req.file;
        const doc = JSON.parse(req.body.data);

        if (!file) return res.status(400).json({ ok: false, message: 'Archivo no recibido' });


        documents_db.addNewDocument(doc, (err, result) => {
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

router.delete('/deleteDocument/:id', async (req, res) => {
    try {
        documents_db.getDocumentByID(req.params.id, (err, result) => {
            if (err) return res.status(500).json({ ok: false, message: err });
            
            const { file_path } = result[0];

            fs.unlink(file_path, (err) => {
                if (err) {
                    console.error(`Error removing file: ${err}`);
                    return;
                }

                console.log(`File ${file_path} has been successfully removed.`);
            });

            documents_db.deleteDocument(req.params.id, (error, resultado) => {
                if (error) return res.status(500).json({ ok: false, message: error });

                return resultado.affectedRows === 0 ?
                    res.status(404).json({ ok: false, message: 'document-not-found' }) :
                    res.status(200).json({ ok: true, message: result });
            });
        });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error });
    }
});

module.exports = router;