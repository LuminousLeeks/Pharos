// import { combineReducers } from 'redux';
// import Immutable from 'seamless-immutable';
// import { exampleCategories } from './../../data/exampleData'; // TODO: Test data. Remove before production

const defaultState = {
  newNotification: {
    category: 'waitTime',
    description: 'Long wait time',
    title: 'evantA',
    location: { latitude: 37.78500, longitude: -122.41059 },
    categoryId: 3,
  },
  notifications: [],
  categories: {},
};

const initialState = {
  categories: defaultState.categories,
  fetching: false,
  newNotification: defaultState.newNotification,
  userLocation: {},
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 100,
    longitudeDelta: 100,
  },
  username: '',
  firstName: '',
  lastName: '',
  notifications: defaultState.notifications,
  token: '',
  watchID: '',
  error: null,
  userId: '',
  subscriptions: [],
  radius: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'REPORT_EVENT':
    //   return {
    //     ...state,
    //     newNotification: action.newNotification,
    //   };
    case 'ADD_NEW_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.concat(action.notification),
      };
    case 'PARTIAL_REPORT':
      return {
        ...state,
        newNotification: action.newNotification,
      };
    case 'UPDATE_POSITION':
      return {
        ...state,
        userLocation: action.userLocation,
      };
    case 'UPDATE_REGION':
      return {
        ...state,
        region: action.region,
      };
    case 'SAVE_WATCHID':
      return {
        ...state,
        watchID: action.watchID,
      };
    case 'UPDATE_EVENTS':
      return {
        ...state,
        notifications: action.notifications,
        // token: action.token
      };
    case 'STATE_VOTE_EVENT':
      return {
        ...state,
        notifications: action.notifications,
      };
    // case 'UPDATE_USER_INFO':
    //   return {
    //     ...state,
    //     userId: action.userId, //TODO: Save updated user info
    //   };
    // case 'FETCH_CATEGORIES' :
    //   return {
    //     ...state,
    //     username: action.username,
    //     token: action.token,
    //     categories: action.categories,
    //   };
    case 'SAVE_CATEGORIES':
      return {
        ...state,
        categories: action.categories,
      };
    case 'START_FETCHING':
      return {
        ...state,
        fetching: true,
        // token: action.token,
      };
    case 'STOP_FETCHING':
      return {
        ...state,
        fetching: false,
      };

    case 'REQUEST':
      return { ...state, token: action.token };
    case 'SUCCESS':
      return {
        ...state,
        username: action.userInfo.username,
        token: action.token,
        userId: action.userInfo.userId,
        firstName: action.userInfo.firstName,
        lastName: action.userInfo.lastName,
        email: action.userInfo.email,
        radius: action.userInfo.radius,
      };
    case 'AUTH_FAIL':
      return { ...state, error: action.error };
    case 'LOGOUT':
      return state;
    case 'LOGGEDIN':
      return { ...state, fetching: false };
    default:
      return state;
  }
};

export default rootReducer;
