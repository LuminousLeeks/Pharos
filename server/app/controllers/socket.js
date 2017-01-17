// const socketioJwt = require('socketio-jwt');
// const exampleData = require('./../../../data/exampleData.js');
const socketAuth = require('./auth').socketAuth;
const rooms = [];
const { getNotifications, insertNotification, updateUser, insertVote } = require('../../db/utils.js');


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
      socket.on('sendVote', (vote) => {
        insertVote(vote)
        .then((insertedVote) => {
          console.log('inserted vote to db ~~~~~~~~~~~~~');
          console.log(insertedVote);
        });
      socket.on('getUserInfo', (userId, callback) => {
        getUserInfoFromDB(userId)
        .then((info) => {
          callback(info);
        });
      });

        io.to(vote.userId)
          .emit('updateNotification', 'server updated vote');
      });

      socket.on('reportNotification', (notification) => {
        // server finds room names
        // foreach  room name send notifications to client
        console.log(notification, 'this is the notification from the client');

        insertNotification(notification)
        .then((userIds, newNotification) => {
          userIds.forEach((userId) => {
            io.to(userId).emit('pushNotification', newNotification);
          });
        });
      });

      // userConfigurations should be an object with {email, firstName, subscriptions, lastName, password } etc.
      socket.on('setUserConfigurations', (userConfigurations, userId) => {
        updateUser(userId, userConfigurations);
      });
    });
  });
  });
}