import { connect } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router'

import './root.scss'
import Layout from 'components/pages'
import Login from 'components/auth/login'
import Signup from 'components/auth/signup'

const Root = ({ isLoggedIn, location }) => {
  return (
    <Switch location={location}>
      {isLoggedIn ? <Route path='/' component={Layout} /> : <Route path='/login' component={Login} />}
      <Route path='/signup' component={Signup} />
      <Redirect to={{ pathname: '/login', state: { from: location } }} />
    </Switch>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user,
  location: state.router.location // Let Root rerender on location change
})

export default connect(mapStateToProps)(Root)
