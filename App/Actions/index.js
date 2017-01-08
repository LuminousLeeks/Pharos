
import req from 'superagent';

export const reportEvent = (newEvent) => {
  //do something here if needed
  return {
    type: 'REPORT_EVENT',
    newEvent
  }
}

export const loadEvents = (events) => {
  return {
    type: 'LOAD_EVENTS',
    events
  }
}

export const updateEvent = (events) => {
  return {
    type: 'UPDATE_EVENTS',
    events
  }
}

const getUserInfo = (userName = '', userInterests = [], token = {}) => {
  return {
    type: 'GET_USER_INFO',
    userName,
    userInterests,
    token
  }
}

const startFetching = () => {
  return{
    type: 'START_FETCHING'
  }
}
const stopFetching = () => {
  return{
    type: 'STOP_FETCHING'
  }
}

const getEvents = (userInterests) => {

}
/* ------------- Types and Action Creators ------------- */
export const request = () => ({
  type: 'REQUEST',
});

export const success = username => ({
  type: 'SUCCESS',
  username,
});

export const authFail = error => ({
  type: 'AUTH_FAIL',
  error,
});

export const loginRequest = (username, password) => {
  return (dispatch) => {
    dispatch(request);
    const url = 'http://127.0.0.1:3000';
    return req.post(url.concat('/login'))
      .send({ username, password })
      .end((err, res) => {
        if (err) { throw err; }
         // change state to success / failure
        console.log(res);
        const data = JSON.parse(res.text);
        if (data.success) {
          return dispatch(success(username));
        }
        const error = data.error;
        return dispatch(authFail(error));
      });
  };
};

// REFACTOR: Below code is almost DUPLICATE.
// Finalize the signin / signup endpoints then refactor

export const registerRequest = (username, password) => {
  return (dispatch) => {
    dispatch(request);
    const url = 'http://127.0.0.1:3000';
    return req.post(url.concat('/signup'))
      .send({ username, password })
      .end((err, res) => {
        if (err) { throw err; }
         // change state to success / failure
        console.log(res);
        const data = JSON.parse(res.text);
        if (data.success) {
          return dispatch(success(username));
        }
        const error = data.error;
        return dispatch(authFail(error));
      });
  };
};
