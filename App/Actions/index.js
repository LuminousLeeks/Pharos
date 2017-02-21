export const partialReport = newNotification => ({
  type: 'PARTIAL_REPORT',
  newNotification,
});

export const reportNotification = (newNotification, userId) => ({
  type: 'REPORT_EVENT',
  newNotification,
  userId,
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
export const addNewNotification = notification => ({
  type: 'ADD_NEW_NOTIFICATION',
  notification,
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
export const fetchUserInfo = userId => ({
  type: 'FETCH_USER_INFO',
  userId,
});
// export const updateUserInfo = (userId) => ({
//   type: 'UPDATE_USER_INFO',
//   userId,
//   // TODO: Implement update user data
// });
export const sendVoteToState = notifications => ({
  type: 'STATE_VOTE_EVENT',
  notifications,
});
export const sendVoteToServer = vote => ({
  type: 'SERVER_VOTE_EVENT',
  vote,
});

/* ------------- Types and Action Creators ------------- */
export const request = () => ({
  type: 'REQUEST',
});

export const loginSuccess = (userInfo, token, location) => {
  return {
    type: 'SUCCESS',
    userInfo,
    token,
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

export const categoriesRefresh = () => ({
  type: 'FETCH_CATEGORIES',
});

export const updateCategories = categories => ({
  type: 'SAVE_CATEGORIES',
  categories,
});
// export const TESTONLY = () => {
//   console.log('testonly action triggered~~~~~~~~~~~~');
//   return {
//     type: 'TESTONLY',
//   }

// }
