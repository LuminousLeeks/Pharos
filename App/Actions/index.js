export const reportEvent = newNotification => ({
  type: 'REPORT_EVENT',
  newNotification,
});

export const updateRegion = region => ({
  type: 'UPDATE_REGION',
  region,
});
export const getPosition = () => ({
  type: 'GET_POSITION',
});
export const updatePosition = position => ({
  type: 'UPDATE_POSITION',
  userLocation: {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  },
});
// !!! this is duplicate !!!
export const loadEvents = events => ({
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
export const fetchUserInfo = (username, token, firstName, lastName) => ({
  type: 'FETCH_USER_INFO',
  username: this.state.username,
  token,
  firstName,
  lastName,
  // userInterests, //TODO: decide on naming conventions
});
export const updateUserInfo = (username, token) => ({
  type: 'UPDATE_USER_INFO',
  username,
  token,
  // TODO: Update user data
});
export const sendVoteToState = events => ({
  type: 'STATE_VOTE_EVENT',
  events,
});
export const sendVoteToServer = vote => ({
  type: 'SERVER_VOTE_EVENT',
  vote,
});
export const fetchCategories = (username, token, categories = '') => ({
  type: 'FETCH_CATEGORIES',
  username,
  token,
  categories,
});
export const saveCategories = (username, token, categories) => ({
  type: 'SAVE_CATEGORIES',
  username,
  token,
  categories,
});
export const toggleCategory = (username, id) => ({
  type: 'TOGGLE_CATEGORY',
  id,
});
/* ------------- Types and Action Creators ------------- */
export const request = () => ({
  type: 'REQUEST',
});

export const loginSuccess = (username, token, userId) => {
  return {
    type: 'SUCCESS',
    username,
    token,
    userId
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
