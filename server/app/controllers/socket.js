// const socketioJwt = require('socketio-jwt');
const exampleData = require('./../../../data/exampleData');
const socketAuth = require('./auth').socketAuth;

module.exports = (io) => {
  socketAuth(io, (socket) => {
    socket.emit('text', 'Hello from Server');
    socket.on('getNotifications', (callback) => {
      callback(exampleData);
    });
  });
};
// io
//   .on('connect', socketioJwt.authorize({
//       token: token.token
//       secret: process.env.JWT_SECRET,
//       // handshake: true,
//       // timeout: 10000, // 10 seconds to send the authentication message
//       // callback: false, // disconnect socket server side if invalid token
//     }))
//     .on('authenticate', (socket1) => {
//       socket1.emit('authenticated',{token: token.token}, (callback) => {
//         console.log('hello!' + socket1.decoded_token.username);
//         callback(token)
//       })
//     .on('authenticated', (socket2) => {
//       socket2.emit('SERVER SOCKET AUTHENTICATED////////////////');
//     })
//     .on('getNotifications', (callback) => {
//       socket4.emit('getting notification');
//       console.log('DATA COMING IN HOT')
//       callback(exampleData)
//     })
//     .on('unauthorized', (socket3) => {
//       socket3.emit('unauthorized')
//       socket3.disconnect('unauthorized');
//     })
//   });
// }

// module.exports = io;

