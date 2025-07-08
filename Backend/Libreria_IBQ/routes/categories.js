var express = require('express');
var router = express.Router();
const categories_db = require('../models/categories-mysql');

/* GET categories listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/getAllCategories', (req, res) => {
    try {
        categories_db.getAllCategories((err, result) => {
            if (err) return res.status(500).json({ ok: false, message: err });

            return result.length === 0 ?
                res.status(200).json({ ok: false, categories: result }) :
                res.status(200).json({ ok: true, categories: result });
        });

    } catch (error) {
        return res.status(500).json({ ok: false, message: error });
    }
});

router.get('/getCategoryByID/:id', (req, res) => {
    try {
        categories_db.getCategoryByID(req.params.id, (err, result) => {
            if (err) return res.status(500).json({ ok: false, message: err });

            return result.length === 0 ?
                res.status(200).json({ ok: false, category: result }) :
                res.status(200).json({ ok: true, category: result });
        });

    } catch (error) {
        return res.status(500).json({ ok: false, message: error });
    }
});

router.post('/addNewCategory', (req, res) => {
    try {
        categories_db.addNewCategory(req.body, (err, result) => {
            if (err) return res.status(500).json({ ok: false, message: err });

            return res.status(200).json({ ok: true, message: result });
        });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error });
    }
});


router.post('/updateCategory', (req, res) => {
    try {
        const { dataCategory, idCategory } = req.body;

        categories_db.updateCategory(dataCategory, idCategory, (err, result) => {
            if (err) return res.status(500).json({ ok: false, message: err });

            return result.affectedRows === 0 ?
                res.status(404).json({ ok: false, message: 'category-not-found' }) :
                res.status(200).json({ ok: true, message: result });
        });

    } catch (error) {
        return res.status(500).json({ ok: false, message: error });
    }
});


router.delete('/deleteCategory/:id', (req, res) => {
    try {
        categories_db.deleteCategory(req.params.id, (err, result) => {
            if (err) return res.status(500).json({ ok: false, message: err });

            return result.affectedRows === 0 ?
                res.status(404).json({ ok: false, message: 'category-not-found' }) :
                res.status(200).json({ ok: true, message: result });
        });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error });
    }
});

module.exports = router;