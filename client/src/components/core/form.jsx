import React from 'react'

import store from 'store'
import { setFormSubmitted } from 'actions/forms'

class Form extends React.PureComponent {
  componentWillUnmount () {
    store.dispatch(setFormSubmitted(this.props.model, false))
  }

  render () {
    let { onSubmit, className, children } = this.props

    return (
      <form noValidate className={className} onSubmit={event => {
        event.preventDefault()
        onSubmit && onSubmit(event)
        return false
      }}>
        {children}
      </form>
    )
  }
}

export default Form
