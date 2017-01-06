
//  TODO: Uncomment when SSL set up
// const https = require('https');
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const logger = require('./utils/logger.js');


const router = require('./routes.js');

const app = express();

app.use(morgan('dev'));
app.use('/api', router);

app.use('./utils/logger.js', express.static(path.join(__dirname, 'allLogs.log')));

const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3008;
//  TODO: Set up SSL connection
//  const sslPort = 3011;
server.listen(port, () => logger.info(`Server listening on ${port}!`));

app.get('/', (req, res) => {
 res.status(200).send('Hello from Pharos server!');
});

io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});


module.exports = app;
