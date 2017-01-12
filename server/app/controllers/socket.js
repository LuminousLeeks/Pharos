const socketioJwt = require('socketio-jwt');
// const exampleData = require('./../../../data/exampleData');
const io = require('./../server.js');


io.sockets
  .on('conect', socketioJwt.authorize({
    secret: process.env.JWT_SECRET,
    handshake: true,
    timeout: 10000, // 10 seconds to send the authentication message
    callback: false, // disconnect socket server side if invalid token
  }))
  .on('authenticate', (socket1) => {
    socket1.emit('authenticated', () => {
      console.log('hello!' + socket1.decoded_token);
    })
  .on('authenticated', (socket2) => {
    console.log('Get Notifications on Server');
    socket2.emit('SERVER SOCKET AUTHENTICATED////////////////');
  })
  });
