import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { MDCTextfield } from '@material/textfield'
import { setInput } from 'actions/forms'

class Input extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    let { dispatch, model, value } = this.props
    this._mdcTextfield = new MDCTextfield(this.element)

    if (value) {
      dispatch(setInput(model, value, false))
    }
  }

  componentWillUnmount () {
    this._mdcTextfield.destroy()
  }

  handleChange (event) {
    let { dispatch, model } = this.props
    let element = event.target
    dispatch(setInput(model, element.value, !element.checkValidity()))
  }

  render () {
    let {
      type,
      helpText,
      errorText,
      validation,
      model,
      label,
      value
    } = this.props

    let inputId = model
    let helperId = `${model}-validation-message`
    let helpTextClassname = classnames(
      'mdc-textfield-helptext',
      'mdc-textfield-helptext--validation-msg', {
        'mdc-textfield-helptext--persistent': helpText
      }
    )

    return (
      <div className='Input'>
        <div className='mdc-textfield' ref={el => { this.element = el }}>
          <input
            {...validation}
            onChange={this.handleChange}
            value={value || ''}
            type={type}
            className='mdc-textfield__input'
            id={inputId}
            aria-controls={helperId}
          />
          <label
            htmlFor={inputId}
            className='mdc-textfield__label'>
            {label}
          </label>
        </div>
        <p className={helpTextClassname} id={helperId}>
          {helpText || errorText}
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => _.get(`forms.${ownProps.model}`, state) || {}

export default connect(mapStateToProps)(Input)
