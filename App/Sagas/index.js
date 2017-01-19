
/* eslint-disable */
import io from 'socket.io-client'
import { eventChannel } from 'redux-saga'
import { fork, take, call, put, cancel } from 'redux-saga/effects'
import req from 'superagent'
import { Actions as NavigationActions } from 'react-native-router-flux';

import {
  loginSuccess,
  loadNotifications,
  updateRegion,
  updatePosition,
  updateUserInfo,
  saveUserInfo,
} from '../Actions'

//----------------- navigator action ---------------------------
//----------------------------------------------------------
export const getPositionFromNavigator = () => {
  return new Promise ((resolve) => {
     navigator.geolocation.getCurrentPosition (
      (position) => {
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
  const {position, region} = yield call(getPositionFromNavigator);
  yield put(updatePosition(position));
}
//----------------- REST request ---------------------------
//----------------------------------------------------------

//helper function for login POST
export const loginPostRequest = (username, password) => {
  console.log('in Saga, triggered loginPostRequest');
  const url = 'http://127.0.0.1:8099';
  return req.post(`${url}/api/auth/login`)
    .send({ username, password });
  // return new Promise((resolve) => {
  //   req.post(`${url}/api/auth/login`)
  //   .send({ username, password })
  //   .end(function(err, res){
  //     resolve({res, err});
  //   })
  // })
};


//helper function for signup POST
export const signupPostRequest = (username, password, userInfo) => {
  userInfo = userInfo || {firstName: 'John', lastName: 'Appleseed'}
  console.log('userInfo', userInfo);
  const firstName = userInfo.firstName;
  const lastName = userInfo.lastName;
  const email = userInfo.email;
  const url = 'http://127.0.0.1:8099';
  return req.post(`${url}/api/auth/signup`)
    .send({ username, password, firstName, lastName, email });
};

function* login() {
    const { username, password } = yield take('LOGIN_REQUEST')
    const { position, region } = yield call(getPositionFromNavigator);
    yield put(updatePosition(position));
    yield put(updateRegion(region));
    const res = yield call(loginPostRequest, username, password, position);
    if (! res.body.err) {
      const token = res.body.token;
      const userId = res.body.userId;
      console.log('position in Sage *login --------------');
      console.log(position);
      yield put(loginSuccess(username, token, userId, position.coords));
    } else {
      console.log('login error, response is-----');
      console.log(res.body.err);
      yield fork(login);
    }
}

function* signup() {
    const { username, password, userInfo } = yield take('SIGNUP_REQUEST')
    const {position, region} = yield call(getPositionFromNavigator);
    yield put(updatePosition(position));
    yield put(updateRegion(region));
    const res = yield call(signupPostRequest, username, password, userInfo);
    const token = res.body.token;
    const userId = res.body.userId;
    const location = {
      latitude: region.latitude,
      longitude: region.longitude,
    };
    yield put(loginSuccess( username, token, userId, location));
}
// --------------------Socket Evnets-------------------------
// ----------------------------------------------------------

// Connect Redux client to socket
function connectSocket(token, userId) {
  const socket = io.connect('http://127.0.0.1:8099/socket', {
    transports: ['websocket'],
  });

  return new Promise((resolve, reject) => {
    socket
      .emit('authenticate', { token })
      .on('authenticated', () => {
        socket.emit('text', 'Client: hello');
        socket.on('text', (text) => {
          console.log(text);
        });
        socket.emit('createRoom', userId);

        resolve(socket);
      })
      .on('unauthorized', (msg) => {
        console.log('unauthorized', JSON.stringify(msg.data));
        reject(JSON.stringify(msg.data));
        });
  });
}

function getNotifications(socket, userId, location) {
  return new Promise((resolve, reject) => {
    socket.emit('getNotifications', userId, location, (notifications) => {
      resolve(notifications);
    });
  });
}

function* fetchNotifications(socket) {
  while (true) {
    const { token, userId, location } = yield take('FETCH_EVENTS');
    const notifications = yield call(getNotifications, socket, userId, location);
    yield put(loadNotifications(notifications));
  }
}


function* fetchUserInfo(socket) {
  while (true) {
    const { userId } = yield take('LOAD_USER_INFO');
    const user = yield call(getUserInfo, socket, userId);
    yield put(saveUserInfo(userId, user));
  }
}
function getUserInfo(socket, userId) {
  return new Promise((resolve, reject) => {
    socket.emit('getUserInDb', userId, (userInfo) => {
      resolve(userInfo);
    })
  })
}

function updateUser(socket, userId) {
  return new Promise((resolve, reject) => {
    socket.emit('updateUser', userId, (userInfo) => {
      // console.log('socket in saga -----------------');
      // console.log('changing', userInfo);
      resolve(userInfo);
    })
  })
}

function* updateUserData(socket) {
  while (true) {
    const { userId } = yield take('UPDATE_USER_INFO');
    const userInfo = yield call(updateUser, socket, userId);
    console.log(userInfo, '******************************')
    yield put(saveUserInfo(userInfo));
  }
}

// ---------Send event data to socket
function* reportNotification(socket) {
  while (true) {
    const { newNotification } = yield take('REPORT_EVENT');
     socket.emit('reportNotification', newNotification);
  }
}

function sendVote(socket, vote) {
  socket.emit('sendVote', vote);
}

function* voteNotification(socket) {
  while (true) {
    const { vote } = yield take('SERVER_VOTE_EVENT');
    // console.log("Vote notification inside saga", vote)
    yield call(sendVote, socket, vote);
    // socket.on('updateNotification', (updatedNotification) => {
    //   console.log(updatedNotification);
    //   console.log('~~~~heard from socket~~~');
    //   // yield put(TESTONLY());
    //   // emit(newMessage({ message }));
    // });
  }
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('text', (text) => {
      console.log('this is test', text);
    });
    socket.on('pushNotification', (newNotification) => {
      console.log('heard from server socket, newNotification');
      console.log(newNotification)
      // emit(receiveNewNotification(newNotification));
    });
    socket.on('updateNotification', (updatedNotification) => {
      console.log(updatedNotification);
      console.log('~~~~heard from socket~~~');
      emit(TESTONLY());
      // emit(newMessage({ message }));
    });
    // socket.on('disconnect', e => {
    //   // TODO: handle
    // });
    return () => {};
  });
}

function* read(socket) {
  // socket.on('updateNotification', (updatedNotification) => {
  //   console.log(updatedNotification);
  //   console.log('~~~~heard from socket~~~');
  //   // yield put(TESTONLY());
  //   // emit(newMessage({ message }));
  // });
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}
// ---------Combine sending and receiving data
function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(fetchNotifications, socket);
  yield fork(reportNotification, socket);
  yield fork(voteNotification, socket);
  yield fork(fetchUserInfo, socket);
  // yield fork(updateUserData, socket);
}

// ---------Define flow of socket
function* flow() {
  while (true) {
    let { token, userId, location } = yield take('SUCCESS');
    const socket = yield call(connectSocket, token, userId);
    const notifications = yield call(getNotifications, socket, userId, location);
    yield put(loadNotifications(notifications));
    const userProfile = yield call(fetchUserInfo, socket, userId);
    console.log(userProfile, 'userInfo')
    yield put(saveUserInfo(userProfile));
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
