var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const port = 3000;

app.use(express.static(__dirname + '/../client/'));

server.listen(port, () => {
  console.log("Server listening on port " + port);
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

const rooms = []

io.on('connection', function (socket) {
  socket.on('createRoom', function (roomName) {
    console.log(roomName);
    socket.join(roomName);
    rooms.push(roomName);

    socket.on('eventsRequest', function() {
      console.log("send events to " + roomName);
      io.to(roomName).emit('events', {events: roomName});
    });


    socket.on('reportEvents', function(events) {
      console.log("send events to " + events); //
      // server finds room names
      // foreach  room name send events to client
      // io.to(roomName).emit('events', {events: roomName});
    });
  });
});

// setTimeout(() => {
//   console.log("sending push notification to bing");
//   if (rooms.includes('bing')) {
//     io.to('bing').emit('events', {events: 'push notification'});
//   }
// }, 5000);
