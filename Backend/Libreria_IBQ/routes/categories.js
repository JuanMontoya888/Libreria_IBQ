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

module.exports = router;