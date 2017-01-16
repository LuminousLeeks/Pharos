// const socketioJwt = require('socketio-jwt');
const exampleData = require('./../../../data/exampleData.js');
const socketAuth = require('./auth').socketAuth;


const getNotificationsFromDB = (userID) => {

  return exampleData;
}
const insertNotification = (event) => {
  return
}

const rooms = [];

module.exports = (io) => {
  socketAuth(io, (socket) => {
    socket.emit('text', 'Server: Hello!!!!');
    socket.on('text', (text) => {
      console.log(text);
    });

    socket.on('createRoom', function (roomName) {
      console.log(roomName);
      socket.join(roomName);
      rooms.push(roomName);

      socket.on('getNotifications', (userID, callback) => {
        console.log('getNotifications');

        // using userID, server find the proper events
        // send back events

        // TODO: remove this line
        callback(exampleData);
        //callback(getNotificationsFromDB(userID));

        // io.to(roomName).emit('events', {events: roomName});
      });

      socket.on('reportNotification', function(notification) {
        console.log('reportNotification');

        // server finds room names
        // foreach  room name send notifications to client
        // insertNotification(notification)
        // .then((userIds, notification)=> {
        //   userIds.forEach((userId) => {
        //
        //     // TODO: remove this line
        //     let notification = exampleData[1];
        //
        //     io.to(userId).emit('pushNotification', notification);
        //   })
        // });
      });

      socket.on('setUserConfigurations', (userConfigurations) => {
        console.log('setUserConfigurations');
        //updateUserConficuration(userConfigurations)

        // TODO: remove this line
        let notifications = exampleData;

        //send back notifications
        io.to(userConfigurations.userId).emit('pushNotifications', notifications);
      });
    });
  });
};
