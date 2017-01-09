//  TODO: Uncomment when SSL set up
// const https = require('https');
require('dotenv').config();

const port = require('./../env/index').PORT;
const express = require('express');
const db = require('../db/db');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./utils/logger');

const app = express();

//  Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//  Logging Middleware
app.use(morgan('dev'));
app.use(logger, express.static(path.join(__dirname, 'allLogs')));

const server = require('http').Server(app);

server.listen(port, () => logger.info(`Server listening on ${port}!`));
//  Server and Socket.io initialization
//  TODO: SSL? const sslPort = 3011;
//  Socket.io connection established
const io = require('socket.io')(server);

app.post('/login', (req, res) => {
  console.log(req.body);
  res.send(200);
});

//  Prevent circular dependency by defining routes after exports
module.exports = { app, io };

const router = require('./routes/router');

//  Routes
app.use('/api', router);

//  TODO: Determine whether additional handling/rendering of static files is needed
//  Send all other API requests to client side router
app.get('/*', (req, res) => {
  res.status(200).send('Hello from Pharos server!');
});
