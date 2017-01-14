// const socketioJwt = require('socketio-jwt');
const exampleData = require('./../../../data/exampleData.js');
const socketAuth = require('./auth').socketAuth;

module.exports = (io) => {
  socketAuth(io, (socket) => {
    socket.emit('text', 'Hello from Server');
    socket.on('getNotifications', (callback) => {
      callback(exampleData);
    });
  });
};

