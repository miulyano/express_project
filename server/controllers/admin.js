const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const db = require('../models/db');

module.exports.getAdmin = function (req, res) {
    res.render('pages/admin');
};

module.exports.postSkills = (req, res, next) => {
    if (!req.body.age || !req.body.concerts || !req.body.cities || !req.body.years) {
        res.render('pages/admin', { status: 'error', msg: 'Все поля нужно заполнить!' });
        return res.redirect("/admin");
    }

    let skills = [
        {
            "number": req.body.age,
            "text": "Возраст начала занятий на скрипке"
        },
        {
            "number": req.body.concerts,
            "text": "Концертов отыграл"
        },
        {
            "number": req.body.cities,
            "text": "Максимальное число городов в туре"
        },
        {
            "number": req.body.years,
            "text": "Лет на сцене в качестве скрипача"
        }
    ];
    db.set('skills', skills).write();
    req.session.isAdmin = true;
    res.render('pages/admin', {status: 'success', msg: 'Счетчики обновлены!'});
};

module.exports.postItem = (req, res, next) => {
    let form = new formidable.IncomingForm();
    let upload = path.join('./', 'upload');
    let fileName;

    form.uploadDir = path.join(process.cwd(), upload);

    form.parse(req, function (err, fields, files) {
        if (err) {
            return next(err);
        }
        const valid = validationUpload(fields, files);

        if (!valid) {
            fs.unlinkSync(files.photo.path);
            res.render('pages/admin', { status: 'error', msgupload: `${valid.status}` });
        }

        fileName = path.join(upload, files.photo.name);

        fs.rename(files.photo.path, fileName, function (err) {
            if (err) {
                console.error(err);
                fs.unlinkSync(fileName);
                fs.rename(files.photo.path, fileName);
            }
            db.get('products').push({ name: fields.name, price: fields.price, src: fileName}).write();
            req.session.isAdmin = true;
            res.render('pages/admin', { status: 'success', msgupload: 'Товар добавлен!' });
        });
    });
};

const validationUpload = (fields, files) => {
    if (files.photo.name === '' || files.photo.size === 0) {
        return {status: 'Не загружена картинка!', err: true};
    }
    if (!fields.name) {
        return {status: 'Не указано название товара!', err: true};
    }
    if (!fields.price) {
        return {status: 'Не указана цена товара!', err: true};
    }
    return {status: 'Ok', err: false};
};
