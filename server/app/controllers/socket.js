// const socketioJwt = require('socketio-jwt');
const exampleData = require('./../../../data/exampleData.js');
const socketAuth = require('./auth').socketAuth;

const rooms = [];


//======================================================
// TODO: remove this code

const Promise = require('bluebird');

const getNotificationsFromDB = (userID) => {
  console.log('getNotifications');
  return new Promise((resolve, reject) => {
    resolve(exampleData);
  });
}
const insertNotification = (event) => {
  console.log('New event', event)
  console.log('reportNotification');

  return new Promise((resolve) => {
    resolve(rooms, event);
  });
}
const setUserConfigurations = (event) => {
  console.log('setUserConfigurations');
}
//=========================================================


module.exports = (io) => {
  socketAuth(io, (socket) => {
    //===============================
    // TODO: remove this code

    socket.on('text', (text) => {
    socket.emit('text', 'Server: Hello!!!!');
      console.log(text);
    });
    //===============================

    socket.on('createRoom', (roomName) => {
      // TODO: Remove console.log
      console.log('ROOM:', roomName);

      socket.join(roomName);
      rooms.push(roomName);

      socket.on('getNotifications', (userID, callback) => {
        getNotificationsFromDB(userID)
        .then((notifications) => {
          callback(notifications);
        });
      });

      socket.on('reportNotification', (notification) => {
        // server finds room names
        // foreach  room name send notifications to client
        insertNotification(notification)
        .then((userIds, newNotification) => {
          userIds.forEach((userId) => {
            io.to(userId).emit('pushNotification', newNotification);
          });
        });
      });

      socket.on('setUserConfigurations', (userConfigurations, userId, callback) => {
        console.log('setUserConfigurations');
        //send back notifications
        // TODO: do we want to use a callback here?
        setUserConfigurations(userConfigurations, userId);
      });
    });
  });
};
