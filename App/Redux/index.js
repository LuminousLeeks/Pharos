import { combineReducers } from 'redux'
import Immutable from 'seamless-immutable'
// import { combineReducers } from 'redux';
// import Immutable from 'seamless-immutable';
import { exampleCategories } from './../../data/exampleData'; // TODO: Test data. Remove before production

const defaultState = {
  newEvent: {
    category: 'waitTime',
    description: 'Long wait time',
    event: 'evantA'
  },
  events: [
    {
      category: 'waitTime',
      description: 'Long wait time',
      event: 'evantA',
      story: 'Line for Pokemon ground is too long.',
      vote: 7,
      latitude: 37.784235,
      longitude: -122.410597,
    },
    {
      category: 'waitTime',
      description: 'Long wait time',
      event: 'evantB',
      story: 'Line for Logo land is too long.',
      vote: 2,
      latitude: 37.785566,
      longitude: -122.407282,
    },
    {
      category: 'hazard',
      description: 'Hazard events',
      event: 'eventK',
      story: 'Pikachu is on fire.',
      vote: 10,
      latitude: 37.784311,
      longitude: -122.404460,
    },
    {
      category: 'commute',
      description: 'Commute related events',
      event: 'eventN',
      story: 'Pikachu blocked I-880.',
      vote: 6,
      latitude: 37.784345,
      longitude: -122.407679,
    },
  ],
  categories: exampleCategories,
};

const initialState = {
  fething: false,
  newNotification: defaultState.newEvent,
  userInterests: {},
  userLocation: {},
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 100,
    longitudeDelta: 100,
  },
  userName: '',
  firstName: '',
  lastName: '',
  events: defaultState.events,
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
        newEvent: action.newEvent,
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
        events: action.events,
        // token: action.token
      }
    case 'STATE_VOTE_EVENT':
      return {
        ...state,
        events: action.events,
      }
    case 'FETCH_USER_INFO':
      return {
        ...state,
        username: action.username, // Uncommented to build user profile
        // userInterests: action.userInterests, // TODO: Decide on naming conventions
        token: action.token,
        firstName: action.firstName,
        lastName: action.lastName,
      };
    case 'UPDATE_USER_INFO':
      return {
        ...state,
        username: action.username,
        token: action.token,
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
