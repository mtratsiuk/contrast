import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import 'utils/lodash'

import store, { history } from './store'
import Root from 'components/root'

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Root />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

import { __SEED__ } from 'utils/seed'
window.__SEED__ = __SEED__
