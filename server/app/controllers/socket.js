const socketioJwt = require('socketio-jwt');
const exampleData = require('./../../../data/exampleData');

module.exports.pharosController = (pharosSocket) => {
  pharosSocket
    .on('connection', socketioJwt.authorize({
      secret: JSON.stringify(process.env.JWT_SECRET),
      handshake: true,
      timeout: 10000, // 10 seconds to send the authentication message
      callback: false, // disconnect socket server side if invalid token
    }))
    .on('authenticated', (socket) => {
      pharosSocket.on('getNotification', (socket) => {
        socket.emit('notification', callback);
        callback(exampleData);
      });
    })
    .on('disconnect', () => {
      pharosSocket.emit('user disconnected');
    });
};
