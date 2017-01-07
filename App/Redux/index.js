import { combineReducers } from 'redux'

const map = (state = {
  isFetching: false,
  message: ''
}, action) => {
  switch (action.type) {
  case 'A':
    return Object.assign({}, state, {
      isFetching: true
    });
  case 'B':
    return Object.assign({}, state, {
      isFetching: false,
      message: action.data.message
    });
  default:
    return state
  }
}

const rootReducer = combineReducers({
  map
})

export default rootReducer
