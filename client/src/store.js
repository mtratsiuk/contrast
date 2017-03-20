import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import * as reducers from 'reducers'

const composeEnhancers = !__DEV__
  ? compose
  : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const history = createHistory()

const store = createStore(
  combineReducers({ ...reducers, router: routerReducer }),
  composeEnhancers(
    applyMiddleware(thunk, routerMiddleware(history))
  )
)

export default store
