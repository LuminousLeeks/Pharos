import { combineReducers } from 'redux'

let initalState = {
  fething: false,
  newEvent: {},
  userInterests: {},
  userLocation: {},
  userName: '',
  toke: {},
  events:[]

}

const mapAction = (state = initalState, action) => {
  switch (action.type) {
  case 'REPORT_EVENT':
    return {
      ...state,
      newEvent: action.newEvent
    };
  case 'LOAD_EVENTS':
    return {
      ...state,
      // action.events
    };
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
      fetching: true
    };
  case 'STOP_FETCHING':
    return {
      ...state,
      fetching: false      
    }
  default:
    return state
  }
}

const rootReducer = combineReducers({
  mapAction
})

export default rootReducer
