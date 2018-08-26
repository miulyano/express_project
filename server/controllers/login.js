const db = require('../models/db');
const psw = require('../libs/password');

module.exports.getLogin = function (req, res) {
    res.render('pages/login', {msg: false});
};

module.exports.auth = function(req, res) {
    const user = db.getState().user;
    if (!req.body.login || !req.body.password) {
        res.render(('pages/login'), {msg: 'Пожалуйста, заполните все поля!'});
    }
    if (req.body.login !== user.login || !psw.validPassword(req.body.password)) {
        res.render(('pages/login'), {msg: 'Введенные данные не верны!'});
    }
    req.session.isAdmin = true;
    res.redirect("/admin");
};
