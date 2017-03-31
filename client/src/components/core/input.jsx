import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { MDCTextfield } from '@material/textfield'
import { setInput, setInputValidation } from 'actions/forms'

class Input extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.validate = this.validate.bind(this)
  }

  componentDidMount () {
    let { dispatch, model, value } = this.props
    this._mdcTextfield = new MDCTextfield(this.element)

    dispatch(setInput(model, value, !this.validate()))
  }

  componentWillUnmount () {
    let { type, model, dispatch } = this.props

    this._mdcTextfield.destroy()
    if (type === 'password') {
      dispatch(setInput(model, ''))
    }
  }

  componentWillReceiveProps (nextProps) {
    let { dispatch } = this.props

    if (this.props.form !== nextProps.form) {
      let isValid = this.validate(nextProps.form)
      if (!nextProps.invalid !== isValid) {
        dispatch(setInputValidation(nextProps.model, !isValid))
      }
    }
  }

  handleChange () {
    let { dispatch, model } = this.props
    let value = this.inputElement.value
    this._dirty = true
    dispatch(setInput(model, value, !this.validate()))
  }

  validate (nextForm) {
    let isValid = this.props.validate(this.inputElement.value, nextForm || this.props.form)
    this.inputElement.setCustomValidity(isValid ? '' : 'Error')
    return isValid
  }

  render () {
    let {
      type,
      helpText,
      errorText,
      model,
      label,
      value,
      invalid,
      required,
      form
    } = this.props

    let inputId = model
    let helperId = `${model}-validation-message`
    let helpTextClassname = classnames(
      'mdc-textfield-helptext',
      'mdc-textfield-helptext--validation-msg', {
        'mdc-textfield-helptext--persistent': helpText
      }
    )

    let textfieldClassname = classnames(
      'mdc-textfield',
      'mdc-textfield--upgraded', {
        'mdc-textfield--invalid': invalid && (form.submitted || (this._dirty && this._blurred))
      })

    return (
      <div className='Input'>
        <div className={textfieldClassname} ref={el => { this.element = el }}>
          <input
            onChange={this.handleChange}
            onBlur={() => { this._blurred = true; this._dirty = true }}
            value={value}
            type={type}
            className='mdc-textfield__input'
            id={inputId}
            aria-controls={helperId}
            ref={el => { this.inputElement = el }}
            required={required}
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

Input.defaultProps = {
  validate: () => true
}

const mapStateToProps = (state, ownProps) => ({
  value: _.get(`forms.${ownProps.model}.value`, state) || '',
  invalid: _.get(`forms.${ownProps.model}.invalid`, state),
  form: _.get(`forms.${ownProps.model.split('.')[0]}`, state)
})

export default connect(mapStateToProps)(Input)
