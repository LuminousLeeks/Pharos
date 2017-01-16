// const bingsSocket = io('http://localhost:8099');
let token = '';
const username = 'borat';
const password = 'borat';

$.ajax({
  type: "POST",
  url: 'http://localhost:8099/api/auth/login',
  data: { username, password },
  success: (res) => {
    token = res.token;

    const bingsUniqueIdentifier = 'bing';
    const bingsSocket = io.connect( 'http://127.0.0.1:8099/socket', {query: token});

    bingsSocket.on( 'connect', function () {
      console.log( 'connected to server 2' );
      bingsSocket
        .emit('authenticate', {token: token}) //send the jwt
        .on('authenticated', function () {
          console.log('authenticated');

          bingsSocket.emit('text', 'Client: hello');
          bingsSocket.on('text', (text) => {
            console.log(text);
          });
          bingsSocket.emit('createRoom', bingsUniqueIdentifier);
          bingsSocket.emit('getNotifications', bingsUniqueIdentifier, (notifications) => {
            console.log("Notifications from server", notifications);
          });

          bingsSocket.emit('reportNotification', { bings: 'notification' });
          bingsSocket.on('pushNotification', (notification) => {
            console.log(notification);
          });

          bingsSocket.emit('setUserConfigurations', { bings: 'user configurations' });
          bingsSocket.on('pushNotifications', (notifications) => {
            console.log(notifications);
          });
        })
        .on('unauthorized', function(msg) {
          console.log("unauthorized: " + JSON.stringify(msg.data));
          throw new Error(msg.data.type);
        })
    });
  },
});


//=========================================
// Socket connections to origin
//=========================================

// const craigsSocket = io.connect('http://localhost:3000');
// craigsSocket.on( 'connect', function () {
//     console.log( 'connected to server 1' );
// } );
// const craigsUniqueIdentifier = 'craig';
// craigsSocket.emit('createRoom', craigsUniqueIdentifier);
// craigsSocket.emit('eventsRequest');
// craigsSocket.on('events', function (data) {
//   console.log(data);
// });
//
//
// const efesSocket = io('http://127.0.0.1:8099');
// const efesUniqueIdentifier = 'efe';
// efesSocket.emit('createRoom', efesUniqueIdentifier);
// efesSocket.emit('eventsRequest');
// efesSocket.on('events', function (data) {
//   console.log(data);
// });
//
// const seansSocket = io('http://127.0.0.1:8099');
// const seansUniqueIdentifier = 'sean';
// seansSocket.emit('createRoom', seansUniqueIdentifier);
// seansSocket.emit('eventsRequest');
// seansSocket.on('events', function (data) {
//   console.log(data);
// });
// seansSocket.emit('eventsRequest');
// seansSocket.emit('eventsRequest');
// seansSocket.emit('eventsRequest');
// seansSocket.emit('eventsRequest');
// seansSocket.emit('eventsRequest');
//
//
// setTimeout(() => {
//   console.log("sending push notification to bing");
//   bingsSocket.emit('reportEvents', {events: ['rawr']});
// }, 7000);
