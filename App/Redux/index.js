// import { combineReducers } from 'redux';
// import Immutable from 'seamless-immutable';
import { exampleCategories } from './../../data/exampleData'; // TODO: Test data. Remove before production

const defaultState = {
  newNotification: {
    category: 'waitTime',
    description: 'Long wait time',
    title: 'evantA',
    location: { latitude: 37.78500, longitude: -122.41059 },
    categoryId: 3,
  },
  notifications: [],
  categories: exampleCategories,
};

const initialState = {
  fething: false,
  newNotification: defaultState.newNotification,
  userInterests: {},
  userLocation: {},
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 100,
    longitudeDelta: 100,
  },
  notifications: defaultState.notifications,
  userInfo: {
    firstName: '',
    lastName: '',
    email: '',
  },
  username: '',
  token: '',
  watchID: '',
  error: null,
  userId: '',
  selectedCategories: {},
  categories: defaultState.categories,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REPORT_EVENT':
      return {
        ...state,
        newNotification: action.newNotification,
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
    case 'FETCH_USER_INFO':
      return {
        ...state,
        userId: action.userId,
        username: action.username, // Uncommented to build user profile
        // userInterests: action.userInterests, // TODO: Decide on naming conventions
        userInfo: action.userInfo,
      };
    case 'UPDATE_USER_INFO':
      return {
        ...state,
        userId: action.userId,
      };
    case 'SAVE_USER_INFO':
      console.log('in reducer -----------------');
      console.log(action.userInfo);
      return {
        ...state,
        userInfo: action.userInfo,
      };

    case 'FETCH_CATEGORIES' :
      return {
        ...state,
        username: action.username,
        token: action.token,
        categories: action.categories,
      };
    case 'SAVE_CATEGORIES':
      return {
        ...state,
        username: action.username,
        token: action.token,
        saveCategories: action.saveCategories, // TODO: Make sure naming convention matches Database
      };
    case 'TOGGLE_CATEGORY':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        selected: !state.selected,
      });
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
      return { ...state, username: action.username, token: action.token, userId: action.userId };
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
