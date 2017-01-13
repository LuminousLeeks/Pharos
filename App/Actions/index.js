
export const reportEvent = newEvent => ({
  type: 'REPORT_EVENT',
  newEvent,
});

export const updateRegion = region => ({
  type: 'UPDATE_REGION',
  region,
});

export const updatePosition = position => ({
  type: 'UPDATE_POSITION',
  userLocation: {
    region: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    currentLocation: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    },
  },
});
// !!! this is duplicate !!!
export const loadEvents = (events) => ({
  type: 'UPDATE_EVENTS',
  events,
});

export const saveWatchID = watchID => ({
  type: 'SAVE_WATCHID',
  watchID,
});
export const updateEvent = events => ({
  type: 'UPDATE_EVENTS',
  events,
});
export const fetchEvents = (token, userLocation) => ({
  type: 'FETCH_EVENTS',
  token,
  userLocation,
});
const getUserInfo = (userName = '', userInterests = [], token = {}) => ({
  type: 'GET_USER_INFO',
  userName,
  userInterests,
  token,
});

/* ------------- Types and Action Creators ------------- */
export const request = () => ({
  type: 'REQUEST',
});

export const loginSuccess = (username, token) => {
  console.log(token, 'sucess and token!');
  return {
    type: 'SUCCESS',
    username,
    token,
  };
};

export const authFail = error => ({
  type: 'AUTH_FAIL',
  error,
});

export const loginRequest = (username, password) => ({
  type: 'LOGIN_REQUEST',
  username,
  password,
});

export const registerRequest = (username, password) => ({
  type: 'SIGNUP_REQUEST',
  username,
  password,
});

