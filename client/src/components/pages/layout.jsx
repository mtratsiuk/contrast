import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
import { NavLink } from 'react-router-dom'

import { logout } from 'actions/user'
import appRoutes from 'components/app-routes'
import Sidenav from 'components/core/sidenav'
import SimpleMenu from 'components/core/simple-menu'
import withTranslations from 'components/core/i18n'

const Layout = ({
  location,
  title,
  username,
  dispatch,
  t
}) => {
  let sidenav

  return (
    <div className='Layout'>

      <header className='Layout__header mdc-toolbar mdc-toolbar--fixed'>
        <div className='mdc-toolbar__row'>
          <section className='Layout-header__menu-toggler mdc-toolbar__section mdc-toolbar__section--align-start'>
            <button className='material-icons' onClick={() => sidenav.open()}>menu</button>
          </section>
          <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
            <span className='mdc-toolbar__title'>{t(title)}</span>
          </section>
          <section className='mdc-toolbar__section mdc-toolbar__section--align-end'>
            <SimpleMenu
              options={[
                { title: t('logout'), action: () => dispatch(logout()) }
              ]}
              style={{ alignSelf: 'center' }}
            />
          </section>
        </div>
      </header>

      <div className='Layout__sidenav mdc-toolbar-fixed-adjust'>
        <Sidenav ref={el => { sidenav = el }} header={username}>
          <nav className='mdc-list'>
            {
              _.map(route =>
                <NavLink
                  key={route.title}
                  to={route.path}
                  activeClassName='mdc-permanent-drawer--selected mdc-temporary-drawer--selected'
                  className='mdc-list-item'
                  onClick={() => { sidenav.close() }}
                >
                  <i
                    className='material-icons mdc-list-item__start-detail' aria-hidden='true'>{route.icon}</i>
                  {t(route.title)}
                </NavLink>
              )(appRoutes)
            }
          </nav>
          <div className='Layout__build-version'>Build: {__VERSION__}</div>
        </Sidenav>
      </div>

      <main className='Layout__content mdc-toolbar-fixed-adjust'>
        <Switch location={location}>
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
    username: _.get('user.name', state),
    title: (_.find(
      route => _.startsWith(route.path, state.router.location.pathname),
      appRoutes
    ) || {}).title || 'Contrast'
  })
)(withTranslations(Layout))
