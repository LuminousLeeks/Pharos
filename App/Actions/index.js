export const partialReport = newNotification => ({
  type: 'PARTIAL_REPORT',
  newNotification,
});

export const reportNotification = newNotification => ({

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
export const loadNotifications = notifications => ({
  type: 'UPDATE_EVENTS',
  notifications,
});
export const saveWatchID = watchID => ({
  type: 'SAVE_WATCHID',
  watchID,
});
export const updateNotification = notifications => ({
  type: 'UPDATE_EVENTS',
  notifications,
});
export const fetchNotifications = (token, location, userId) => ({
  type: 'FETCH_EVENTS',
  token,
  location,
  userId,
});
export const loadUserInfo = userId => ({
  type: 'LOAD_USER_INFO',
  userId,
});

// export const fetchUserInfo = userId => ({
//   type: 'FETCH_USER_INFO',
//   userId,
//   // userInterests, //TODO: decide on naming conventions
// });
// SAVE USER FUNCTION
export const saveUserInfo = (userId, userInfo) => ({
  type: 'SAVE_USER_INFO',
  userId,
  userInfo,
});

// UPDATE USER FUNCTION
export const updateUserInfo = (userId, userInfo) => ({
  type: 'UPDATE_USER_INFO',
  userId,
  userInfo,
});
export const sendVoteToState = notifications => ({
  type: 'STATE_VOTE_EVENT',
  notifications,
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

export const loginSuccess = (username, token, userId, location) => {
  return {
    type: 'SUCCESS',
    username,
    token,
    userId,
    location,
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

export const registerRequest = (username, password, userInfo) => ({
  type: 'SIGNUP_REQUEST',
  username,
  password,
  userInfo,
});

// export const TESTONLY = () => {
//   console.log('testonly action triggered~~~~~~~~~~~~');
//   return {
//     type: 'TESTONLY',
//   }

// }
