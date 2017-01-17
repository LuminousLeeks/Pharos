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

      socket.on('getNotifications', (userID, location, callback) => {
        getNotifications(userID, location)
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
     
      //create user implementation dependent:
      // socket.on('createUser', (userConfigurations, userId) => {
      //   insertUser(user, userConfigurations)
      //     .then(user => getNotifications(user.id)
      //       .then(notifications => io.to(user.id)
      //         .emit('getNotifications', (userId, callback) => callback(notifications))))
      //       .catch(error => { throw error; });
      // });

      socket.on('setUserConfigurations', (userConfigurations, userId) => {
        updateUser(userId, userConfigurations);
      });
    });
  });
};
