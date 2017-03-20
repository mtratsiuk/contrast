import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'

import appRoutes from './app-routes'

const Layout = ({
  location
}) => {
  return (
    <div>
      <div>App layout</div>
      <hr />
      <Switch>
        {
          _.pipe(
            _.map(route => <Route key={route.path} {...route} />),
            _.concat(_, <Redirect key='redirect' from='/' to={appRoutes[0].path} />)
          )(appRoutes)
        }
      </Switch>
    </div>
  )
}

export default connect(
  state => ({
    location: state.router.location
  })
)(Layout)
