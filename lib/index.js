require('dotenv').config();

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import multer from 'multer'; // user upload file (handling multipart/form-data)
import mongoose from 'mongoose';

import { startDatabase } from './utils';
import indexRouter from './routers/index';
import authRouter from './routers/auth.router.js';

const app = express();
const port = 3000;

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/users', authRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
//   });

// error handler
app.use(function (err, req, res, next) {
    console.error({err});
    res.status(500).send(err);
});

app.listen(port, () => {
    startDatabase();
    console.log(`Server listen on port: http://localhost:${port}`);
});
