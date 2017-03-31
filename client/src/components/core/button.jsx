import React from 'react'
import { MDCRipple } from '@material/ripple'
import classnames from 'classnames'

class Button extends React.PureComponent {
  componentDidMount () {
    this._mdcRipple = new MDCRipple(this.element)
  }

  componentWillUnmount () {
    this._mdcRipple.destroy()
  }

  render () {
    let {
      raised,
      dense,
      compact,
      primary,
      accent,
      onClick,
      className,
      style,
      children
    } = this.props

    let buttonClassName = classnames('mdc-button', {
      'mdc-button--raised': raised,
      'mdc-button--dense': dense,
      'mdc-button--compact': compact,
      'mdc-button--primary': primary,
      'mdc-button--accent': accent,
      [className]: className
    })

    return (
      <button
        ref={el => { this.element = el }}
        className={buttonClassName}
        onClick={onClick}
        style={style}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  raised: true
}

export default Button
