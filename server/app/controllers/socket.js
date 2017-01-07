/*eslint-disable*/

const socketioJwt = require('socketio-jwt');

const sio = socketIo.listen(server);

sio.set('authorization', socketioJwt.authorize({
  secret: socket,
  handshake: true
}));

sio.sockets
  .on('connection', (socket) => {
     console.log(socket.handshake.decoded_token.username, 'connected');
});
