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

//  TODO: SSL? const sslPort = 3011;
server.listen(port, () => logger.info(`Server listening on ${port}!`));

//  Socket.io connection established
const io = require('socket.io')(server);

module.exports = { app, io };

//  Prevent circular dependency by defining routes after exports
const router = require('./routes/router');

app.use('/api', router);

//  TODO: Determine whether additional handling/rendering of static files is needed
//  Send all other API requests to client side router
app.get('/*', (req, res) => {
  res.status(200).send('Hello from Pharos server!');
});
