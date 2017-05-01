import React from 'react'
import { connect } from 'react-redux'

import { setFormSubmitted, clearForm } from 'actions/forms'

class Form extends React.Component {
  componentWillUnmount () {
    this.props.setFormSubmitted(this.props.model, false)
  }

  render () {
    let {
      invalid,
      model,
      onSubmit,
      setFormSubmitted,
      clearForm,
      className,
      children
    } = this.props

    return (
      <form noValidate className={className} onSubmit={event => {
        event.preventDefault()
        if (invalid) return setFormSubmitted(model, true)
        if (onSubmit) onSubmit(event)
        clearForm(model)
      }}>
        {children}
      </form>
    )
  }
}

export default connect(
  (state, { model }) => _.get(`forms.${model}`, state) || {},
  { setFormSubmitted, clearForm }
)(Form)
