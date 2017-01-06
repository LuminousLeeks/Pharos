import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import RootContainer from './RootContainer'
import rootReducer from '../Redux'

// import createStore from '../Redux';
// import applyConfigSettings from '../Config';

// const loggerMiddleware = createLogger()

// const createStoreWithMiddleware = applyMiddleware(
//   thunkMiddleware,
//   loggerMiddleware
// )(createStore)
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
// const configureStore = function (initialState: Object = {}): Function {
//   return createStoreWithMiddleware(rootReducer, initialState)
// }

// Apply config overrides
// applyConfigSettings();
// create our store
// const store = configureStore()


/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  };
};


export default App;
