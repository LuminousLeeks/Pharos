import { combineReducers } from 'redux'
import Immutable from 'seamless-immutable'

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
      longitude: -122.410597

    },
    {
      category: 'waitTime',
      description: 'Long wait time',
      event: 'evantB',
      story: 'Line for Logo land is too long.',
      vote: 2,
      latitude: 37.785566,
      longitude: -122.407282
    },
    {
      category: 'hazard',
      description: 'Hazard events',
      event: 'eventK',
      story: 'Pikachu is on fire.',
      vote: 10,
      latitude: 37.784311,
      longitude: -122.404460
    },
    {
      category: 'commute',
      description: 'Commute related events',
      event: 'eventN',
      story: 'Pikachu blocked I-880.',
      vote: 6,
      latitude: 37.784345,
      longitude: -122.407679
    },

  ]
}

const initialState = {
  fething: false,
  newEvent: defaultState.newEvent,
  userInterests: {},
  userLocation: {},
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 100,
    longitudeDelta: 100,
  },
  userName: '',
  events: defaultState.events,
  token: '',
  watchID: '',
  error: null
}

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
      }
    case 'UPDATE_REGION':
      return {
        ...state,
        region: action.region,
      }
    case 'SAVE_WATCHID':
      return {
        ...state,
        watchID: action.watchID,
      }
    case 'UPDATE_EVENTS':
      return {
        ...state,
        events: action.events,
        token: action.token,
      };
    case 'GET_USER_INFO':
      return {
        ...state,
        // action.userName,
        // action.userInterests
        // action.token
      };
    case 'UPDATE_CATEGORIES' :
      return {
        ...state,
        username: action.username,
        token: action.token,
        categories: action.categories,
      };
    case 'START_FETCHING':
      return {
        ...state,
        fetching: true,
        token: action.token,
      };
    case 'STOP_FETCHING':
      return {
        ...state,
        fetching: false,
      };

    case 'REQUEST':
      return { ...state, fetching: true, token: action.token };
    case 'SUCCESS':
      return { ...state, fetching: false, userName: action.username,token: action.token };
    case 'AUTH_FAIL':
      return { ...state, fetching: false, error: action.error };
    case 'LOGOUT':
      return state;
    default:
      return state;
  }
};

//Bing disabled the one below... Why, I don't know why.
// const rootReducer = combineReducers({
//   mapAction,
//   authenticate,
// });

//Below was active in my case... so we have to make that up.
// export default rootReducer;

export default rootReducer
