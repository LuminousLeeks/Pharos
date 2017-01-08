import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';

const initalState = {
  fething: false,
  newEvent: {
    category: 'default category',
    description: 'default description',
    event: 'default'
  },
  userInterests: {},
  userLocation: {},
  userName: '',
  toke: {},
  events:[]

}

const mapAction = (state = [], action) => {
  switch (action.type) {
  case 'REPORT_EVENT':
    return {
      ...state,
      newEvent: action.newEvent
    };
  case 'LOAD_EVENTS':
    return action.events
  case 'UPDATE_EVENTS':
    return {
      ...state,
      // action.events
    };
  case 'GET_USER_INFO':
    return {
      ...state,
      // action.userName,
      // action.userInterests
      // action.token
    };
  case 'START_FETCHING':
    return {
      ...state,
      fetching: true,
    };
  case 'STOP_FETCHING':
    return {
      ...state,
      fetching: false,
    }
  default:
    return state,
  }
}

//WHY IS YOURS THE DEFAULT ???? 
export default mapAction;
// const rootReducer = co mbineReducers({
//   mapAction
// })


const INITIAL_STATE = Immutable({
  username: null,
  error: null,
  fetching: false
});

const authenticate = (state = INITIAL_STATE,  action) => {
  switch (action.type) {
    case 'REQUEST':
      return { ...state, fetching: true };
    case 'SUCCESS':
      return { ...state, fetching: false, username: action.username };
    case 'AUTH_FAIL':
      return { ...state, fetching: false, error: action.error };
    case 'LOGOUT':
      return state;
    default:
      return state;
  }
};


// const authenticate = (state = { isFetching: false,
//   message: '' }, action) => {
//   switch (action.type) {
//     case 'SIGNUP':
//       return state;
//     case 'SIGNIN':
//       return state;
//     case 'LOGOUT':
//       return state;
//     default:
//       return state;
//   }
// };

//Bing disabled the one below... Why, I don't know why.
const rootReducer = combineReducers({
  mapAction,
  authenticate,
});
//Below was active in my case... so we have to make that up.
// export default rootReducer;

