//  TODO: Uncomment when SSL set up
// const https = require('https');

require('dotenv').config();

// require('dotenv').config();

const port = require('./../env/index').PORT;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./utils/logger');
const db = require('../db/db.js');
const initializeDb = require('../db/utils.js').initializeDb;

const app = express();

// check database connection and create tables if non existent.
db.authenticate().then(() => {
  console.log('connected to the database');
  // db.sync();
  // initializeDb(); // you don't do that once the db is deployed.
}).catch((error) => {
  console.log('cannot connect to the db');
  throw error;
});

//  Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  Logging Middleware
app.use(morgan('dev'));
app.use(logger, express.static(path.join(__dirname, 'allLogs')));

const server = require('http').Server(app);

//  TODO: SSL? const sslPort = 3011;
server.listen(port, () => logger.info(`Server listening on ${port}!`));

//  Socket.io connection established
const io = require('socket.io')(server);

//  Prnotification circular dependency by defining routes after exports
module.exports.io = io;
module.exports.app = app;

//  Prnotification circular dependency by defining routes after exports
const router = require('./routes/router');
app.use('/api', router);

//  TODO: Determine whether additional handling/rendering of static files is needed
//  Send all other API requests to client side router
app.get('/*', (req, res) => {
  res.status(200).send('Hello from Pharos server!');
});
