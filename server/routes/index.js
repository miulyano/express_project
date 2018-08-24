const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/index');
const ctrlAdmin = require('../controllers/admin');
const ctrlLogin = require('../controllers/login');

router.get('/', ctrlHome.getIndex);
router.get('/admin', ctrlAdmin.getAdmin);
router.get('/login', ctrlLogin.getLogin);

module.exports = router;
