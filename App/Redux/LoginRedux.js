// @flow
import req from 'superagent';
// import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const request = () => {
  return {
    type: 'REQUEST',
  };
};

const success = (username) => {
  return {
    type: 'SUCCESS',
    username,
  }
};

const authFail = (error) => {
  return  {
    type: 'AUTH_FAIL',
    error,
};

const loginRequest = (username, password) => {
  return (dispatch) => {
    dispatch(request);
    return req.post(url + '/login')
      .send({username, password})  
      .end((err, res) => {
        if(err) { throw err; }
           //change state to success / failure
          console.log(res);
          let data = JSON.parse(res.text);
          if(data.success) {
           return dispatch(success(state, { username }));
          } else {
           let error = data.error;
           return failure(state, { error });
          }
      });
  }
};

// export default 



//Creators.loginRequest('steve', 'secret') // { type: 'LOGIN_REQUEST', username: 'steve', password: 'secret' }
// The keys of the object will become keys of the Creators. 
// They will also become the keys of the Types after being converted to SCREAMING_SNAKE_CASE.

/* ------------- Initial State ------------- */

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

// export const reducer = createReducer(INITIAL_STATE, {
//   [Types.LOGIN_REQUEST]: signinRequest,
//   [Types.LOGIN_SUCCESS]: success,
//   [Types.LOGIN_FAILURE]: failure,
//   [Types.LOGOUT]: logout
// })

/* ------------- Selectors ------------- */

// Is the current user logged in?
// export const isLoggedIn = (loginState: Object) => loginState.username !== null
