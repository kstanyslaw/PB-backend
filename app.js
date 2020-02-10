const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const app = express();

const mongoose = require('mongoose');
//  CONNECT DB
mongoose.connect(
        'mongodb+srv://' +
        process.env.DB_USER +
        ':' +
        process.env.DB_PWD +
        '@cluster0-0qj9w.gcp.mongodb.net/' +
        process.env.DB_NAME +
        '?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
    )
    .then(
        () => { console.log('\x1b[1m', 'Successfuly connected to DataBase:)\n', '\x1b[0m') }
    )
    .catch((err) => {
        console.error('\x1b[31m', 'Connection to DataBase failed because of:', err.errmsg, '\x1b[0m');
        console.error('See also full error message: \n', err)
    });

// CORS RULES
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

module.exports = app;