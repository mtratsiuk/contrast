import React from 'react'
import { MDCRipple } from '@material/ripple'
import classnames from 'classnames'

class Button extends React.PureComponent {
  componentDidMount () {
    MDCRipple.attachTo(this.element)
  }

  render () {
    let {
      raised,
      dense,
      compact,
      primary,
      accent,
      onClick,
      children
    } = this.props

    let className = classnames('mdc-button', {
      'mdc-button--raised': raised,
      'mdc-button--dense': dense,
      'mdc-button--compact': compact,
      'mdc-button--primary': primary,
      'mdc-button--accent': accent
    })

    return (
      <button
        ref={el => { this.element = el }}
        className={className}
        onClick={onClick}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  raised: true
}

export default Button
