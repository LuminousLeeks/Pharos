// import { combineReducers } from 'redux';
// import Immutable from 'seamless-immutable';

const initialState = {
  fething: false,
  newEvent: {
    category: 'default category',
    description: 'default description',
    event: 'default',
  },
  userInterests: {},
  userLocation: {},
  userName: '',
  token: '',
  events: [],
  error: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REPORT_EVENT':
      return {
        ...state,
        newEvent: action.newEvent,
      };
    case 'LOAD_EVENTS':
      return action.events;
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
    case 'REQUEST':
      return { ...state, fetching: true };
    case 'SUCCESS':
      return { ...state, fetching: false, userName: action.username, token: action.token };
    case 'AUTH_FAIL':
      return { ...state, fetching: false, error: action.error };
    case 'LOGOUT':
      return state;
    default:
      return state;
  }
};

// const authenticate = (state = initialState, action) => {
//   switch (action.type) {
//     case 'REQUEST':
//       return { ...state, fetching: true };
//     case 'SUCCESS':
//       return { ...state, fetching: false, userName: action.username, token: action.token };
//     case 'AUTH_FAIL':
//       return { ...state, fetching: false, error: action.error };
//     case 'LOGOUT':
//       return state;
//     default:
//       return state;
//   }
// };

// const rootReducer = combineReducers({
//   mapAction,
//   authenticate,
// });

export default rootReducer;

