// const socketioJwt = require('socketio-jwt');
const exampleData = require('./../../../data/exampleData.js');
const socketAuth = require('./auth').socketAuth;
const rooms = [];
const { getNotifications, insertNotification, updateUser, insertVote } = require('../../db/utils.js');

const Promise = require('bluebird');

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
        getNotifications(userID)
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
      // socket.on('createUser', (userConfigurations, userId, callback) => {
      //   console.log('createUser');
      //   //send back notifications
      //   // TODO: do we want to use a callback here?
      //   insertUser(user, settings);
      // });

      socket.on('setUserConfigurations', (userConfigurations, userId) => {
        updateUser(userId, userConfigurations);
      });
    });
  });
};
