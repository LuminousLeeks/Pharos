var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
const port = 3000

app.use(express.static(__dirname + '/../client/'))

server.listen(port, () => {
  console.log('Server listening on port ' + port)
})

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html')
})

const rooms = []

io.on('connection', function (socket) {
  socket.on('createRoom', function (roomName) {
    console.log(roomName)
    socket.join(roomName)
    rooms.push(roomName)

    socket.on('notificationsRequest', function () {
      console.log('send notifications to ' + roomName)
      io.to(roomName).emit('notifications', {notifications: roomName})
    })

    socket.on('reportNotifications', function (notifications) {
      console.log('send notifications to ' + notifications) //
      // server finds room names
      // foreach  room name send notifications to client
      // io.to(roomName).emit('notifications', {notifications: roomName});
    })
  })
})

// setTimeout(() => {
//   console.log("sending push notification to bing");
//   if (rooms.includes('bing')) {
//     io.to('bing').emit('notifications', {notifications: 'push notification'});
//   }
// }, 5000);
