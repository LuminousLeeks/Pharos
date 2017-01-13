/* eslint-disable */
import io from 'socket.io-client'
import { eventChannel } from 'redux-saga'
import { fork, take, call, put, cancel } from 'redux-saga/effects'
import req from 'superagent'

//actions triggered at the end async event
import { loadEvents, loginSuccess } from '../Actions'

//----------------- REST request ---------------------------
//----------------------------------------------------------

//helper function for login POST
export const loginPostsApi = (username, password) => {
  const url = 'http://127.0.0.1:8099';
  return req.post(`${url}/api/auth/login`)
    .send({ username, password })
}

//helper function for signup POST
export const signupPostsApi = (username, password, userInfo) => {
  userInfo = userInfo || {firstName: 'John', lastName: 'Appleseed'}
  firstName = userInfo.firstName;
  lastName = userInfo.lastName;
  const url = 'http://127.0.0.1:8099';
  return req.post(`${url}/api/auth/signup`)
    .send({ username, password, firstName, lastName })
}

function* login() {
    const { username, password } = yield take('LOGIN_REQUEST')
    console.log('login in saga');
    const res = yield call(loginPostsApi, username, password)
    console.log(res.body);
    yield put(loginSuccess( username, res.body.token))
}

function* signup() {
    const { username, password, userInfo } = yield take('SIGNUP_REQUEST')
    const res = yield call(signupPostsApi, username, password, userInfo)
    yield put(loginSuccess( username, res.body))
}
//--------------------Socket Events-------------------------
//----------------------------------------------------------

//helper function for connect socket

function connectSocket(token) {
  // console.log('/////////// CONNECTING TO SOCKET IN SAGA   //////// ')
    const socket = io.connect('http://127.0.0.1:8099/socket', {
      transports: ['websocket'],
      // jsonp: false,
      // query: 'token=' + token
    });
    return new Promise((resolve) => {
      // console.log(socket, 'socket from inside the Promise');
    socket
      .emit('authenticate', { token })
      .on('authenticated', (socket) => {
        console.log('AUTHORIZED CLIENT')
        resolve(socket);
      })
      .on('unauthorized', (msg) => {
        console.log('unauthorized', JSON.stringify(msg.data))
      })
      // socket.emit('authenticate', (so) => {
      //   console.log('############## PROMISE ################')
      //   console.log('############## CONNECTED ################')

      //   resolve(socket);
      // });
    });
}

// function getNotifications(socket, token) {
//   return socket.emit('getNotifications', (events) => {
//       console.log('fetch events using helper function')
//     }
// }



// // ---------handle receiving data from socket
// function getNotifications(socket, token) {
//   return eventChannel(emit => {
//     socket.emit('getNotifications', (events) => {
//       console.log("notifications in Saga", events);
//       emit(loadEvents(events));
//     });
//     return () => {};
//   });
// }
function getNotifications(socket, token) {
  return new Promise((resolve, reject) => {
    socket.emit('GET_NOTIFICATIONS', (events) => {
      // console.log("notifications in Saga", events);
      resolve(events);
    })
  })
}

function* fetchEvents(socket) {
  while (true) {
    const { token } = yield take('FETCH_EVENTS');
    const events = yield call(getNotifications, socket, token);
    yield put(loadEvents(events));
  }
}
//---------handle sending data to socket
function* reportEvent(socket) {
  while (true) {
    const { newEvent } = yield take('REPORT_EVENT');
    console.log('Saga intercept report event: ');
    console.log(newEvent);
    // active this line, once socket is up
    // socket.emit('reportEvent', newEvent);
  }
}

function* voteEvent (socket) {
  while (true) {
    const { event, vote } = yield take('VOTE_EVENT');
    console.log('Saga intercept vote event: ');
    console.log(event, vote);
    // active this line, once socket is up
    // socket.emit('reportEvent', newEvent);
  }
}

//---------combine sending and receiving data
function* handleIO(socket) {
  // yield fork(read, socket);
  yield fork(fetchEvents, socket);
  yield fork(reportEvent, socket);
  yield fork(voteEvent, socket);
}

//---------define flow of Socket
function* flow() {
  while (true) {
    let { token } = yield take('SUCCESS');
    const socket = yield call(connectSocket, token);
    const task = yield fork(handleIO, socket);
    let action = yield take('LOGOUT_REQUEST');
    yield cancel(task);
    socket.emit('logout');
  }
}

//---------export Sagas
export default function* rootSaga() {
  yield fork(flow);
  // yield fork(fetchEvents);
  yield fork(login);
  yield fork(signup);
}


