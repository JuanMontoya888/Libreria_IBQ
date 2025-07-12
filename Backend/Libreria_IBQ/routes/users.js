var express = require('express');
var router = express.Router();
const users_db = require('../models/users-mysql');

// encriptar contrasenias
const saltRounds = 10;
const bcrypt = require('bcrypt');

// Leer un excel
const XlsxPopulate = require('xlsx-populate');
// Configurar multer para almacenar archivos en memoria
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


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
    const { user } = req.body;
    const hash = await bcrypt.hash(user.passw, saltRounds);
    const userModify = {
      ...user,
      passw: hash
    };

    users_db.addNewUser(userModify, (err, result) => {
      if (err) return res.status(500).json({ ok: false, message: err });

      return result.success ?
        res.status(200).json({ ok: true, message: result }) :
        res.status(200).json({ ok: false, message: result });

    });

  } catch (error) {
    return res.status(500).json({ ok: false, message: error });
  }
});

//Add users
router.post('/addNewUsers', upload.array('files'), async (req, res) => {
  try {
    // Verificar si se recibieron archivos
    if (!req.files || req.files.length === 0) {
      console.log(req.files, '400');
      return res.status(400).json({ error: 'No se recibieron archivos' });
    }

    // Abrir el archivo
    const files = req.files;

    const results = await Promise.all(Array.from(files).map(async (file) => {
      const workbook = await XlsxPopulate.fromDataAsync(file.buffer);
      const sheet = workbook.sheet(0); // Obtener la primera hoja
      const usedRange = sheet.usedRange(); // Obtener el rango de celdas usadas
      const data = usedRange.value(); // Obtener los datos como un array de arrays

      const jsonData = [];
      const headers = data[0];
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const rowObject = {};
        headers.forEach((header, index) => {
          rowObject[header] = row[index];
        });
        jsonData.push(rowObject);
      }
      return { filename: file.originalname, data: jsonData };
    }));



  } catch (error) {
    return res.status(500).json({ ok: false, message: error });
  }
});

// Modify user
router.post('/updateUser', async (req, res) => {
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

    console.log(username, password);

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