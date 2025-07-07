var express = require('express');
var router = express.Router();
const categories_db = require('../models/categories-mysql');

/* GET categories listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;