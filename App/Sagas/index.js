
/* eslint-disable */
import io from 'socket.io-client'
import { eventChannel } from 'redux-saga'
import { fork, take, call, put, cancel } from 'redux-saga/effects'
import req from 'superagent'
import { Actions as NavigationActions } from 'react-native-router-flux';


//actions triggered at the end async event
import {
  loginSuccess,
  loadEvents,
  updateRegion,
  updatePosition,
} from '../Actions'

//----------------- navigator action ---------------------------
//----------------------------------------------------------
export const getPositionFromNavigator = () => {
  return new Promise ((resolve) => {
     navigator.geolocation.getCurrentPosition (
      (position) => {
        console.log('getCurrentPosition in Saga');
        console.log(position);
        resolve({
          position,
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,            
          },
        }) 
      },
      (err) => {console.log('in Saga, getCurrentPosition failed')},
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    )
  })
}
function* getPosition() {
  yield take('GET_POSITION');
  console.log('Saga heard GET_POSITION');
  const {position, region} = yield call(getPositionFromNavigator);  
  yield put(updatePosition(position));
}
//----------------- REST request ---------------------------
//----------------------------------------------------------

//helper function for login POST 
export const loginPostRequest = (username, password) => {
  const url = 'http://127.0.0.1:8099';
  return req.post(`${url}/api/auth/login`)
    .send({ username, password });
};


//helper function for signup POST 
export const signupPostRequest = (username, password, userInfo) => {
  userInfo = userInfo || {firstName: 'John', lastName: 'Appleseed'}
  firstName = userInfo.firstName;
  lastName = userInfo.lastName;
  const url = 'http://127.0.0.1:8099';
  return req.post(`${url}/api/auth/signup`)
    .send({ username, password, firstName, lastName });
};

function* login() {
    const { username, password } = yield take('LOGIN_REQUEST')
    console.log('login attempt in saga-----------');
    const {position, region} = yield call(getPositionFromNavigator);     
    yield put(updatePosition(position));
    yield put(updateRegion(region));
    const res = yield call(loginPostRequest, username, password, position)
    console.log('login success----------------')
    const token = res.body.token;
    console.log(token);
    yield put(loginSuccess(username, token))
}

function* signup() {
    const { username, password, userInfo } = yield take('SIGNUP_REQUEST')
    const res = yield call(signupPostRequest, username, password, userInfo)
    yield put(loginSuccess( username, res.body.token))
}
// --------------------Socket Events-------------------------
// ----------------------------------------------------------

// Connect Redux client to socket
function connectSocket(token) {
  const socket = io.connect('http://127.0.0.1:8099/socket', { transports: ['websocket'] });

  return new Promise((resolve, reject) => {
  socket
    .emit('authenticate', { token })
    .on('authenticated', (socket) => {
      console.log('AUTHORIZED CLIENT');
      resolve(socket);
    })
    .on('unauthorized', (msg) => {
      console.log('unauthorized', JSON.stringify(msg.data));
      reject('unauthorized', JSON.stringify(msg.data));
      });
  });
}

function getNotifications(socket, token) {
  return new Promise((resolve, reject) => {
    socket.emit('getNotifications', (events) => {
      console.log('Saga: getNotifications');
      resolve(events);
    });
  });
}

function* fetchEvents(socket) {
  while (true) {
    const { token } = yield take('FETCH_EVENTS');
    const events = yield call(getNotifications, socket, token);
    yield put(loadEvents(events));
  }
}
// ---------Send event data to socket
function* reportEvent(socket) {
  while (true) {
    const { newEvent } = yield take('REPORT_EVENT');
    console.log('Saga intercept report event: ');
    console.log(newEvent);
    // active this line, once socket is up
    // socket.emit('reportEvent', newEvent);
  }
}

function* voteEvent(socket) {
  while (true) {
    const { event, vote } = yield take('VOTE_EVENT');
    console.log('Saga intercept vote event: ');
    console.log(event, vote);
    // active this line, once socket is up
    // socket.emit('reportEvent', newEvent);
  }
}

// ---------Combine sending and receiving data
function* handleIO(socket) {
  // yield fork(read, socket);
  yield fork(fetchEvents, socket);
  yield fork(reportEvent, socket);
  yield fork(voteEvent, socket);
}

// ---------Define flow of socket
function* flow() {
  while (true) {
    let { token } = yield take('SUCCESS');
    const socket = yield call(connectSocket, token);
    const events = yield call(getNotifications, socket, token);
    console.log('get events in flow-----------');
    console.log(events);
    yield put(loadEvents(events));
    console.log('finished loading events--------------');    
    NavigationActions.mapScreen();
    const task = yield fork(handleIO, socket);
    let action = yield take('LOGOUT_REQUEST');
    yield cancel(task);
    socket.emit('logout');
  }
}

// ---------Export Sagas
export default function* rootSaga() {
  yield fork(flow);
  yield fork(getPosition);
  yield fork(login);
  yield fork(signup);
}
