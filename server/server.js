
const express = require('express');
const app = express();
const db = require('./db/db.js');
//TODO: actually get data from server
const exampleData = require('../data/exampleData');

// const path = require('path');
const router = require('./routes.js');
const bodyParser = require('body-parser');

//  TODO: Link Front-End Static Files
// app.use(express.static(path.join(__dirname, '../client/dist')));

// app.use( (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.use(bodyParser.json());

// app.post('/login', (req, res) => {
//   res.send({ success: true });
// });

// app.post('/signup', (req, res) => {
//   res.send({ success: true });
// });

// app.use('/api', router);

// WTF?
const http = require('http').Server(app);
const io = require('socket.io')(http);

// app.get('/', (req, res) => {
//   res.sendfile('Welcome to the SERVER.');
// });

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('text', 'Hi Client!');

  socket.on('getNotifications', (callback) => {
    // TODO: get notifications from database and pass them back to the client
    // TODO: Find out if we need to JSON.stringify the data before sending it back to the  client
    console.log('serving notifications');

    callback(exampleData);
  });
});

// app.listen(3000, () => {
// //  TODO: Delete testing listen function below, uncomment app.listen
//   console.log('Example app listening on port 3000!');
// });


http.listen(3000, () => {
  console.log('listening on *:3000');
});
