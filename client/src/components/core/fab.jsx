import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { MDCRipple } from '@material/ripple'

class Fab extends React.PureComponent {
  componentDidMount () {
    this._mdcRipple = new MDCRipple(this.element)
  }

  componentWillUnmount () {
    this._mdcRipple.destroy()
  }

  render () {
    let { icon, disabled, fixed, className } = this.props

    let fabClassname = classnames('Fab', 'mdc-fab', 'material-icons', className)
    let fabStyles = fixed && {
      position: 'fixed',
      right: '1rem',
      bottom: '1rem'
    }

    return (
      <button
        ref={el => { this.element = el }}
        style={fabStyles}
        className={fabClassname}
        aria-label={icon}
        disabled={disabled}
      >
        <span className='mdc-fab__icon'>
          {icon}
        </span>
      </button>
    )
  }
}

Fab.defaultProps = {
  icon: 'done'
}

Fab.propTypes = {
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  fixed: PropTypes.bool
}

export default Fab
