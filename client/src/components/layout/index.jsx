import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
import { NavLink } from 'react-router-dom'

import appRoutes from 'components/app-routes'
import Sidenav from 'components/core/sidenav'

const Layout = ({
  location,
  title,
  username
}) => {
  let sidenav

  return (
    <div className='Layout mdc-typography'>

      <header className='Layout__header mdc-toolbar mdc-toolbar--fixed'>
        <section className='Layout-header__menu-toggler mdc-toolbar__section mdc-toolbar__section--align-start'>
          <button className='material-icons' onClick={() => sidenav.open()}>menu</button>
        </section>
        <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
          <span className='mdc-toolbar__title'>{title}</span>
        </section>
      </header>

      <div className='Layout__sidenav mdc-toolbar-fixed-adjust'>
        <Sidenav ref={el => { sidenav = el }} username={username}>
          <nav className='mdc-list'>
            {
              _.map(route =>
                <NavLink
                  key={route.title}
                  to={route.path}
                  activeClassName='mdc-permanent-drawer--selected mdc-temporary-drawer--selected'
                  className='mdc-list-item'
                >
                  <i
                    className='material-icons mdc-list-item__start-detail' aria-hidden='true'>{route.icon}</i>
                  {route.title}
                </NavLink>
              )(appRoutes)
            }
          </nav>
        </Sidenav>
      </div>

      <main className='Layout__content mdc-toolbar-fixed-adjust'>
        <Switch>
          {
            _.pipe(
              _.map(route => <Route key={route.path} {...route} />),
              _.concat(_, <Redirect key='redirect' from='/' to={appRoutes[0].path} />)
            )(appRoutes)
          }
        </Switch>
      </main>

    </div>
  )
}

export default connect(
  state => ({
    location: state.router.location,
    username: state.user.username,
    title: (_.find(
      route => _.startsWith(route.path, state.router.location.pathname),
      appRoutes
    ) || {}).title || 'Contrast'
  })
)(Layout)
