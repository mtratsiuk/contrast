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
    let { icon, disabled, style, className, onClick } = this.props

    let fabClassname = classnames('Fab', 'mdc-fab', 'material-icons', className)

    return (
      <button
        ref={el => { this.element = el }}
        style={style}
        className={fabClassname}
        aria-label={icon}
        disabled={disabled}
        onClick={onClick}
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
  disabled: PropTypes.bool
}

export default Fab
