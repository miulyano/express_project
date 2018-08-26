const express = require('express');
const router = express.Router();

const isAdmin = (req, res, next) => {
    if(req.session.isAdmin) {
        return next();
    }
    res.redirect('/');
};

const ctrlHome = require('../controllers/index');
const ctrlAdmin = require('../controllers/admin');
const ctrlLogin = require('../controllers/login');
const ctrlMail = require('../controllers/mail');

router.get('/', ctrlHome.getIndex);
router.get('/admin', isAdmin, ctrlAdmin.getAdmin);
router.get('/login', ctrlLogin.getLogin);

router.post('/', ctrlMail.postMail);
router.post('/login', ctrlLogin.auth);
router.post('/admin/upload', isAdmin, ctrlAdmin.postItem);
router.post('/admin/skills', isAdmin, ctrlAdmin.postSkills);

module.exports = router;
