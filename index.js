/*
 TODO:
 - make crud roles
 - using group routing
 
 NOTE:
 - url-pattern: domain.com/rest/v1/resource/params
 */

require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.APP_PORT || 5000;
const urlPrefixV1 = '/rest/v1';

// write log on terminal
app.use(logger('tiny'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// NOTE: Start Router
// import routes
const AuthRouter = require('./src/routes/auth');
const UsersRouter = require('./src/routes/users');
const AddressesRouter = require('./src/routes/addresses');
const CategoriesRouter = require('./src/routes/categories');
const StoresRouter = require('./src/routes/stores');

// use routes
app.use(`${urlPrefixV1}/auth`, AuthRouter);
app.use(`${urlPrefixV1}/users`, UsersRouter);
app.use(`${urlPrefixV1}/addresses`, AddressesRouter);
app.use(`${urlPrefixV1}/categories`, CategoriesRouter);
app.use(`${urlPrefixV1}/stores`, StoresRouter);

// NOTE: End Router

// error middleware
// run if no routes matching
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error middleware
// send error json to clients
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
    },
  });
});

// run server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
