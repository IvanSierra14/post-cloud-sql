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
const podcastRouter = require('./routes/podcast');
const userRouter = require('./routes/user');
const userConfirmation = require('./routes/userConfirmation');
const imageRouter = require('./routes/images');
const itemRouter = require('./routes/item');
const schedulerRouter = require('./routes/scheduler');
const vilynxRouter = require('./routes/vilynx');
const categoryRouter = require('./routes/category');
const channelRouter = require('./routes/channel');
const tagRouter = require('./routes/tag');
const sdkRouter = require('./routes/sdk');
const companyRouter = require('./routes/company');
const analyticRouter = require('./routes/analytics');
const dashboardRouter = require('./routes/dashboard');



const authRouter = require('./routes/auth');



const app = express();
const authenticate = require('./services/auth').authenticate;

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

//Swagger
if (process.env.NODE_ENV !== 'pro'){
    const swaggerUi = require('swagger-ui-express');
    const swaggerSpec = require('./swagger')
    app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

app.use('/api/auth', authRouter);
app.use('/api/confirmation', userConfirmation);
app.use('/api/scheduler', schedulerRouter);
app.use('/api/vilynx', vilynxRouter);
app.use('/api/users', authenticate, userRouter);
app.use('/api/image', authenticate, imageRouter);
app.use('/api/podcasts', authenticate, podcastRouter);
app.use('/api/items', authenticate, itemRouter);
app.use('/api/categories', authenticate, categoryRouter);
app.use('/api/channels', authenticate, channelRouter);
app.use('/api/tags', authenticate, tagRouter);
app.use('/api/sdk', authenticate, sdkRouter);
app.use('/api/companies', authenticate, companyRouter);
app.use('/api/analytics', analyticRouter);
app.use('/api/dashboard', authenticate, dashboardRouter);


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