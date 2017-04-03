const socketAuth = require('./auth').socketAuth;

const rooms = [];
const { getNotifications, insertNotification, updateUser, insertVote } = require('../../db/utils.js');

module.exports = (io) => {
  socketAuth(io, (socket) => {
    socket.on('createRoom', (roomName) => {
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
          io.to(vote.userId)
            .emit('sendVoteSucceed', insertedVote);
        });
      });

      socket.on('reportNotification', (notification) => {
        // server finds room names
        // foreach  room name send notifications to client
        insertNotification(notification)
        .then(({userList, newNotification}) => {
          userList.forEach((userId) => {
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
};
