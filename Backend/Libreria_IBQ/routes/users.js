var express = require('express');
var router = express.Router();
const users_db = require('../models/users-mysql');
const documents_db = require('../models/documents-mysql');
const categories_db = require('../models/categories-mysql');

// encriptar contrasenias
const saltRounds = 10;
const bcrypt = require('bcrypt');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Get all users
router.get('/getAllUsers', (req, res) => {
  try {
    users_db.getAllUsers((err, result) => {
      if (err) return res.status(500).json({ ok: false, message: err });
      res.status(200).json({ ok: true, users: result });
    });

  } catch (error) {
    return res.status(500).json({ ok: false, message: error });
  }
});

// Get an user with their id
router.get('/getUserByID/:id', (req, res) => {
  try {
    users_db.getUserByID(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ ok: false, message: err });

      return result.length === 0 ?
        res.status(404).json({ ok: false, message: 'user-not-found' }) : res.status(200).json({ ok: true, user: result });
    });

  } catch (error) {
    return res.status(500).json({ ok: false, message: error });
  }
});

// Add new User
router.post('/addNewUser', async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.passw, saltRounds);

    const user = {
      ...req.body,
      passw: hash
    };

    users_db.addNewUser(user, (err, result) => {
      if (err) return res.status(500).json({ ok: false, message: err });

      res.status(200).json({ ok: true, message: result });
    });

  } catch (error) {
    return res.status(500).json({ ok: false, message: error });
  }
});

router.delete('/deleteUser/:id', (req, res) => {
  try {
    users_db.deleteUser(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ ok: false, message: err });

      return result.affectedRows === 0 ?
        res.status(404).json({ ok: false, message: 'user-not-found' }) : res.status(200).json({ ok: true, message: result });
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error });
  }
});


module.exports = router;