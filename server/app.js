const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('views', path.join(__dirname, '../source/template'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', require('./routes'));

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {message: err.message, error: err});
});

const server = app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port ' + server.address().port);
});
