
//  TODO: Uncomment when SSL set up
// const https = require('https');
const path = require('path');

const express = require('express');

const app = express();
const logger = require('./utils/logger.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//  Middleware
app.use(morgan('dev'));
app.use('./utils/logger.js', express.static(path.join(__dirname, 'allLogs.log')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8090;
const server = require('http').Server(app);

//  Server and Socket.io initialization
server.listen(port, () => logger.info(`Server listening on ${port}!`));
//  TODO: SSL? const sslPort = 3011;

const io = require('socket.io')(server);

//  Prevent circular dependency by defining router after exports
module.exports = { app, io };
const router = require('./routes.js');

//  Routes
app.use('/api', router);

//  TODO: Determine whether additional handling/rendering of static files is needed
//  Send all other API requests to client side router
app.get('*', (req, res) => {
  res.status(200).send('Hello from Pharos server!');
});
