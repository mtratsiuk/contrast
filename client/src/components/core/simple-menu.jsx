import React from 'react'
import PropTypes from 'prop-types'
import { MDCSimpleMenu } from '@material/menu'

import Button from 'components/core/button'

class SimpleMenu extends React.PureComponent {
  constructor (props) {
    super(props)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount () {
    this._mdcMenu = new MDCSimpleMenu(this.element)
    this.element.addEventListener('MDCSimpleMenu:selected', this.handleSelect)
  }

  componentWillUnmount () {
    this._mdcMenu.destroy()
    this.element.removeEventListener('MDCSimpleMenu:selected', this.handleSelect)
  }

  handleSelect ({ detail: { index } }) {
    let action = this.props.options[index].action
    action && action()
  }

  open () {
    this._mdcMenu.open = true
  }

  close () {
    this._mdcMenu.open = false
  }

  render () {
    let { options, children } = this.props

    return (
      <div className='mdc-menu-anchor'>
        <Button
          raised={false}
          className='mdc-theme--text-primary-on-primary'
          onClick={this.open}
          style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}
        >
          {children}
        </Button>
        <div ref={el => { this.element = el }} className='mdc-simple-menu' tabIndex='-1'>
          <ul className='mdc-simple-menu__items mdc-list' role='menu' aria-hidden='true'>
            {
              _.map(({ title }) =>
                <li key={title} className='mdc-list-item' role='menuitem' tabIndex='0'>
                  {title}
                </li>
              )(options)
            }
          </ul>
        </div>
      </div>
    )
  }
}

SimpleMenu.defaultProps = {
  children: <i className='material-icons'>more_vert</i>
}

SimpleMenu.propTypes = {
  children: PropTypes.element,
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    action: PropTypes.func
  })).isRequired
}

export default SimpleMenu
