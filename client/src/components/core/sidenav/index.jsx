import React from 'react'
import { MDCTemporaryDrawer } from '@material/drawer'

class Sidenav extends React.PureComponent {
  constructor (props) {
    super(props)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  componentDidMount () {
    this._mdcDrawer = new MDCTemporaryDrawer(this.element)

    // Hack for https://github.com/material-components/material-components-web/issues/225
    this._mdcDrawer.foundation_.adapter_.deregisterDrawerInteractionHandler(
      'click',
      this._mdcDrawer.foundation_.drawerClickHandler_
    )
    this._mdcDrawer.foundation_.adapter_.deregisterInteractionHandler(
      'click',
      this._mdcDrawer.foundation_.componentClickHandler_
    )
  }

  componentWillUnmount () {
    this._mdcDrawer.destroy()
  }

  open () {
    this._mdcDrawer.open = true
  }

  close () {
    this._mdcDrawer.open = false
  }

  render () {
    let { username, children } = this.props

    return (
      <div className='Sidenav'>
        <aside className='Sidenav__temporary mdc-temporary-drawer' ref={el => { this.element = el }} onClick={this.close}>
          <nav className='mdc-temporary-drawer__drawer' onClick={event => event.stopPropagation()}>
            <header className='mdc-temporary-drawer__header'>
              <div className='mdc-temporary-drawer__header-content mdc-theme--primary-bg mdc-theme--text-primary-on-primary'>
                {username}
              </div>
            </header>
            {children}
          </nav>
        </aside>

        <nav className='Sidenav__permanent mdc-permanent-drawer'>
          {children}
        </nav>
      </div>
    )
  }
}

export default Sidenav
