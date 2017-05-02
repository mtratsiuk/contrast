import React from 'react'
import { connect } from 'react-redux'

import { setFormSubmitted, clearForm } from 'actions/forms'
import { getFormData } from 'utils/forms'

class Form extends React.Component {
  componentWillUnmount () {
    this.props.setFormSubmitted(this.props.model, false)
  }

  render () {
    let {
      form,
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
        if (form.invalid) return setFormSubmitted(model, true)
        if (onSubmit) onSubmit(getFormData(form))
        clearForm(model)
      }}>
        {children}
      </form>
    )
  }
}

export default connect(
  (state, { model }) => ({ form: _.get(`forms.${model}`, state) || {} }),
  { setFormSubmitted, clearForm }
)(Form)
