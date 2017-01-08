// @flow

// import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native';
import App from './App/Containers/App';
import SocketIO from 'react-native-socketio';

AppRegistry.registerComponent('Pharos', () => App);

//=========================================
// Sockets
//=========================================
window.navigator.userAgent = 'ReactNative';

// Need to require instead of import so we can set the user agent first
// This must be below your `window.navigator` hack above
const io = require('socket.io-client');
const socket = io('http://127.0.0.1:3000', {
  transports: ['websocket'], // you need to explicitly tell it to use websockets
});

socket.on('connect', () => {
  console.log('connected!');
  socket.emit('text', 'Hi Server!');
  socket.on('text', (data) => {
    console.log(data);
  });
});

socket.on('connect_error', (data) => {
  console.log('err', data);
});

socket.on('disconnect', () => {
  console.log('disconnected');
});
//=========================================
