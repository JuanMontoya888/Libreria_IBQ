var express = require('express');
var router = express.Router();
const users_db = require('../models/users-mysql');

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

      return result.length === 0 ?
        res.status(200).json({ ok: false, users: result }) :
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
        res.status(404).json({ ok: false, message: 'user-not-found' }) :
        res.status(200).json({ ok: true, user: result });
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

      return res.status(200).json({ ok: true, message: result });
    });

  } catch (error) {
    return res.status(500).json({ ok: false, message: error });
  }
});

// Modify user
router.post('/updateUser', async(req, res) => {
  try {
    const { id, data } = req.body;
    
    data.passw = await bcrypt.hash(data.passw, saltRounds);

    users_db.updateUser(data, id, (err, result) => {
      if (err) return res.status(500).json({ ok: false, message: err });

      return result.affectedRows === 0 ?
        res.status(404).json({ ok: false, message: 'user-not-found' }) :
        res.status(200).json({ ok: true, message: result });
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error });
  }
});

// Delete User
router.delete('/deleteUser/:id', (req, res) => {
  try {
    users_db.deleteUser(req.params.id, (err, result) => {
      if (err) return res.status(500).json({ ok: false, message: err });

      return result.affectedRows === 0 ?
        res.status(404).json({ ok: false, message: 'user-not-found' }) :
        res.status(200).json({ ok: true, message: result });
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error });
  }
});


// Login
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;


    users_db.getUserByUsername(username, async (err, result) => {
      if (err) return res.status(500).json({ ok: false, message: err });
      if (result.length === 0) return res.status(404).json({ ok: false, message: 'user-not-found' });

      // Recorremos todos los posibles casos
      const promises = await Promise.all(result.map(async (us, index) => {
        const isMatch = await bcrypt.compare(String(password), String(us.passw));
        return { isMatch, index };
      }));

      const matchedUser = promises.find((us) => us.isMatch);

      return matchedUser ?
        res.status(200).json({ ok: true, user: result[matchedUser.index], message: 'password-is-match' }) :
        res.status(200).json({ ok: false, message: 'password-is-not-match' });
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error });
  }
});

module.exports = router;