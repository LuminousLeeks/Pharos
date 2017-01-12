const socketioJwt = require('socketio-jwt');
const exampleData = require('./../../../data/exampleData');
const sio = require('./../server.js');


sio.sockets
  .on('connect', socketioJwt.authorize({
    secret: process.env.JWT_SECRET,
    handshake: true
    timeout: 10000, // 10 seconds to send the authentication message
    callback: false, // disconnect socket server side if invalid token
    console.log('authenticating');
  }))
  .on('authenticate', (socket1) => {
    socket1.emit('authenticated', () => {
      console.log('hello!' + socket1.decoded_token);
    })
  .on('authenticated', (socket2) => {
    console.log('Get Notifications on Server'); //  TEST
    socket2.emit(''); // TEST
  })
  });
