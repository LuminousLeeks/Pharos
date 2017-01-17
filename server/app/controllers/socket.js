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

// const user = {
//   username,
//   firstName,
//   lastName,
//   password,
//   email,
// }
//
// const settings = {
//   radius: int,
//   subscriptions: [1,2,3,4]
// }

const insertUser = (user, settings) => {
  console.log('setUserConfigurations');
}

const updateUser = (userId, settings) => {
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

      // socket.on('createUser', (userConfigurations, userId, callback) => {
      //   console.log('createUser');
      //   //send back notifications
      //   // TODO: do we want to use a callback here?
      //   insertUser(user, settings);
      // });

      socket.on('setUserConfigurations', (userConfigurations, userId) => {
        updateUser(userId, settings);
      });
    });
  });
};
