import React from 'react'

class Form extends React.PureComponent {
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
