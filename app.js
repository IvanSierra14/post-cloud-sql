'use strict';

const createError = require('http-errors');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

//Default enviroment
require(process.cwd()+ '/config/config.js');

//Routes

const userRouter = require('./routes/user');




const app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors(corsOptions)); //TODO: Enable CORS properly.
  app.options('*', cors()) // include before other routes

  
app.use(logger(process.env.NODE_ENV));
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());




app.use('/api/users', userRouter);


app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};
  
    console.log(err)
  
    // render the error page
    res.status(err.status || 500);
    res.send(err);
});




module.exports = app;