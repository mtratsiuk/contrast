import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router'

import './root.scss'
import Layout from 'components/layout'
import Auth from 'components/auth'

const Root = ({ isLoggedIn, location }) =>
  <main className='Root mdc-typography'>
    <Switch>
      <Route path='/login' component={Auth} />
      <Route path='/signup' component={Auth} />
      {!isLoggedIn
        ? <Redirect to={{ pathname: '/login', state: { from: location } }} />
        : <Route path='/' component={Layout} />
      }
    </Switch>
  </main>

const mapStateToProps = state => ({
  isLoggedIn: !!state.user,
  location: state.router.location // Let Root rerender on location change
})

export default connect(mapStateToProps)(Root)
