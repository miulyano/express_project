const db = require('../models/db');

module.exports.getIndex = function (req, res) {
    const products = db.getState().products || [];
    const skills = db.getState().skills || [];
    res.render('pages/index', {products: products, skills: skills});
};
