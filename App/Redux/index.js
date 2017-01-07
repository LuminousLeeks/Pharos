import { combineReducers } from 'redux'

const map = (state = {
  isFetching: false,
  message: ''
}, action) => {
  // switch (action.type) {
  // // case types.REQUEST_DATA:
  // //   return Object.assign({}, state, {
  // //     isFetching: true
  // //   });
  // // case types.RECEIVE_DATA:
  // //   return Object.assign({}, state, {
  // //     isFetching: false,
  // //     message: action.data.message
  // //   });
  // default:
  //   return state
  // }
}

const rootReducer = combineReducers({
  map
})

export default rootReducer
